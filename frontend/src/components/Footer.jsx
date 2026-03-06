import { Link } from "react-router-dom";
import { FiPhone, FiMail, FiMapPin, FiExternalLink } from "react-icons/fi";
import { FaInstagram, FaFacebookF, FaYoutube } from "react-icons/fa";

function Footer() {
  const socialLinks = [
    {
      label: "Instagram - Cozi Cars Shillong",
      href: "https://www.instagram.com/cozicarsshillong?igsh=OXQxcmVneHY5eGE2&utm_source=qr",
      icon: FaInstagram,
    },
    {
      label: "Instagram - Shillong Cozy Pynthor",
      href: "https://www.instagram.com/shillongcozypynthor?igsh=MTBoM2Z4bndyZTM3Ng%3D%3D&utm_source=qr",
      icon: FaInstagram,
    },
    {
      label: "Facebook",
      href: "https://www.facebook.com/share/176J5Mz8d5/?mibextid=wwXIfr",
      icon: FaFacebookF,
    },
    {
      label: "YouTube",
      href: "https://www.youtube.com/",
      icon: FaYoutube,
    },
  ];

  return (
    <footer className="mt-20 border-t border-white/10 bg-gradient-to-b from-black/90 via-black/95 to-[#060d14]">

      <div className="page-shell grid gap-12 py-14 md:grid-cols-4">

        {/* BRAND */}
        <div>
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/logo.png"
              alt="CoziCars Logo"
              className="h-14 w-auto object-contain drop-shadow-md"
            />
          </Link>

          <p className="mt-4 text-sm leading-relaxed text-gray-300">
            Smart car & bike care with transparent pricing, trained technicians,
            and fast citywide pickup support. We make vehicle servicing effortless.
          </p>
        </div>

        {/* COMPANY */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-red-400">
            Company
          </h4>

          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            <li>
              <Link className="hover:text-red-300" to="/about">About</Link>
            </li>
            <li>
              <Link className="hover:text-red-300" to="/services">Services</Link>
            </li>
            <li>
              <Link className="hover:text-red-300" to="/reviews">Reviews</Link>
            </li>
            <li>
              <Link className="hover:text-red-300" to="/pricing">Pricing</Link>
            </li>
            <li>
              <Link className="hover:text-red-300" to="/price-list">Price List</Link>
            </li>
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-red-400">
            Support
          </h4>

          <ul className="mt-4 space-y-2 text-sm text-gray-300">
            <li>
              <Link className="hover:text-red-300" to="/contact">Contact</Link>
            </li>
            <li>
              <Link className="hover:text-red-300" to="/pickup">Pickup Policy</Link>
            </li>
            <li>
              <Link className="hover:text-red-300" to="/booking">Book Service</Link>
            </li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="text-sm font-semibold uppercase tracking-wider text-red-400">
            Reach Us
          </h4>

          <div className="mt-4 space-y-3 text-sm text-gray-300">

            <p className="flex items-start gap-2">
              <FiMapPin className="mt-1 text-red-400" />
              Mawlai Mawiong Umjapung Nengnong B <br />
              Opposite SBI Branch Mawiong <br />
              Shillong, Meghalaya 793016
            </p>

            <p className="flex items-center gap-2">
              <FiPhone className="text-red-400" />
              +91 98564 33273
            </p>

            <p className="flex items-center gap-2">
              <FiMail className="text-red-400" />
              franky281092@gmail.com
            </p>

            <div className="pt-2">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-red-400">
                Follow Us
              </p>

              <div className="flex flex-wrap items-center gap-2">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    title={label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-gray-200 transition hover:border-red-400 hover:text-red-300"
                  >
                    <Icon className="text-base" />
                  </a>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* COPYRIGHT BAR */}

      <div className="border-t border-white/10 py-5 px-4">
        <div className="flex flex-col items-center justify-between gap-3 text-center md:flex-row">

          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Shillong CoziCars · All rights reserved.
          </p>

          <a
            href="https://www.nitpal.site/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300 backdrop-blur-md transition hover:border-red-400 hover:bg-white/10 hover:text-white"
          >
            Developed by
            <span className="font-semibold text-red-400">
              Nitpal Choudhury
            </span>
            <FiExternalLink className="text-red-300" />
          </a>

        </div>
      </div>

    </footer>
  );
}

export default Footer;
