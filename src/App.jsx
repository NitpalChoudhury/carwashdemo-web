import { BrowserRouter, Routes, Route } from "react-router-dom";

import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Booking from "./pages/Booking";
import Pickup from "./pages/Pickup";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>

      {/* Top Announcement */}
      <AnnouncementBar />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="min-h-screen bg-slate-950 text-white">
        <Routes>

          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/pickup" element={<Pickup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />

          {/* Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* User Pages */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/dashboard" element={<Dashboard />} />

        </Routes>
      </div>

      {/* Footer */}
      <Footer />

    </BrowserRouter>
  );
}

export default App;
