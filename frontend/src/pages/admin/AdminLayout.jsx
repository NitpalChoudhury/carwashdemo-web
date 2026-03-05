import { useCallback, useEffect, useMemo, useState } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { buildFormRequest } from "../../api/client";
import { useAuth } from "../../context/AuthContext";

const initialServiceForm = {
  id: "",
  name: "",
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

const navItems = [
  { label: "Overview", path: "/admin" },
  { label: "Services", path: "/admin/services" },
  { label: "Reviews", path: "/admin/reviews" },
  { label: "Banner", path: "/admin/banner" },
  { label: "Videos", path: "/admin/videos" },
];

function AdminLayout() {
  const { user, authFetch, isAuthenticated, isBootstrapping } = useAuth();
  const [services, setServices] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [banner, setBanner] = useState(null);
  const [serviceForm, setServiceForm] = useState(initialServiceForm);
  const [reviewForm, setReviewForm] = useState(initialReviewForm);
  const [bannerForm, setBannerForm] = useState({
    title: "",
    subtitle: "",
    image: null,
  });
  const [videoForm, setVideoForm] = useState({
    shortVideo: null,
    landscapeVideo: null,
    shortVideoUrl: "",
    landscapeVideoUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const isAdmin = useMemo(() => user?.role === "admin", [user?.role]);

  const resetMessages = useCallback(() => {
    setMessage("");
    setError("");
  }, []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    try {
      const [serviceData, reviewData, bannerData, videosData] = await Promise.all([
        authFetch("/services"),
        authFetch("/reviews"),
        authFetch("/banner"),
        authFetch("/videos"),
      ]);
      setServices(Array.isArray(serviceData) ? serviceData : []);
      setReviews(Array.isArray(reviewData) ? reviewData : []);
      setBanner(bannerData || null);
      setBannerForm({
        title: bannerData?.title || "",
        subtitle: bannerData?.subtitle || "",
        image: null,
      });
      setVideoForm({
        shortVideo: null,
        landscapeVideo: null,
        shortVideoUrl: videosData?.shortVideo || "",
        landscapeVideoUrl: videosData?.landscapeVideo || "",
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
        const formData = new FormData();
        formData.append("name", serviceForm.name);
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
      } catch (requestError) {
        setError(requestError.message || "Failed to save service.");
      }
    },
    [authFetch, loadAll, resetMessages, serviceForm]
  );

  const handleServiceDelete = useCallback(
    async (id) => {
      resetMessages();
      try {
        await authFetch(`/services/${id}`, { method: "DELETE" });
        setMessage("Service deleted.");
        await loadAll();
      } catch (requestError) {
        setError(requestError.message || "Failed to delete service.");
      }
    },
    [authFetch, loadAll, resetMessages]
  );

  const startEditService = useCallback((service) => {
    setServiceForm({
      id: service._id,
      name: service.name,
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
      } catch (requestError) {
        setError(requestError.message || "Failed to save review.");
      }
    },
    [authFetch, loadAll, resetMessages, reviewForm]
  );

  const handleReviewDelete = useCallback(
    async (id) => {
      resetMessages();
      try {
        await authFetch(`/reviews/${id}`, { method: "DELETE" });
        setMessage("Review deleted.");
        await loadAll();
      } catch (requestError) {
        setError(requestError.message || "Failed to delete review.");
      }
    },
    [authFetch, loadAll, resetMessages]
  );

  const startEditReview = useCallback((review) => {
    setReviewForm({
      id: review._id,
      title: review.title,
      description: review.description,
      photo: null,
    });
  }, []);

  const handleBannerSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      resetMessages();

      try {
        const formData = new FormData();
        if (bannerForm.title) formData.append("title", bannerForm.title);
        if (bannerForm.subtitle) formData.append("subtitle", bannerForm.subtitle);
        if (bannerForm.image) formData.append("image", bannerForm.image);

        await authFetch("/banner", buildFormRequest("PUT", formData));
        setMessage("Banner updated.");
        setBannerForm((prev) => ({ ...prev, image: null }));
        await loadAll();
      } catch (requestError) {
        setError(requestError.message || "Failed to update banner.");
      }
    },
    [authFetch, bannerForm, loadAll, resetMessages]
  );

  const handleVideoSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      resetMessages();

      try {
        const formData = new FormData();
        if (videoForm.shortVideo) formData.append("shortVideo", videoForm.shortVideo);
        if (videoForm.landscapeVideo) formData.append("landscapeVideo", videoForm.landscapeVideo);

        await authFetch("/videos", buildFormRequest("PUT", formData));
        setMessage("Videos updated.");
        setVideoForm((prev) => ({
          ...prev,
          shortVideo: null,
          landscapeVideo: null,
        }));
        await loadAll();
      } catch (requestError) {
        setError(requestError.message || "Failed to update videos.");
      }
    },
    [authFetch, loadAll, resetMessages, videoForm]
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
              services,
              reviews,
              banner,
              serviceForm,
              setServiceForm,
              reviewForm,
              setReviewForm,
              bannerForm,
              setBannerForm,
              videoForm,
              setVideoForm,
              handleServiceSubmit,
              handleServiceDelete,
              startEditService,
              handleReviewSubmit,
              handleReviewDelete,
              startEditReview,
              handleBannerSubmit,
              handleVideoSubmit,
              setInitialServiceForm: () => setServiceForm(initialServiceForm),
              setInitialReviewForm: () => setReviewForm(initialReviewForm),
            }}
          />
        </section>
      </div>
    </div>
  );
}

export default AdminLayout;
