import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

const navLinks = [
  { id:1, label:"Home", path:"/" },
  { id:2, label:"Services", path:"/services" },
  { id:3, label:"Reviews", path:"/reviews" },
  { id:4, label:"Pricing", path:"/pricing" },
  { id:5, label:"Pickup", path:"/pickup" },
  { id:6, label:"About", path:"/about" },
  { id:7, label:"Contact", path:"/contact" },
  { id:8, label:"Price List", path:"/price-list" }
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const handleLogout = async () => {
    await logout();
    closeMenu();
    navigate("/");
  };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#09131ccc]/95 shadow-lg backdrop-blur-xl">
        <div className="page-shell flex items-center justify-between py-4">
          <Link to="/" className="flex items-center gap-2">
  <img
    src="/logo.png"
    alt="CoziCars Logo"
    className="h-15 w-auto object-contain drop-shadow-md"
  />
  {/* <span className="text-xl font-extrabold tracking-tight text-white">
    Shillong <span className="text-red-400">CoziCars</span>
  </span> */}
</Link>

          <nav className="hidden items-center gap-6 text-sm lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.id}
                to={link.path}
                className={({ isActive }) =>
                  isActive ? "font-semibold text-red-400" : "text-gray-300 hover:text-white"
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="btn-ghost text-sm">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-lg bg-rose-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-600"
              >
                Register
              </Link>
            </>
            ) : (
              <>
                <Link to="/profile" className="btn-ghost text-sm">
                  {user?.name?.split(" ")[0] || "Profile"}
                </Link>
                {user?.role === "admin" && (
                  <Link to="/admin" className="btn-brand text-sm">
                    Admin
                  </Link>
                )}
                <button type="button" onClick={handleLogout} className="btn-ghost text-sm">
                  Logout
                </button>
              </>
            )}
          </div>

          <button
            type="button"
            aria-label="Open menu"
            onClick={() => setMenuOpen(true)}
            className="rounded-lg border border-white/20 p-2 text-white active:scale-95 lg:hidden"
          >
            <FiMenu size={22} />
          </button>
        </div>
      </header>

      {menuOpen && (
        <div
          onClick={closeMenu}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed right-0 top-0 z-[60] h-screen w-[88%] max-w-sm border-l border-white/10 bg-[#0b141d] shadow-2xl transition-transform duration-300 lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
          <h3 className="text-lg font-bold text-white">Menu</h3>
          <button type="button" aria-label="Close menu" onClick={closeMenu} className="text-white">
            <FiX size={26} />
          </button>
        </div>

        <div className="flex flex-col gap-2 p-5">
          {navLinks.map((link) => (
            <NavLink
              key={link.id}
              to={link.path}
              onClick={closeMenu}
              className={({ isActive }) =>
                `rounded-lg px-3 py-3 text-base ${
                  isActive
                    ? "bg-red-500/20 font-semibold text-red-300"
                    : "text-gray-200 hover:bg-white/10"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="border-t border-white/10 p-5">
          {!isAuthenticated ? (
            <div className="flex flex-col gap-3">
              <Link to="/login" onClick={closeMenu} className="btn-ghost text-center text-base">
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="rounded-lg bg-rose-500 px-4 py-3 text-center text-base font-semibold text-white transition hover:bg-rose-600"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <Link to="/profile" onClick={closeMenu} className="btn-ghost text-center text-base">
                Profile
              </Link>
              {user?.role === "admin" && (
                <Link to="/admin" onClick={closeMenu} className="btn-brand text-center text-base">
                  Admin
                </Link>
              )}
              <button type="button" onClick={handleLogout} className="btn-ghost text-base">
                Logout
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default Navbar;
