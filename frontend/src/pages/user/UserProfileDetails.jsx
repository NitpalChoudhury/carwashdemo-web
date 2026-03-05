import { useState } from "react";
import { useUserPanel } from "./useUserPanel";

function UserProfileDetails() {
  const { profile, updateProfile, loading } = useUserPanel();
  const [form, setForm] = useState({ name: "", phone: "" });
  const [avatar, setAvatar] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateProfile({
      name: form.name || profile?.name || "",
      phone: form.phone || profile?.phone || "",
      avatar,
    });
    setAvatar(null);
  };

  if (loading && !profile) {
    return <p className="text-sm text-muted">Loading profile...</p>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">My Profile</h1>
      <p className="mt-1 text-sm text-muted">Update your personal details and profile photo.</p>

      <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <div>
          <label className="mb-2 block text-sm">Full Name</label>
          <input
            value={form.name}
            onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
            placeholder={profile?.name || "Full Name"}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm">Phone</label>
          <input
            value={form.phone}
            onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
            placeholder={profile?.phone || "Phone"}
          />
        </div>
        <div className="md:col-span-2">
          <label className="mb-2 block text-sm">Profile Photo</label>
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={(event) => setAvatar(event.target.files?.[0] || null)}
          />
        </div>
        <div className="md:col-span-2">
          <button type="submit" className="btn-brand">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfileDetails;
