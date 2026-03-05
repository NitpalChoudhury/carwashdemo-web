import { useState } from "react";
import { useUserPanel } from "./useUserPanel";

const initialForm = {
  label: "",
  line1: "",
  city: "",
  state: "",
  pincode: "",
};

function UserAddresses() {
  const { addresses, saveAddress, deleteAddress, loading } = useUserPanel();
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await saveAddress(form, editingId);
    setForm(initialForm);
    setEditingId("");
  };

  const startEdit = (address) => {
    setEditingId(address._id);
    setForm({
      label: address.label,
      line1: address.line1,
      city: address.city,
      state: address.state,
      pincode: address.pincode,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">My Addresses</h1>
      <p className="mt-1 text-sm text-muted">Manage pickup and drop addresses.</p>

      <form className="mt-5 grid gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
        <input
          required
          placeholder="Label (Home/Office)"
          value={form.label}
          onChange={(event) => setForm((prev) => ({ ...prev, label: event.target.value }))}
        />
        <input
          required
          placeholder="Address Line"
          value={form.line1}
          onChange={(event) => setForm((prev) => ({ ...prev, line1: event.target.value }))}
        />
        <input
          required
          placeholder="City"
          value={form.city}
          onChange={(event) => setForm((prev) => ({ ...prev, city: event.target.value }))}
        />
        <input
          required
          placeholder="State"
          value={form.state}
          onChange={(event) => setForm((prev) => ({ ...prev, state: event.target.value }))}
        />
        <input
          required
          placeholder="Pincode"
          value={form.pincode}
          onChange={(event) => setForm((prev) => ({ ...prev, pincode: event.target.value }))}
        />
        <div className="md:col-span-2 flex gap-2">
          <button type="submit" className="btn-brand">
            {editingId ? "Update Address" : "Add Address"}
          </button>
          {editingId && (
            <button
              type="button"
              className="btn-ghost"
              onClick={() => {
                setEditingId("");
                setForm(initialForm);
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div className="mt-6 space-y-3">
        {loading ? (
          <p className="text-sm text-muted">Loading addresses...</p>
        ) : addresses.length ? (
          addresses.map((address) => (
            <div key={address._id} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-semibold">{address.label}</h3>
                  <p className="text-sm text-muted">
                    {address.line1}, {address.city}, {address.state} - {address.pincode}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="btn-ghost" onClick={() => startEdit(address)}>
                    Edit
                  </button>
                  <button type="button" className="btn-ghost" onClick={() => deleteAddress(address._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted">No addresses added.</p>
        )}
      </div>
    </div>
  );
}

export default UserAddresses;
