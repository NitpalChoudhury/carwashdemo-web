import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300 pt-16 pb-8 px-6">

      <div className="max-w-7xl mx-auto grid gap-12 sm:grid-cols-2 md:grid-cols-4">

        {/* BRAND */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            Auto<span className="text-red-500">Care</span>
          </h2>
          <p className="text-gray-400 text-sm">
            Premium car servicing with pickup & delivery.
            Reliable, affordable & professional automotive care.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-white font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-red-500 transition">Home</Link></li>
            <li><Link to="/services" className="hover:text-red-500 transition">Services</Link></li>
            <li><Link to="/booking" className="hover:text-red-500 transition">Book Service</Link></li>
            <li><Link to="/about" className="hover:text-red-500 transition">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-red-500 transition">Contact</Link></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="text-white font-semibold mb-4">Our Services</h3>
          <ul className="space-y-2 text-sm">
            <li className="hover:text-red-500 transition cursor-pointer">Oil Change</li>
            <li className="hover:text-red-500 transition cursor-pointer">AC Repair</li>
            <li className="hover:text-red-500 transition cursor-pointer">Full Inspection</li>
            <li className="hover:text-red-500 transition cursor-pointer">Battery Replacement</li>
            <li className="hover:text-red-500 transition cursor-pointer">Car Wash</li>
          </ul>
        </div>

        {/* CONTACT INFO */}
        <div>
          <h3 className="text-white font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-3 text-sm">
            <li>📞 +91 9876543210</li>
            <li>📧 support@autocare.com</li>
            <li>📍 Kolkata, India</li>
            <li>🕒 Mon - Sat: 9AM - 8PM</li>
          </ul>

          {/* Social Icons */}
          <div className="flex gap-4 mt-4">
            <span className="bg-slate-800 p-2 rounded-full hover:bg-red-600 cursor-pointer transition">
              👍
            </span>
            <span className="bg-slate-800 p-2 rounded-full hover:bg-red-600 cursor-pointer transition">
              📸
            </span>
            <span className="bg-slate-800 p-2 rounded-full hover:bg-red-600 cursor-pointer transition">
              🐦
            </span>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 mt-12 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} AutoCare. All Rights Reserved.
      </div>

    </footer>
  );
}

export default Footer;
