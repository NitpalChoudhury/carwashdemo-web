import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email);
    navigate("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white px-6">
      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-2xl w-full max-w-md space-y-6 shadow-lg">

        <h2 className="text-3xl font-bold text-center">
          Register
        </h2>

        <input
          type="text"
          required
          placeholder="Full Name"
          className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:border-red-500 outline-none"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          required
          placeholder="Email"
          className="w-full p-3 rounded bg-slate-800 border border-slate-700 focus:border-red-500 outline-none"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="w-full bg-red-600 py-3 rounded-lg hover:bg-red-700 transition">
          Create Account
        </button>

        <p className="text-center text-sm text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-red-500">
            Login
          </Link>
        </p>

      </form>
    </div>
  );
}

export default Register;
