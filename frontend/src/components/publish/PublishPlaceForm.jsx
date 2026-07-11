import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { unwrapResponse } from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const SERVICES_OPTIONS = [
    "Wi-Fi Starlink Satelital",
    "Luz Eléctrica 24/7",
    "Agua Constante",
    "Estacionamiento",
    "Aire Acondicionado",
    "Cocina Equipada",
];

const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop";

export default function PublishPlaceForm() {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const [form, setForm] = useState({
        title: "", categoryId: "",
        location: "", address: "", checkIn: "08:00",
        checkOut: "18:00", services: [], description: "",
        coverImage: ""
    });

    useEffect(() => {
        if (!isAuthenticated) { navigate("/"); return; }
        api.get("/categories").then(res => {
            const data = unwrapResponse(res.data);
            setCategories(data.data || []);
        });
    }, [isAuthenticated, navigate]);

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    function toggleService(s) {
        setForm(prev => ({
            ...prev,
            services: prev.services.includes(s)
                ? prev.services.filter(x => x !== s)
                : [...prev.services, s]
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        if (!form.title || !form.categoryId || !form.location || !form.description) {
            setError("Título, categoría, ubicación y descripción son obligatorios.");
            return;
        }

        setError("");
        setLoading(true);
        try {
            await api.post("/places", {
                title: form.title,
                description: form.description,
                location: form.location,
                address: form.address || null,
                categoryId: Number(form.categoryId),
                type: "lugar",
                checkIn: form.checkIn || null,
                checkOut: form.checkOut || null,
                services: form.services.length > 0 ? form.services : null,
                coverImage: form.coverImage.trim() || DEFAULT_IMAGE
            });
            setSuccess(true);
            setForm({ title: "", categoryId: "", location: "", address: "", checkIn: "08:00", checkOut: "18:00", services: [], description: "", coverImage: "" });
        } catch (err) {
            setError(err.response?.data?.message || "Error al publicar. Intenta de nuevo.");
        } finally {
            setLoading(false);
        }
    }

    if (success) return (
        <div className="publish-success">
            <h3>¡Lugar enviado correctamente!</h3>
            <p>Queda pendiente de aprobación por el administrador.</p>
            <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
                <button className="btn btn-primary" onClick={() => setSuccess(false)}>Publicar otro</button>
                <button className="btn btn-outline" onClick={() => navigate("/mis-publicaciones")}>Ver mis publicaciones</button>
            </div>
        </div>
    );

    return (
        <form className="publish-form" onSubmit={handleSubmit}>
            <h3 className="publish-form__subtitle">Nuevo Lugar Turístico</h3>

            <div className="publish-form__group">
                <label>Nombre del Lugar / Título <span className="publish-form__required">*</span></label>
                <input name="title" className="input" placeholder="ej. Laguna de Mucubají" value={form.title} onChange={handleChange} />
            </div>

            <div className="publish-form__row">
                <div className="publish-form__group">
                    <label>Categoría <span className="publish-form__required">*</span></label>
                    <select name="categoryId" className="input" value={form.categoryId} onChange={handleChange}>
                        <option value="">Seleccionar...</option>
                        {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                </div>
                <div className="publish-form__group">
                    <label>Ubicación General (Estado / Ciudad) <span className="publish-form__required">*</span></label>
                    <input name="location" className="input" placeholder="ej. Mérida, Venezuela" value={form.location} onChange={handleChange} />
                </div>
            </div>

            <div className="publish-form__group">
                <label>Dirección Detallada</label>
                <input name="address" className="input" placeholder="ej. Sector Mucuchíes, Km 45" value={form.address} onChange={handleChange} />
            </div>

            <div className="publish-form__group">
                <label>Enlace de la Imagen de Portada (URL)
                    <span className="publish-form__hint-label"> — Opcional. Si no colocas una, se usará una imagen por defecto.</span>
                </label>
                <input name="coverImage" className="input" placeholder="ej. https://ejemplo.com/imagen.jpg" value={form.coverImage} onChange={handleChange} />
                {!form.coverImage.trim() && (
                    <div className="publish-form__img-preview">
                        <span>Vista previa por defecto:</span>
                        <img src={DEFAULT_IMAGE} alt="Imagen por defecto" />
                    </div>
                )}
            </div>

            <div className="publish-form__row">
                <div className="publish-form__group">
                    <label>Horario apertura</label>
                    <input name="checkIn" className="input" value={form.checkIn} onChange={handleChange} />
                </div>
                <div className="publish-form__group">
                    <label>Horario de cierre</label>
                    <input name="checkOut" className="input" value={form.checkOut} onChange={handleChange} />
                </div>
            </div>

            <div className="publish-form__group">
                <label>Servicios Incluidos</label>
                <div className="publish-form__services">
                    {SERVICES_OPTIONS.map(s => (
                        <label key={s} className="publish-form__service-item">
                            <input
                                type="checkbox"
                                checked={form.services.includes(s)}
                                onChange={() => toggleService(s)}
                            />
                            {s}
                        </label>
                    ))}
                </div>
            </div>

            <div className="publish-form__group">
                <label>Descripción Completa <span className="publish-form__required">*</span></label>
                <textarea name="description" className="input" rows={4} placeholder="Describe los atractivos, servicios y recomendaciones del lugar..." value={form.description} onChange={handleChange} />
            </div>

            {error && <p className="publish-form__error">{error}</p>}

            <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
                {loading ? "Enviando..." : "Publicar Lugar para Aprobación"}
            </button>

            <style>{`
                .publish-form { display: flex; flex-direction: column; gap: 20px; }
                .publish-form__subtitle { font-size: var(--font-size-xl); font-weight: 700; color: var(--color-text); }
                .publish-form__group { display: flex; flex-direction: column; gap: 6px; }
                .publish-form__group label { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text); }
                .publish-form__required { color: #EF4444; margin-left: 2px; }
                .publish-form__hint-label { font-weight: 400; color: var(--color-text-muted); font-size: var(--font-size-xs); }
                .publish-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
                .publish-form__services { display: flex; flex-direction: column; gap: 10px; }
                .publish-form__service-item { display: flex; align-items: center; gap: 10px; font-size: var(--font-size-sm); color: var(--color-text); cursor: pointer; }
                .publish-form__service-item input { accent-color: var(--color-primary); width: 16px; height: 16px; }
                .publish-form__error { background: #FEE2E2; color: #991B1B; padding: 10px 14px; border-radius: var(--radius-sm); font-size: var(--font-size-sm); }
                .publish-form__img-preview { display: flex; flex-direction: column; gap: 6px; margin-top: 4px; }
                .publish-form__img-preview span { font-size: var(--font-size-xs); color: var(--color-text-muted); }
                .publish-form__img-preview img { width: 100%; max-height: 140px; object-fit: cover; border-radius: var(--radius); border: 1px solid var(--color-border); }
                .publish-success { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 48px 24px; text-align: center; }
                .publish-success h3 { font-size: var(--font-size-xl); font-weight: 700; color: var(--color-text); }
                .publish-success p { color: var(--color-text-muted); }
                @media (max-width: 600px) { .publish-form__row { grid-template-columns: 1fr; } }
            `}</style>
        </form>
    );
}
