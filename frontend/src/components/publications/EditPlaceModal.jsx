import { useState, useEffect } from "react";
import { X } from "lucide-react";
import api, { unwrapResponse } from "../../services/api";

export default function EditPlaceModal({ isOpen, onClose, publication, onSaveSuccess }) {
    const [form, setForm] = useState({
        title: publication?.title || "",
        categoryId: publication?.categoryId || "",
        cost: publication?.cost || "",
        location: publication?.location || "",
        address: publication?.address || "",
        checkIn: publication?.checkIn || "",
        checkOut: publication?.checkOut || "",
        description: publication?.description || "",
    });
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!isOpen) return;
        
        // Reset form to latest publication details when opened
        setForm({
            title: publication?.title || "",
            categoryId: publication?.categoryId || "",
            cost: publication?.cost !== null ? String(publication?.cost) : "",
            location: publication?.location || "",
            address: publication?.address || "",
            checkIn: publication?.checkIn || "",
            checkOut: publication?.checkOut || "",
            description: publication?.description || "",
        });
        setError("");

        api.get("/categories")
            .then(res => {
                const data = unwrapResponse(res.data);
                setCategories(data.data || data || []);
            })
            .catch(() => {});
    }, [isOpen, publication]);

    if (!isOpen) return null;

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSave(e) {
        e.preventDefault();
        if (!form.title || !form.categoryId || !form.location || !form.description) {
            setError("Título, categoría, ubicación y descripción son campos obligatorios.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            await api.put(`/places/${publication.id}`, {
                title: form.title,
                description: form.description,
                location: form.location,
                address: form.address || null,
                categoryId: Number(form.categoryId),
                cost: form.cost ? Number(form.cost) : null,
                checkIn: form.checkIn || null,
                checkOut: form.checkOut || null,
            });

            if (onSaveSuccess) {
                onSaveSuccess();
            }
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || "Error al guardar los cambios. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="modal-card" style={{ maxWidth: 540 }}>
                <button className="edit-modal__close" onClick={onClose} disabled={loading}><X size={20} /></button>
                <h2 className="edit-modal__title">Editar Publicación</h2>
                <div style={{ borderBottom: "1px solid var(--color-border)", margin: "0 -32px 24px" }} />

                <form onSubmit={handleSave} className="edit-modal__form">
                    <div className="edit-modal__group">
                        <label className="edit-modal__label">Título / Nombre</label>
                        <input name="title" className="input" value={form.title} onChange={handleChange} required disabled={loading} />
                    </div>

                    <div className="edit-modal__row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div className="edit-modal__group">
                            <label className="edit-modal__label">Categoría</label>
                            <select name="categoryId" className="input" value={form.categoryId} onChange={handleChange} required disabled={loading}>
                                <option value="">Seleccionar...</option>
                                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                            </select>
                        </div>
                        <div className="edit-modal__group">
                            <label className="edit-modal__label">Costo (USD)</label>
                            <input name="cost" type="number" className="input" value={form.cost} onChange={handleChange} disabled={loading} />
                        </div>
                    </div>

                    <div className="edit-modal__row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div className="edit-modal__group">
                            <label className="edit-modal__label">Ubicación General</label>
                            <input name="location" className="input" value={form.location} onChange={handleChange} required disabled={loading} />
                        </div>
                        <div className="edit-modal__group">
                            <label className="edit-modal__label">Dirección Detallada</label>
                            <input name="address" className="input" value={form.address} onChange={handleChange} disabled={loading} />
                        </div>
                    </div>

                    <div className="edit-modal__row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                        <div className="edit-modal__group">
                            <label className="edit-modal__label">Horario Check-in</label>
                            <input name="checkIn" className="input" value={form.checkIn} onChange={handleChange} disabled={loading} />
                        </div>
                        <div className="edit-modal__group">
                            <label className="edit-modal__label">Horario Check-out</label>
                            <input name="checkOut" className="input" value={form.checkOut} onChange={handleChange} disabled={loading} />
                        </div>
                    </div>

                    <div className="edit-modal__group">
                        <label className="edit-modal__label">Descripción</label>
                        <textarea name="description" className="input" rows={3} value={form.description} onChange={handleChange} required disabled={loading} />
                    </div>

                    {error && <p style={{ color: "var(--color-error)", fontSize: "var(--font-size-sm)", margin: 0 }}>{error}</p>}

                    <div style={{ borderTop: "1px solid var(--color-border)", margin: "8px -32px 0", padding: "20px 32px 0", display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                        <button type="button" className="btn btn-outline" onClick={onClose} disabled={loading}>Cancelar</button>
                        <button type="submit" className="btn btn-primary" disabled={loading}>
                            {loading ? "Guardando..." : "Guardar Cambios"}
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
                .edit-modal__close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: var(--color-text-muted); cursor: pointer; }
                .edit-modal__title { font-size: var(--font-size-xl); font-weight: 800; color: var(--color-text); }
                .edit-modal__form { display: flex; flex-direction: column; gap: 16px; }
                .edit-modal__group { display: flex; flex-direction: column; gap: 6px; }
                .edit-modal__label { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text); }
                @media (max-width: 600px) {
                    .edit-modal__row { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </div>
    );
}
