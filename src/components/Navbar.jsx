import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, logout } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Pricing", path: "/pricing" },
    { name: "Pickup", path: "/pickup" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="bg-slate-950 text-white sticky top-0 z-50 shadow-md border-b border-slate-800">

      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* LOGO */}
        <Link to="/" className="text-2xl font-bold">
          Auto<span className="text-red-500">Care</span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center space-x-6">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`hover:text-red-500 transition ${
                location.pathname === link.path ? "text-red-500" : ""
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* AUTH SECTION */}
          {!user ? (
            <div className="flex gap-3">
              <Link
                to="/login"
                className="border border-red-500 px-4 py-2 rounded-lg hover:bg-red-600 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="bg-slate-800 px-4 py-2 rounded-lg hover:bg-slate-700 transition"
              >
                {user.name.split(" ")[0]}
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 bg-white text-black rounded-lg shadow-lg w-44 overflow-hidden">

                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Profile
                  </Link>

                  <Link
                    to="/booking"
                    className="block px-4 py-2 hover:bg-gray-200"
                    onClick={() => setProfileOpen(false)}
                  >
                    My Bookings
                  </Link>

                  <button
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-200"
                  >
                    Logout
                  </button>

                </div>
              )}
            </div>
          )}

        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900 px-6 pb-6 space-y-4">

          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className="block hover:text-red-500"
            >
              {link.name}
            </Link>
          ))}

          {!user ? (
            <>
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="block border border-red-500 text-center py-2 rounded-lg"
              >
                Login
              </Link>

              <Link
                to="/register"
                onClick={() => setMenuOpen(false)}
                className="block bg-red-600 text-center py-2 rounded-lg"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="block py-2"
              >
                My Profile
              </Link>

              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="block w-full bg-red-600 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}

        </div>
      )}

    </nav>
  );
}

export default Navbar;
