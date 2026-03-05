import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const user = await login(email, password);
      navigate(user?.role === "admin" ? "/dashboard" : "/profile");
    } catch (requestError) {
      setError(requestError.message || "Login failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-shell flex items-center justify-center py-16">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl">

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-white">
          Welcome <span className="text-red-400">Back</span>
        </h1>
        <p className="mt-2 text-sm text-gray-300">
          Login using your registered credentials.
        </p>

        <div className="mt-3 h-1 w-20 rounded bg-red-500"></div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">Email</label>
            <input
              type="email"
              required
              className="
                w-full rounded-lg border border-white/20 bg-black/20 
                p-3 text-white outline-none transition
                focus:border-red-400 focus:bg-black/30
              "
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">Password</label>
            <input
              type="password"
              required
              minLength={6}
              className="
                w-full rounded-lg border border-white/20 bg-black/20 
                p-3 text-white outline-none transition
                focus:border-red-400 focus:bg-black/30
              "
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Error */}
          {error && (
            <p className="rounded-md border border-red-500/40 bg-red-500/10 p-2 text-sm text-red-200">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={submitting}
            className="
              w-full rounded-lg bg-red-500 py-3 text-center text-white 
              font-semibold shadow-lg transition
              hover:bg-red-600 active:scale-[0.97]
            "
          >
            {submitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Register Link */}
        <p className="mt-5 text-sm text-gray-300">
          Need an account?{" "}
         <Link
  to="/register"
  style={{ color: "#38bdf8" }}
  className="hover:!text-sky-300 underline"
>
  Register
</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
