import { useAdminPanel } from "./useAdminPanel";

function AdminServices() {
  const {
    loading,
    services,
    serviceForm,
    setServiceForm,
    handleServiceSubmit,
    handleServiceDelete,
    startEditService,
    setInitialServiceForm,
  } = useAdminPanel();

  return (
    <div>
      <h2 className="text-2xl font-bold">Services</h2>
      <p className="mt-1 text-sm text-muted">Create, edit, and delete service offerings.</p>

      <form className="mt-5 grid gap-3 md:grid-cols-2" onSubmit={handleServiceSubmit}>
        <input
          placeholder="Name"
          value={serviceForm.name}
          onChange={(event) => setServiceForm((prev) => ({ ...prev, name: event.target.value }))}
          required
        />
        <input
          type="number"
          min="0"
          placeholder="Price"
          value={serviceForm.price}
          onChange={(event) => setServiceForm((prev) => ({ ...prev, price: event.target.value }))}
          required
        />
        <textarea
          className="md:col-span-2"
          placeholder="Description"
          value={serviceForm.description}
          onChange={(event) => setServiceForm((prev) => ({ ...prev, description: event.target.value }))}
          required
        />
        <input
          className="md:col-span-2"
          placeholder="Features (comma separated)"
          value={serviceForm.features}
          onChange={(event) => setServiceForm((prev) => ({ ...prev, features: event.target.value }))}
        />
        <input
          className="md:col-span-2"
          type="file"
          multiple
          accept="image/png,image/jpeg,image/jpg"
          onChange={(event) =>
            setServiceForm((prev) => ({
              ...prev,
              images: event.target.files ? Array.from(event.target.files) : [],
            }))
          }
          required={!serviceForm.id && !serviceForm.images?.length}
        />
        <p className="md:col-span-2 text-xs text-muted">
          You can upload one or multiple images. Auto compression is enabled on server. Max upload size: 20MB per file.
        </p>
        <div className="flex gap-2 md:col-span-2">
          <button className="btn-brand" type="submit">
            {serviceForm.id ? "Update Service" : "Create Service"}
          </button>
          {serviceForm.id && (
            <button type="button" className="btn-ghost" onClick={setInitialServiceForm}>
              Cancel Edit
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <p className="mt-6 text-sm text-muted">Loading services...</p>
      ) : (
        <div className="mt-6 space-y-3">
          {services.map((service) => (
            <div key={service._id} className="rounded-xl border border-white/10 bg-black/20 p-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {service.image ? (
                    <img
                      src={service.image}
                      alt={service.name}
                      className="h-14 w-14 rounded-lg border border-white/20 object-cover"
                    />
                  ) : (
                    <div className="flex h-14 w-14 items-center justify-center rounded-lg border border-white/20 bg-white/5 text-[10px] text-muted">
                      No image
                    </div>
                  )}
                  <div>
                  <h3 className="font-semibold">{service.name}</h3>
                  <p className="text-sm text-muted">INR {service.price}</p>
                  {Array.isArray(service.images) && service.images.length > 1 && (
                    <p className="text-xs text-muted">{service.images.length} images</p>
                  )}
                  </div>
                </div>
                {Array.isArray(service.images) && service.images.length > 1 && (
                  <div className="flex gap-1">
                    {service.images.slice(1, 4).map((url, index) => (
                      <img
                        key={`${service._id}-thumb-${index}`}
                        src={url}
                        alt={`${service.name}-${index + 2}`}
                        className="h-10 w-10 rounded-md border border-white/20 object-cover"
                      />
                    ))}
                  </div>
                )}
                <div className="flex gap-2">
                  <button type="button" className="btn-ghost" onClick={() => startEditService(service)}>
                    Edit
                  </button>
                  <button type="button" className="btn-ghost" onClick={() => handleServiceDelete(service._id)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminServices;
