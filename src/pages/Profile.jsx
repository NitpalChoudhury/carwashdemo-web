import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

function Profile() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="bg-slate-950 text-white min-h-screen px-6 py-16">

      <div className="max-w-6xl mx-auto space-y-12">

        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800 flex flex-col md:flex-row items-center gap-8"
        >

          {/* Avatar */}
          <div className="h-28 w-28 rounded-full bg-red-600 flex items-center justify-center text-4xl font-bold">
            {name?.charAt(0).toUpperCase()}
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            {editing ? (
              <>
                <input
                  className="w-full bg-slate-800 p-3 rounded mb-4 border border-slate-700"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <input
                  className="w-full bg-slate-800 p-3 rounded mb-4 border border-slate-700"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={() => setEditing(false)}
                  className="bg-red-600 px-6 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <h2 className="text-3xl font-bold mb-2">{name}</h2>
                <p className="text-gray-400 mb-4">{email}</p>

                <button
                  onClick={() => setEditing(true)}
                  className="border border-red-500 px-5 py-2 rounded-lg hover:bg-red-600 transition"
                >
                  Edit Profile
                </button>
              </>
            )}
          </div>

        </motion.div>


        {/* Account Stats */}
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">

          {[
            { label: "Total Services", value: "3" },
            { label: "Completed", value: "2" },
            { label: "Pending", value: "1" },
            { label: "Total Spent", value: "₹4998" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-900 p-6 rounded-xl shadow border border-slate-800 text-center"
            >
              <h3 className="text-2xl font-bold text-red-500">
                {stat.value}
              </h3>
              <p className="text-gray-400 text-sm mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}

        </div>


        {/* Saved Cars Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800"
        >
          <h2 className="text-2xl font-bold mb-6">
            Saved Vehicles
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">

            {["Hyundai i20", "Tata Nexon"].map((car, index) => (
              <div
                key={index}
                className="bg-slate-800 p-5 rounded-xl border border-slate-700"
              >
                <h3 className="font-semibold">{car}</h3>
                <p className="text-gray-400 text-sm">
                  Registered Vehicle
                </p>
              </div>
            ))}

            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700 flex items-center justify-center cursor-pointer hover:bg-slate-700 transition">
              + Add New Vehicle
            </div>

          </div>

        </motion.div>


        {/* Logout Section */}
        <div className="text-center">
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="bg-red-600 px-8 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
          >
            Logout
          </button>
        </div>

      </div>

    </div>
  );
}

export default Profile;
