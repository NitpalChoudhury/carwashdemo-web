import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const user = await register(form.name, form.email, form.password);
      navigate(user?.role === "admin" ? "/dashboard" : "/profile");
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="page-shell flex items-center justify-center py-16">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-xl">

        {/* Heading */}
        <h1 className="text-3xl font-extrabold text-white">
          Create <span className="text-red-400">Account</span>
        </h1>
        <p className="mt-2 text-sm text-gray-300">
          Register and start managing your bookings.
        </p>

        <div className="mt-3 h-1 w-24 rounded bg-red-500"></div>

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>

          {/* Full Name */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">Full Name</label>
            <input
              name="name"
              required
              className="
                w-full rounded-lg border border-white/20 bg-black/20 
                p-3 text-white outline-none transition
                focus:border-red-400 focus:bg-black/30
              "
              value={form.name}
              onChange={handleChange}
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              required
              className="
                w-full rounded-lg border border-white/20 bg-black/20 
                p-3 text-white outline-none transition
                focus:border-red-400 focus:bg-black/30
              "
              value={form.email}
              onChange={handleChange}
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              minLength={6}
              required
              className="
                w-full rounded-lg border border-white/20 bg-black/20 
                p-3 text-white outline-none transition
                focus:border-red-400 focus:bg-black/30
              "
              value={form.password}
              onChange={handleChange}
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
            className="
              w-full rounded-lg bg-red-500 py-3 text-white font-semibold 
              shadow-lg transition hover:bg-red-600 active:scale-[0.97]
            "
            type="submit"
            disabled={submitting}
          >
            {submitting ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Login Link */}
        <p className="mt-5 text-sm text-gray-300">
          Already have an account?{" "}
          <Link style={{ color: "#38bdf8" }}
  className="hover:!text-sky-300 underline"
  to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
