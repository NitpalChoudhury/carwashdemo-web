import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { apiRequest, buildJsonRequest } from "../api/client";

const AuthContext = createContext();
const STORAGE_KEY = "autocare_auth_v1";

const readStoredAuth = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [authState, setAuthState] = useState(() => {
    const stored = readStoredAuth();
    return {
      user: stored?.user || null,
      accessToken: stored?.accessToken || "",
      refreshToken: stored?.refreshToken || "",
    };
  });
  const [isBootstrapping] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(authState));
  }, [authState]);

  const clearAuth = useCallback(() => {
    setAuthState({
      user: null,
      accessToken: "",
      refreshToken: "",
    });
  }, []);

  const register = useCallback(async (name, email, password) => {
    await apiRequest(
      "/auth/register",
      buildJsonRequest("POST", { name, email, password })
    );

    return apiRequest(
      "/auth/login",
      buildJsonRequest("POST", { email, password })
    ).then((data) => {
      setAuthState({
        user: data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      });
      return data.user;
    });
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await apiRequest(
      "/auth/login",
      buildJsonRequest("POST", { email, password })
    );

    setAuthState({
      user: data.user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken,
    });

    return data.user;
  }, []);

  const refreshSession = useCallback(async () => {
    if (!authState.refreshToken) {
      clearAuth();
      return null;
    }

    try {
      const data = await apiRequest(
        "/auth/refresh-token",
        buildJsonRequest("POST", { refreshToken: authState.refreshToken })
      );

      setAuthState((prev) => ({
        ...prev,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      }));

      return data.accessToken;
    } catch {
      clearAuth();
      return null;
    }
  }, [authState.refreshToken, clearAuth]);

  const authFetch = useCallback(
    async (path, options = {}) => {
      const headers = new Headers(options.headers || {});
      if (authState.accessToken) {
        headers.set("Authorization", `Bearer ${authState.accessToken}`);
      }

      try {
        return await apiRequest(path, {
          ...options,
          headers,
        });
      } catch (error) {
        if (error.status !== 401) {
          throw error;
        }

        const newAccessToken = await refreshSession();
        if (!newAccessToken) {
          throw error;
        }

        const retryHeaders = new Headers(options.headers || {});
        retryHeaders.set("Authorization", `Bearer ${newAccessToken}`);

        return apiRequest(path, {
          ...options,
          headers: retryHeaders,
        });
      }
    },
    [authState.accessToken, refreshSession]
  );

  const logout = useCallback(async () => {
    const tokenToClear = authState.refreshToken;

    if (tokenToClear) {
      try {
        await apiRequest(
          "/auth/logout",
          buildJsonRequest("POST", { refreshToken: tokenToClear })
        );
      } catch {
        // Best-effort logout; local token clear is still required.
      }
    }

    clearAuth();
  }, [authState.refreshToken, clearAuth]);

  const updateCurrentUser = useCallback((nextUser) => {
    setAuthState((prev) => ({
      ...prev,
      user: {
        ...prev.user,
        ...nextUser,
      },
    }));
  }, []);

  const value = useMemo(
    () => ({
      user: authState.user,
      accessToken: authState.accessToken,
      refreshToken: authState.refreshToken,
      isAuthenticated: Boolean(authState.accessToken && authState.user),
      isBootstrapping,
      login,
      register,
      logout,
      authFetch,
      updateCurrentUser,
    }),
    [
      authState.user,
      authState.accessToken,
      authState.refreshToken,
      isBootstrapping,
      login,
      register,
      logout,
      authFetch,
      updateCurrentUser,
    ]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}
