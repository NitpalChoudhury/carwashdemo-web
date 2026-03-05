import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { buildFormRequest, buildJsonRequest } from "../../api/client";
import { useAuth } from "../../context/AuthContext";

const initialServiceForm = {
  id: "",
  name: "",
  category: "",
  description: "",
  price: "",
  features: "",
  images: [],
};

const initialReviewForm = {
  id: "",
  title: "",
  description: "",
  photo: null,
};

const initialAnnouncementForm = {
  id: "",
  message: "",
  isActive: true,
};

const navItems = [
  { label: "Overview", path: "/admin" },
  { label: "Services", path: "/admin/services" },
  { label: "Reviews", path: "/admin/reviews" },
  { label: "Bookings", path: "/admin/bookings" },
  { label: "Contacts", path: "/admin/contacts" },
  { label: "Announcements", path: "/admin/announcements" },
  { label: "Banner", path: "/admin/banner" },
  { label: "Videos", path: "/admin/videos" },
];

function AdminLayout() {
  const { user, authFetch, isAuthenticated, isBootstrapping } = useAuth();
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [banner, setBanner] = useState(null);
  const [serviceForm, setServiceForm] = useState(initialServiceForm);
  const [reviewForm, setReviewForm] = useState(initialReviewForm);
  const [announcementForm, setAnnouncementForm] = useState(initialAnnouncementForm);
  const [bannerForm, setBannerForm] = useState({
    title: "",
    subtitle: "",
    image: null,
  });
  const [videoForm, setVideoForm] = useState({
    shortVideosToUpload: [],
    landscapeVideosToUpload: [],
    shortVideoUrls: [],
    landscapeVideoUrls: [],
  });
  const [videoInputResetKey, setVideoInputResetKey] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [actionLabel, setActionLabel] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isAdmin = useMemo(() => user?.role === "admin", [user?.role]);

  const resetMessages = useCallback(() => {
    setMessage("");
    setError("");
  }, []);

  const withAdminAction = useCallback(async (label, action) => {
    setIsActionLoading(true);
    setActionLabel(label);
    try {
      return await action();
    } finally {
      setIsActionLoading(false);
      setActionLabel("");
    }
  }, []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [serviceData, reviewData, bookingData, contactData, announcementData, bannerData, videosData] = await Promise.all([
        authFetch("/services"),
        authFetch("/reviews"),
        authFetch("/admin/bookings"),
        authFetch("/contacts"),
        authFetch("/announcements"),
        authFetch("/banner"),
        authFetch("/videos"),
      ]);
      setServices(Array.isArray(serviceData) ? serviceData : []);
      setReviews(Array.isArray(reviewData) ? reviewData : []);
      setBookings(Array.isArray(bookingData) ? bookingData : []);
      setContacts(Array.isArray(contactData) ? contactData : []);
      setAnnouncements(Array.isArray(announcementData) ? announcementData : []);
      setBanner(bannerData || null);
      setBannerForm({
        title: bannerData?.title || "",
        subtitle: bannerData?.subtitle || "",
        image: null,
      });
      setVideoForm({
        shortVideosToUpload: [],
        landscapeVideosToUpload: [],
        shortVideoUrls: Array.isArray(videosData?.shortVideos)
          ? videosData.shortVideos
          : videosData?.shortVideo
          ? [videosData.shortVideo]
          : [],
        landscapeVideoUrls: Array.isArray(videosData?.landscapeVideos)
          ? videosData.landscapeVideos
          : videosData?.landscapeVideo
          ? [videosData.landscapeVideo]
          : [],
      });
    } catch (requestError) {
      setError(requestError.message || "Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  }, [authFetch]);

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      setLoading(false);
      return;
    }
    loadAll();
  }, [isAuthenticated, isAdmin, loadAll]);

  const handleServiceSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      resetMessages();

      try {
        await withAdminAction(serviceForm.id ? "Updating service..." : "Creating service...", async () => {
          const formData = new FormData();
          formData.append("name", serviceForm.name);
          formData.append("category", serviceForm.category || "Other Services");
          formData.append("description", serviceForm.description);
          formData.append("price", serviceForm.price);
          formData.append("features", serviceForm.features);
          if (serviceForm.images?.length) {
            serviceForm.images.forEach((file) => formData.append("images", file));
          }

          const path = serviceForm.id ? `/services/${serviceForm.id}` : "/services";
          const method = serviceForm.id ? "PUT" : "POST";
          await authFetch(path, buildFormRequest(method, formData));
          setMessage(serviceForm.id ? "Service updated." : "Service created.");
          setServiceForm(initialServiceForm);
          await loadAll();
        });
      } catch (requestError) {
        setError(requestError.message || "Failed to save service.");
      }
    },
    [authFetch, loadAll, resetMessages, serviceForm, withAdminAction]
  );

  const handleServiceDelete = useCallback(
    async (id) => {
      resetMessages();
      try {
        await withAdminAction("Deleting service...", async () => {
          await authFetch(`/services/${id}`, { method: "DELETE" });
          setMessage("Service deleted.");
          await loadAll();
        });
      } catch (requestError) {
        setError(requestError.message || "Failed to delete service.");
      }
    },
    [authFetch, loadAll, resetMessages, withAdminAction]
  );

  const startEditService = useCallback((service) => {
    setServiceForm({
      id: service._id,
      name: service.name,
      category: service.category || "Other Services",
      description: service.description,
      price: String(service.price),
      features: (service.features || []).join(", "),
      images: [],
    });
  }, []);

  const handleReviewSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      resetMessages();

      try {
        await withAdminAction(reviewForm.id ? "Updating review..." : "Creating review...", async () => {
          const formData = new FormData();
          formData.append("title", reviewForm.title);
          formData.append("description", reviewForm.description);
          if (reviewForm.photo) formData.append("photo", reviewForm.photo);

          const path = reviewForm.id ? `/reviews/${reviewForm.id}` : "/reviews";
          const method = reviewForm.id ? "PUT" : "POST";
          await authFetch(path, buildFormRequest(method, formData));
          setMessage(reviewForm.id ? "Review updated." : "Review created.");
          setReviewForm(initialReviewForm);
          await loadAll();
        });
      } catch (requestError) {
        setError(requestError.message || "Failed to save review.");
      }
    },
    [authFetch, loadAll, resetMessages, reviewForm, withAdminAction]
  );

  const handleReviewDelete = useCallback(
    async (id) => {
      resetMessages();
      try {
        await withAdminAction("Deleting review...", async () => {
          await authFetch(`/reviews/${id}`, { method: "DELETE" });
          setMessage("Review deleted.");
          await loadAll();
        });
      } catch (requestError) {
        setError(requestError.message || "Failed to delete review.");
      }
    },
    [authFetch, loadAll, resetMessages, withAdminAction]
  );

  const handleBookingStatusUpdate = useCallback(
    async (id, status) => {
      resetMessages();
      try {
        await withAdminAction("Updating booking status...", async () => {
          await authFetch(`/admin/bookings/${id}/status`, buildJsonRequest("PATCH", { status }));
          setMessage("Booking status updated.");
          await loadAll();
        });
      } catch (requestError) {
        setError(requestError.message || "Failed to update booking status.");
      }
    },
    [authFetch, loadAll, resetMessages, withAdminAction]
  );

  const handleBookingDelete = useCallback(
    async (id) => {
      resetMessages();
      try {
        await withAdminAction("Deleting booking...", async () => {
          await authFetch(`/admin/bookings/${id}`, { method: "DELETE" });
          setMessage("Booking deleted.");
          await loadAll();
        });
      } catch (requestError) {
        setError(requestError.message || "Failed to delete booking.");
      }
    },
    [authFetch, loadAll, resetMessages, withAdminAction]
  );

  const handleContactMarkRead = useCallback(
    async (id) => {
      resetMessages();
      try {
        await withAdminAction("Marking contact as read...", async () => {
          await authFetch(`/contacts/${id}/read`, { method: "PATCH" });
          setMessage("Contact marked as read.");
          await loadAll();
        });
      } catch (requestError) {
        setError(requestError.message || "Failed to update contact.");
      }
    },
    [authFetch, loadAll, resetMessages, withAdminAction]
  );

  const handleContactDelete = useCallback(
    async (id) => {
      resetMessages();
      try {
        await withAdminAction("Deleting contact message...", async () => {
          await authFetch(`/contacts/${id}`, { method: "DELETE" });
          setMessage("Contact message deleted.");
          await loadAll();
        });
      } catch (requestError) {
        setError(requestError.message || "Failed to delete contact.");
      }
    },
    [authFetch, loadAll, resetMessages, withAdminAction]
  );

  const startEditReview = useCallback((review) => {
    setReviewForm({
      id: review._id,
      title: review.title,
      description: review.description,
      photo: null,
    });
  }, []);

  const startEditAnnouncement = useCallback((announcement) => {
    setAnnouncementForm({
      id: announcement._id,
      message: announcement.message || "",
      isActive: Boolean(announcement.isActive),
    });
  }, []);

  const handleAnnouncementSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      resetMessages();

      try {
        await withAdminAction(
          announcementForm.id ? "Updating announcement..." : "Creating announcement...",
          async () => {
            const payload = {
              message: announcementForm.message,
              isActive: announcementForm.isActive,
            };
            const path = announcementForm.id
              ? `/announcements/${announcementForm.id}`
              : "/announcements";
            const method = announcementForm.id ? "PUT" : "POST";
            await authFetch(path, buildJsonRequest(method, payload));
            setMessage(announcementForm.id ? "Announcement updated." : "Announcement created.");
            setAnnouncementForm(initialAnnouncementForm);
            await loadAll();
          }
        );
      } catch (requestError) {
        setError(requestError.message || "Failed to save announcement.");
      }
    },
    [announcementForm, authFetch, loadAll, resetMessages, withAdminAction]
  );

  const handleAnnouncementDelete = useCallback(
    async (id) => {
      resetMessages();
      try {
        await withAdminAction("Deleting announcement...", async () => {
          await authFetch(`/announcements/${id}`, { method: "DELETE" });
          if (announcementForm.id === id) {
            setAnnouncementForm(initialAnnouncementForm);
          }
          setMessage("Announcement deleted.");
          await loadAll();
        });
      } catch (requestError) {
        setError(requestError.message || "Failed to delete announcement.");
      }
    },
    [announcementForm.id, authFetch, loadAll, resetMessages, withAdminAction]
  );

  const handleBannerSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      resetMessages();

      try {
        await withAdminAction("Updating banner...", async () => {
          const formData = new FormData();
          if (bannerForm.title) formData.append("title", bannerForm.title);
          if (bannerForm.subtitle) formData.append("subtitle", bannerForm.subtitle);
          if (bannerForm.image) formData.append("image", bannerForm.image);

          await authFetch("/banner", buildFormRequest("PUT", formData));
          setMessage("Banner updated.");
          setBannerForm((prev) => ({ ...prev, image: null }));
          await loadAll();
        });
      } catch (requestError) {
        setError(requestError.message || "Failed to update banner.");
      }
    },
    [authFetch, bannerForm, loadAll, resetMessages, withAdminAction]
  );

  const handleVideoSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      resetMessages();

      if (!videoForm.shortVideosToUpload.length && !videoForm.landscapeVideosToUpload.length) {
        setError("Please select at least one video file before saving.");
        return;
      }

      try {
        await withAdminAction("Uploading videos...", async () => {
          const formData = new FormData();
          if (videoForm.shortVideosToUpload.length) {
            videoForm.shortVideosToUpload.forEach((file) => formData.append("shortVideo", file));
          }
          if (videoForm.landscapeVideosToUpload.length) {
            videoForm.landscapeVideosToUpload.forEach((file) => formData.append("landscapeVideo", file));
          }

          await authFetch("/videos", buildFormRequest("PUT", formData));
          setMessage("Videos added.");
          setVideoForm((prev) => ({
            ...prev,
            shortVideosToUpload: [],
            landscapeVideosToUpload: [],
          }));
          setVideoInputResetKey((prev) => prev + 1);
          await loadAll();
        });
      } catch (requestError) {
        setError(requestError.message || "Failed to update videos.");
      }
    },
    [authFetch, loadAll, resetMessages, videoForm, withAdminAction]
  );

  const handleBannerDelete = useCallback(async () => {
    resetMessages();
    try {
      await withAdminAction("Deleting banner...", async () => {
        await authFetch("/banner", { method: "DELETE" });
        setMessage("Banner deleted.");
        setBannerForm({ title: "", subtitle: "", image: null });
        await loadAll();
      });
    } catch (requestError) {
      setError(requestError.message || "Failed to delete banner.");
    }
  }, [authFetch, loadAll, resetMessages, withAdminAction]);

  const handleVideoDeleteByType = useCallback(
    async (type) => {
      resetMessages();
      try {
        await withAdminAction("Deleting videos...", async () => {
          const endpoint = type === "short" ? "/videos/short" : "/videos/long";
          await authFetch(endpoint, { method: "DELETE" });
          setMessage(`${type === "short" ? "Short" : "Landscape"} video deleted.`);
          setVideoForm((prev) => ({
            ...prev,
            shortVideosToUpload: [],
            landscapeVideosToUpload: [],
          }));
          setVideoInputResetKey((prev) => prev + 1);
          await loadAll();
        });
      } catch (requestError) {
        setError(requestError.message || "Failed to delete video.");
      }
    },
    [authFetch, loadAll, resetMessages, withAdminAction]
  );

  const handleVideoDeleteAll = useCallback(async () => {
    resetMessages();
    try {
      await withAdminAction("Deleting all videos...", async () => {
        await authFetch("/videos", { method: "DELETE" });
        setMessage("All videos deleted.");
        setVideoForm((prev) => ({
          ...prev,
          shortVideosToUpload: [],
          landscapeVideosToUpload: [],
        }));
        setVideoInputResetKey((prev) => prev + 1);
        await loadAll();
      });
    } catch (requestError) {
      setError(requestError.message || "Failed to delete videos.");
    }
  }, [authFetch, loadAll, resetMessages, withAdminAction]);

  const handleVideoDeleteItem = useCallback(
    async (type, url) => {
      resetMessages();
      try {
        await withAdminAction("Deleting video...", async () => {
          const endpoint = type === "short" ? "/videos/short/item" : "/videos/long/item";
          await authFetch(endpoint, buildJsonRequest("DELETE", { url }));
          setMessage(`${type === "short" ? "Short" : "Landscape"} video deleted.`);
          setVideoForm((prev) => ({
            ...prev,
            shortVideosToUpload: [],
            landscapeVideosToUpload: [],
          }));
          setVideoInputResetKey((prev) => prev + 1);
          await loadAll();
        });
      } catch (requestError) {
        setError(requestError.message || "Failed to delete video.");
      }
    },
    [authFetch, loadAll, resetMessages, withAdminAction]
  );

  if (isBootstrapping) {
    return (
      <div className="page-shell py-12">
        <p className="text-sm text-muted">Loading admin area...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="page-shell py-12">
        <div className="glass-card p-8">
          <h1 className="text-2xl font-bold">Admin access required</h1>
          <p className="mt-2 text-sm text-muted">Your account role is `{user?.role || "user"}`.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell py-8">
      <div className="mb-5">
        <h1 className="section-title">Admin Panel</h1>
        <p className="mt-1 text-sm text-muted">Manage content with protected APIs.</p>
      </div>

      {message && (
        <p className="mb-4 rounded-xl border border-emerald-300/30 bg-emerald-500/10 p-3 text-sm">{message}</p>
      )}
      {error && <p className="mb-4 rounded-xl border border-red-400/40 bg-red-500/10 p-3 text-sm">{error}</p>}
      {isActionLoading && (
        <p className="mb-4 rounded-xl border border-cyan-300/30 bg-cyan-500/10 p-3 text-sm text-cyan-100">
          {actionLabel || "Processing..."}
        </p>
      )}

      <div className="grid gap-5 lg:grid-cols-[240px_1fr]">
        <aside className="glass-card p-4">
          <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted">Navigation</p>
          <nav className="space-y-2">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/admin"}
                className={({ isActive }) =>
                  `block rounded-xl px-3 py-2 text-sm ${
                    isActive
                      ? "bg-[#ffba49] text-[#1b1c20] font-semibold"
                      : "bg-white/5 text-[#d6e5f1] hover:bg-white/10"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </aside>

        <section className="glass-card p-5 md:p-6">
          <Outlet
            context={{
              loading,
              isActionLoading,
              actionLabel,
              services,
              reviews,
              bookings,
              contacts,
              announcements,
              banner,
              serviceForm,
              setServiceForm,
              reviewForm,
              setReviewForm,
              announcementForm,
              setAnnouncementForm,
              bannerForm,
              setBannerForm,
              videoForm,
              setVideoForm,
              videoInputResetKey,
              handleServiceSubmit,
              handleServiceDelete,
              startEditService,
              handleReviewSubmit,
              handleReviewDelete,
              handleBookingStatusUpdate,
              handleBookingDelete,
              handleContactMarkRead,
              handleContactDelete,
              startEditReview,
              handleAnnouncementSubmit,
              handleAnnouncementDelete,
              startEditAnnouncement,
              handleBannerSubmit,
              handleBannerDelete,
              handleVideoSubmit,
              handleVideoDeleteByType,
              handleVideoDeleteAll,
              handleVideoDeleteItem,
              setInitialServiceForm: () => setServiceForm(initialServiceForm),
              setInitialReviewForm: () => setReviewForm(initialReviewForm),
              setInitialAnnouncementForm: () => setAnnouncementForm(initialAnnouncementForm),
            }}
          />
        </section>
      </div>
    </div>
  );
}

export default AdminLayout;
