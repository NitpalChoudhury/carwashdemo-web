import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import { buildFormRequest, buildJsonRequest } from "../../api/client";
import { useAuth } from "../../context/AuthContext";

const userNav = [
  { label: "Dashboard", to: "/profile" },
  { label: "My Profile", to: "/profile/details" },
  { label: "My Bookings", to: "/profile/bookings" },
  { label: "My Cars", to: "/profile/cars" },
  { label: "My Addresses", to: "/profile/addresses" },
];

function UserLayout() {
  const { user, isAuthenticated, isBootstrapping, authFetch, logout, updateCurrentUser } =
    useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [dashboard, setDashboard] = useState({ stats: {}, recentBooking: null });
  const [bookings, setBookings] = useState([]);
  const [cars, setCars] = useState([]);
  const [addresses, setAddresses] = useState([]);

  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const clearNotice = () => {
    setMessage("");
    setError("");
  };

  const loadAll = useCallback(async () => {
    setLoading(true);
    clearNotice();
    try {
      const [profileData, dashboardData, bookingData, carData, addressData] =
        await Promise.all([
          authFetch("/user/profile"),
          authFetch("/user/dashboard"),
          authFetch("/user/bookings"),
          authFetch("/user/cars"),
          authFetch("/user/addresses"),
        ]);

      setProfile(profileData?.user || null);
      setDashboard(dashboardData || { stats: {}, recentBooking: null });
      setBookings(Array.isArray(bookingData) ? bookingData : []);
      setCars(Array.isArray(carData) ? carData : []);
      setAddresses(Array.isArray(addressData) ? addressData : []);
    } catch (requestError) {
      setError(requestError.message || "Failed to load user dashboard.");
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    loadAll();
  }, [isAuthenticated, loadAll]);

  const updateProfile = useCallback(
    async ({ name, phone, avatar }) => {
      clearNotice();
      try {
        const formData = new FormData();
        if (name !== undefined) formData.append("name", name);
        if (phone !== undefined) formData.append("phone", phone);
        if (avatar) formData.append("avatar", avatar);

        const data = await authFetch("/user/profile", buildFormRequest("PUT", formData));
        setProfile(data.user);
        updateCurrentUser({
          name: data.user.name,
          avatar: data.user.avatar,
          phone: data.user.phone,
        });
        setMessage("Profile updated successfully.");
      } catch (requestError) {
        setError(requestError.message || "Failed to update profile.");
      }
    },
    [authFetch, updateCurrentUser]
  );

  const saveCar = useCallback(
    async (payload, id = "") => {
      clearNotice();
      try {
        await authFetch(
          id ? `/user/cars/${id}` : "/user/cars",
          buildJsonRequest(id ? "PUT" : "POST", payload)
        );
        setMessage(id ? "Car updated." : "Car added.");
        await loadAll();
      } catch (requestError) {
        setError(requestError.message || "Failed to save car.");
      }
    },
    [authFetch, loadAll]
  );

  const deleteCar = useCallback(
    async (id) => {
      clearNotice();
      try {
        await authFetch(`/user/cars/${id}`, { method: "DELETE" });
        setMessage("Car deleted.");
        await loadAll();
      } catch (requestError) {
        setError(requestError.message || "Failed to delete car.");
      }
    },
    [authFetch, loadAll]
  );

  const saveAddress = useCallback(
    async (payload, id = "") => {
      clearNotice();
      try {
        await authFetch(
          id ? `/user/addresses/${id}` : "/user/addresses",
          buildJsonRequest(id ? "PUT" : "POST", payload)
        );
        setMessage(id ? "Address updated." : "Address added.");
        await loadAll();
      } catch (requestError) {
        setError(requestError.message || "Failed to save address.");
      }
    },
    [authFetch, loadAll]
  );

  const deleteAddress = useCallback(
    async (id) => {
      clearNotice();
      try {
        await authFetch(`/user/addresses/${id}`, { method: "DELETE" });
        setMessage("Address deleted.");
        await loadAll();
      } catch (requestError) {
        setError(requestError.message || "Failed to delete address.");
      }
    },
    [authFetch, loadAll]
  );

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const sidebarName = profile?.name || user?.name || "Guest";
  const sidebarEmail = profile?.email || user?.email || "";
  const memberSince = profile?.memberSince
    ? new Date(profile.memberSince).toLocaleDateString()
    : new Date().toLocaleDateString();

  const outletValue = useMemo(
    () => ({
      loading,
      profile,
      dashboard,
      bookings,
      cars,
      addresses,
      updateProfile,
      saveCar,
      deleteCar,
      saveAddress,
      deleteAddress,
      reload: loadAll,
    }),
    [
      loading,
      profile,
      dashboard,
      bookings,
      cars,
      addresses,
      updateProfile,
      saveCar,
      deleteCar,
      saveAddress,
      deleteAddress,
      loadAll,
    ]
  );

  if (isBootstrapping) {
    return (
      <div className="page-shell py-10">
        <p className="text-sm text-muted">Loading account...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="page-shell py-8">
      {message && (
        <p className="mb-4 rounded-xl border border-emerald-300/30 bg-emerald-500/10 p-3 text-sm">{message}</p>
      )}
      {error && <p className="mb-4 rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm">{error}</p>}

      <div className="grid gap-5 lg:grid-cols-[260px_1fr]">
        <aside className="glass-card p-4">
          <div className="rounded-xl border border-white/10 bg-black/20 p-5 text-center">
            {profile?.avatar ? (
              <img
                src={profile.avatar}
                alt={sidebarName}
                className="mx-auto h-24 w-24 rounded-full border border-white/20 object-cover"
              />
            ) : (
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-white/20 bg-white/10 text-3xl font-bold text-[#ffba49]">
                {sidebarName.charAt(0).toUpperCase()}
              </div>
            )}
            <h2 className="mt-3 text-xl font-semibold">{sidebarName}</h2>
            <p className="text-xs text-muted">{sidebarEmail}</p>
            <p className="mt-2 text-xs text-muted">Member Since {memberSince}</p>
          </div>

          <nav className="mt-4 space-y-2">
            {userNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/profile"}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-2 text-sm ${
                    isActive
                      ? "bg-[#ffba49] text-[#1a1c22] font-semibold"
                      : "bg-white/5 text-[#d6e5f1] hover:bg-white/10"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
            <button type="button" onClick={handleLogout} className="btn-ghost w-full text-sm">
              Logout
            </button>
          </nav>
        </aside>

        <section className="glass-card p-5 md:p-6">
          <Outlet context={outletValue} />
        </section>
      </div>
    </div>
  );
}

export default UserLayout;
