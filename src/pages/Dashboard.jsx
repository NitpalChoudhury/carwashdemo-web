import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  const upcomingBooking = {
    service: "Premium Service",
    date: "25 Feb 2026",
    status: "In Progress",
  };

  const bookingHistory = [
    { service: "Oil Change", date: "10 Feb 2026", status: "Completed" },
    { service: "AC Service", date: "02 Feb 2026", status: "Cancelled" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500";
      case "In Progress":
        return "bg-blue-500";
      case "Completed":
        return "bg-green-600";
      case "Cancelled":
        return "bg-red-600";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="bg-slate-950 text-white min-h-screen px-6 py-16">

      <div className="max-w-7xl mx-auto space-y-12">

        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold mb-2">
            Welcome back, {user?.name || "User"} 👋
          </h1>
          <p className="text-gray-400">
            Here’s an overview of your car services.
          </p>
        </motion.div>

        {/* Quick Stats */}
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
              className="bg-slate-900 p-6 rounded-xl shadow border border-slate-800"
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

        {/* Upcoming Booking */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800"
        >
          <h2 className="text-2xl font-bold mb-6">
            Upcoming Service
          </h2>

          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">

            <div>
              <h3 className="text-xl font-semibold">
                {upcomingBooking.service}
              </h3>
              <p className="text-gray-400">
                Date: {upcomingBooking.date}
              </p>
            </div>

            <span
              className={`px-4 py-2 rounded-full text-sm ${getStatusColor(
                upcomingBooking.status
              )}`}
            >
              {upcomingBooking.status}
            </span>

            <Link
              to="/booking"
              className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700 transition font-semibold"
            >
              View Details
            </Link>

          </div>

          {/* Progress Tracker */}
          <div className="mt-8 flex justify-between text-center text-sm">

            {["Booked", "Pickup", "In Service", "Delivered"].map(
              (step, index) => (
                <div key={index} className="flex-1">
                  <div className={`h-3 w-3 mx-auto rounded-full ${
                    index <= 2 ? "bg-red-500" : "bg-gray-500"
                  }`}></div>
                  <p className="mt-2 text-gray-400">{step}</p>
                </div>
              )
            )}

          </div>

        </motion.div>

        {/* Booking History */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-slate-900 p-8 rounded-2xl shadow-lg border border-slate-800"
        >
          <h2 className="text-2xl font-bold mb-6">
            Booking History
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-700">
                <tr>
                  <th className="pb-4">Service</th>
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookingHistory.map((booking, index) => (
                  <tr key={index} className="border-b border-slate-800">
                    <td className="py-4">{booking.service}</td>
                    <td className="py-4 text-gray-400">
                      {booking.date}
                    </td>
                    <td className="py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${getStatusColor(
                          booking.status
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </motion.div>

      </div>

    </div>
  );
}

export default Dashboard;
