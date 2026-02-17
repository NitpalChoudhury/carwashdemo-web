import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email);
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">
      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-2xl w-full max-w-md space-y-6 shadow-lg">

        <h2 className="text-3xl font-bold text-center">
          Login
        </h2>

        <input
          type="email"
          required
          placeholder="Enter Email"
          className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:border-red-500 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-red-600 py-3 rounded-lg hover:bg-red-700 transition">
          Login
        </button>

        <p className="text-center text-sm text-gray-400">
          Don’t have an account?{" "}
          <Link to="/register" className="text-red-500">
            Register
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Login;
