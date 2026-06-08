import { useState } from "react";
import { X } from "lucide-react";

export default function EditPlaceModal({ isOpen, onClose, publication }) {
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
    const [toast, setToast] = useState(false);

    if (!isOpen) return null;

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function handleSave(e) {
        e.preventDefault();
        setToast(true);
        setTimeout(() => { setToast(false); onClose(); }, 1500);
    }

    return (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="modal-card" style={{ maxWidth: 540 }}>
                <button className="edit-modal__close" onClick={onClose}><X size={20} /></button>
                <h2 className="edit-modal__title">Editar Publicación</h2>
                <div style={{ borderBottom: "1px solid var(--color-border)", margin: "0 -32px 24px" }} />

                <form onSubmit={handleSave} className="edit-modal__form">
                    {[
                        { name: "title", label: "Título / Nombre" },
                        { name: "cost", label: "Costo por Noche / Persona (USD)", type: "number" },
                        { name: "location", label: "Ubicación General" },
                        { name: "address", label: "Dirección Detallada" },
                        { name: "checkIn", label: "Horario Check-in" },
                        { name: "checkOut", label: "Horario Check-out" },
                    ].map(f => (
                        <div key={f.name} className="edit-modal__group">
                            <label className="edit-modal__label">{f.label}</label>
                            <input name={f.name} type={f.type || "text"} className="input" value={form[f.name]} onChange={handleChange} />
                        </div>
                    ))}

                    <div className="edit-modal__group">
                        <label className="edit-modal__label">Descripción</label>
                        <textarea name="description" className="input" rows={3} value={form.description} onChange={handleChange} />
                    </div>

                    {toast && <div className="toast">✓ Función disponible próximamente.</div>}

                    <div style={{ borderTop: "1px solid var(--color-border)", margin: "8px -32px 0", padding: "20px 32px 0", display: "flex", gap: "12px", justifyContent: "flex-end" }}>
                        <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn btn-primary">Guardar Cambios</button>
                    </div>
                </form>
            </div>

            <style>{`
                .edit-modal__close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: var(--color-text-muted); cursor: pointer; }
                .edit-modal__title { font-size: var(--font-size-xl); font-weight: 800; color: var(--color-text); }
                .edit-modal__form { display: flex; flex-direction: column; gap: 16px; }
                .edit-modal__group { display: flex; flex-direction: column; gap: 6px; }
                .edit-modal__label { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text); }
            `}</style>
        </div>
    );
}
