import { useState } from "react";
import { useUserPanel } from "./useUserPanel";

const initialForm = {
  make: "",
  model: "",
  year: "",
  registrationNumber: "",
};

function UserCars() {
  const { cars, saveCar, deleteCar, loading } = useUserPanel();
  const [form, setForm] = useState(initialForm);
  const [editingId, setEditingId] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await saveCar(form, editingId);
    setForm(initialForm);
    setEditingId("");
  };

  const startEdit = (car) => {
    setEditingId(car._id);
    setForm({
      make: car.make,
      model: car.model,
      year: String(car.year),
      registrationNumber: car.registrationNumber,
    });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">My Cars</h1>
      <p className="mt-1 text-sm text-muted">Manage your vehicles for faster booking.</p>

      <form className="mt-5 grid gap-3 md:grid-cols-2" onSubmit={handleSubmit}>
        <input
          required
          placeholder="Make"
          value={form.make}
          onChange={(event) => setForm((prev) => ({ ...prev, make: event.target.value }))}
        />
        <input
          required
          placeholder="Model"
          value={form.model}
          onChange={(event) => setForm((prev) => ({ ...prev, model: event.target.value }))}
        />
        <input
          required
          type="number"
          placeholder="Year"
          value={form.year}
          onChange={(event) => setForm((prev) => ({ ...prev, year: event.target.value }))}
        />
        <input
          required
          placeholder="Registration Number"
          value={form.registrationNumber}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, registrationNumber: event.target.value }))
          }
        />
        <div className="md:col-span-2 flex gap-2">
          <button type="submit" className="btn-brand">
            {editingId ? "Update Car" : "Add Car"}
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
          <p className="text-sm text-muted">Loading cars...</p>
        ) : cars.length ? (
          cars.map((car) => (
            <div key={car._id} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="font-semibold">
                    {car.make} {car.model}
                  </h3>
                  <p className="text-sm text-muted">
                    {car.year} | {car.registrationNumber}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button type="button" className="btn-ghost" onClick={() => startEdit(car)}>
                    Edit
                  </button>
                  <button type="button" className="btn-ghost" onClick={() => deleteCar(car._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-sm text-muted">No cars added.</p>
        )}
      </div>
    </div>
  );
}

export default UserCars;
