import { BrowserRouter, Routes, Route } from "react-router-dom";

import AnnouncementBar from "./components/AnnouncementBar";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/services/ServicesPage";
import ServiceDetails from "./pages/services/ServiceDetailsPage";
import ReviewsPage from "./pages/reviews/ReviewsPage";
import Booking from "./pages/Booking";
import Pickup from "./pages/Pickup";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOverview from "./pages/admin/AdminOverview";
import AdminServices from "./pages/admin/AdminServices";
import AdminReviews from "./pages/admin/AdminReviews";
import AdminBanner from "./pages/admin/AdminBanner";
import AdminVideos from "./pages/admin/AdminVideos";
import UserLayout from "./pages/user/UserLayout";
import UserDashboard from "./pages/user/UserDashboard";
import UserProfileDetails from "./pages/user/UserProfileDetails";
import UserBookings from "./pages/user/UserBookings";
import UserCars from "./pages/user/UserCars";
import UserAddresses from "./pages/user/UserAddresses";

function App() {
  return (
    <BrowserRouter>
      <AnnouncementBar />
      <Navbar />
      <main className="min-h-[70vh]">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:id" element={<ServiceDetails />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/pickup" element={<Pickup />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<UserLayout />}>
            <Route index element={<UserDashboard />} />
            <Route path="details" element={<UserProfileDetails />} />
            <Route path="bookings" element={<UserBookings />} />
            <Route path="cars" element={<UserCars />} />
            <Route path="addresses" element={<UserAddresses />} />
          </Route>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminOverview />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="reviews" element={<AdminReviews />} />
            <Route path="banner" element={<AdminBanner />} />
            <Route path="videos" element={<AdminVideos />} />
          </Route>
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
