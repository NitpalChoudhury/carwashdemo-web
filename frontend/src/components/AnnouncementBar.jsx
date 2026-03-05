import { useEffect, useState } from "react";
import { getActiveAnnouncement } from "../api/announcements";

function AnnouncementBar() {
  const [text, setText] = useState("");

  useEffect(() => {
    let mounted = true;

    getActiveAnnouncement()
      .then((data) => {
        if (!mounted) return;
        setText(data?.message ? String(data.message).trim() : "");
      })
      .catch(() => {
        if (!mounted) return;
        setText("");
      });

    return () => {
      mounted = false;
    };
  }, []);

  if (!text) {
    return null;
  }

  return (
    <div className="border-b border-white/10 bg-[#0b1822] px-4 py-2 text-center text-xs tracking-wide text-[#d8e7f3]">
      {text}
    </div>
  );
}

export default AnnouncementBar;
