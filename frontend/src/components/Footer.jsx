import { Link } from "react-router-dom";
import { FiPhone, FiMail, FiMapPin, FiExternalLink } from "react-icons/fi";

function Footer() {
  return (
    <footer className="mt-20 bg-gradient-to-b from-black/90 via-black/95 to-[#060d14] border-t border-white/10">
      <div className="page-shell grid gap-12 py-14 md:grid-cols-4">

        {/* BRAND */}
        <div>
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
          <p className="mt-4 text-sm text-gray-300 leading-relaxed">
            Smart car & bike care with transparent pricing, trained technicians,
            and fast citywide pickup support.  
            We make vehicle servicing effortless.
          </p>
        </div>

        {/* COMPANY LINKS */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-red-400">
            Company
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-300">
            <li><Link className="hover:text-red-300" to="/about">About</Link></li>
            <li><Link className="hover:text-red-300" to="/services">Services</Link></li>
            <li><Link className="hover:text-red-300" to="/reviews">Reviews</Link></li>
            <li><Link className="hover:text-red-300" to="/pricing">Pricing</Link></li>
          </ul>
        </div>

        {/* SUPPORT LINKS */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-red-400">
            Support
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-gray-300">
            <li><Link className="hover:text-red-300" to="/contact">Contact</Link></li>
            <li><Link className="hover:text-red-300" to="/pickup">Pickup Policy</Link></li>
            <li><Link className="hover:text-red-300" to="/booking">Book Service</Link></li>
          </ul>
        </div>

        {/* CONTACT DETAILS */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-red-400">
            Reach Us
          </h4>

          <div className="mt-4 space-y-3 text-sm text-gray-300">
            <p className="flex items-center gap-2"><FiPhone /> +91 98765 43210</p>
            <p className="flex items-center gap-2"><FiMail /> support@shillongcozicars.com</p>
            <p className="flex items-center gap-2"><FiMapPin /> Shillong, Meghalaya</p>
          </div>
        </div>
      </div>

      {/* ---------------------------------------------------- */}
      {/* DEVELOPER CREDIT BAR */}
      {/* ---------------------------------------------------- */}
      <div className="border-t border-white/10 py-5 px-4">
        <div className="flex flex-col items-center justify-center gap-2 text-center md:flex-row md:justify-between">

          {/* COPYRIGHT */}
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Shillong CoziCars · All rights reserved.
          </p>

          {/* DEVELOPER CREDIT */}
          <a
            href="https://www.nitpal.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex items-center gap-2 rounded-lg border border-white/10 
              bg-white/5 px-4 py-2 text-xs text-gray-300 backdrop-blur-md 
              transition hover:bg-white/10 hover:text-white hover:border-red-400
            "
          >
            Developed by <span className="font-semibold text-red-400">Nitpal Choudhury</span>
            <FiExternalLink className="text-red-300" />
          </a>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
