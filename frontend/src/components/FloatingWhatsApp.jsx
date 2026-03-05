import { FaWhatsapp } from "react-icons/fa";

const rawNumber = import.meta.env.VITE_WHATSAPP_NUMBER || "919856433273";
const whatsappNumber = String(rawNumber).replace(/\D/g, "");
const presetText =
  import.meta.env.VITE_WHATSAPP_TEXT || "Hi, I need help with car service booking.";
const whatsappUrl = whatsappNumber
  ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(presetText)}`
  : "";

function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-5 z-[120] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-transform duration-200 hover:scale-105 md:bottom-10 md:right-8"
    >
      <FaWhatsapp className="text-3xl" />
    </a>
  );
}

export default FloatingWhatsApp;
