import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Star, Clock, DollarSign, Wifi, Zap, Droplets, ArrowLeft, Send } from "lucide-react";
import api, { unwrapResponse } from "../services/api";
import { useAuth } from "../context/AuthContext";

const DEFAULT_IMAGES = {
    lugar:     "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop",
    actividad: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop"
};

const SERVICE_ICONS = {
    "Wi-Fi Starlink": Wifi, "Wi-Fi": Wifi,
    "Luz Eléctrica 24/7": Zap, "Luz 24/7": Zap,
    "Agua Constante": Droplets
};

function StarRating({ value, onChange, interactive = false }) {
    const [hovered, setHovered] = useState(0);
    const display = interactive ? (hovered || value) : value;
    return (
        <div style={{ display: "flex", gap: "4px" }}>
            {[1, 2, 3, 4, 5].map(n => (
                <button
                    key={n}
                    type="button"
                    onClick={() => interactive && onChange && onChange(n)}
                    onMouseEnter={() => interactive && setHovered(n)}
                    onMouseLeave={() => interactive && setHovered(0)}
                    style={{ background: "none", border: "none", cursor: interactive ? "pointer" : "default", padding: 0 }}
                    disabled={!interactive}
                >
                    <Star
                        size={28}
                        fill={n <= display ? "#F5A623" : "none"}
                        color={n <= display ? "#F5A623" : "#D1D5DB"}
                        strokeWidth={1.5}
                    />
                </button>
            ))}
        </div>
    );
}

export default function PlaceDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user, openAuthModal } = useAuth();

    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reviews, setReviews] = useState([]);

    // Estado del formulario de reseña
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [sending, setSending] = useState(false);
    const [reviewSent, setReviewSent] = useState(false);
    const [reviewError, setReviewError] = useState("");
    const [myReview, setMyReview] = useState(null);   // reseña propia si existe
    const [editMode, setEditMode] = useState(false);  // true = modo edición

    useEffect(() => {
        api.get(`/places/${id}`)
            .then(res => {
                const data = unwrapResponse(res.data);
                setPlace(data.data || data);
            })
            .catch(() => setError("Lugar no encontrado."))
            .finally(() => setLoading(false));

        api.get(`/places/${id}/reviews`)
            .then(res => {
                const data = unwrapResponse(res.data);
                setReviews(data.data || data || []);
            })
            .catch(() => {});
    }, [id]);

    // Detectar reseña propia cuando cambia el listado o el usuario
    useEffect(() => {
        if (!user || reviews.length === 0) { setMyReview(null); return; }
        const own = reviews.find(r => r.userId === user.id || r.author?.id === user.id);
        setMyReview(own || null);
    }, [reviews, user]);

    async function refreshData() {
        const [revRes, placeRes] = await Promise.all([
            api.get(`/places/${id}/reviews`),
            api.get(`/places/${id}`)
        ]);
        const revData = unwrapResponse(revRes.data);
        setReviews(revData.data || revData || []);
        const placeData = unwrapResponse(placeRes.data);
        setPlace(placeData.data || placeData);
    }

    function handleEditReview() {
        if (!myReview) return;
        setRating(myReview.rating);
        setComment(myReview.comment || "");
        setEditMode(true);
        setReviewSent(false);
        setReviewError("");
    }

    async function submitReview() {
        if (!comment.trim()) {
            setReviewError("Escribe un comentario antes de enviar.");
            return;
        }
        setSending(true);
        setReviewError("");
        try {
            if (editMode && myReview) {
                await api.put(`/places/${id}/reviews/${myReview.id}`, { rating, comment });
            } else {
                await api.post(`/places/${id}/reviews`, { rating, comment });
                setComment("");
                setRating(5);
            }
            setReviewSent(true);
            setEditMode(false);
            await refreshData();
        } catch (err) {
            setReviewError(err.response?.data?.message || "Error al enviar la reseña.");
        } finally {
            setSending(false);
        }
    }

    function handleSendReview() {
        if (!isAuthenticated) {
            openAuthModal("login", async () => { await submitReview(); });
            return;
        }
        submitReview();
    }

    if (loading) return (
        <div style={{ display: "flex", justifyContent: "center", padding: "80px" }}>
            <div className="spinner" />
        </div>
    );

    if (error || !place) return (
        <div style={{ textAlign: "center", padding: "80px", color: "var(--color-text-muted)" }}>
            {error || "Lugar no encontrado."}
        </div>
    );

    const rating_ = parseFloat(place.ratingAverage || 0);

    let services = [];
    if (place.services) {
        if (Array.isArray(place.services)) {
            services = place.services;
        } else if (typeof place.services === "string") {
            try { services = JSON.parse(place.services); } catch { services = []; }
        }
    }

    const isExperience = place.type === "actividad";

    return (
        <div className="detail-page">
            <div className="container">
                <button className="detail-page__back" onClick={() => navigate(-1)}>
                    <ArrowLeft size={16} /> Volver
                </button>

                <div className="detail-page__image">
                    <img
                        src={place.coverImage || DEFAULT_IMAGES[place.type] || DEFAULT_IMAGES.lugar}
                        alt={place.title}
                        onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = DEFAULT_IMAGES[place.type] || DEFAULT_IMAGES.lugar; }}
                    />
                    <span className={`badge ${isExperience ? "badge-exp" : "badge-place"} detail-page__type`}>
                        {isExperience ? "EXPERIENCIA" : "LUGAR"}
                    </span>
                </div>

                <div className="detail-page__layout">
                    <div className="detail-page__main">
                        <h1 className="detail-page__title">{place.title}</h1>

                        <div className="detail-page__meta">
                            <span className="detail-page__location"><MapPin size={15} /> {place.location}</span>
                            {place.address && <span className="detail-page__address">{place.address}</span>}
                            {rating_ > 0 && (
                                <span className="detail-page__rating">
                                    <Star size={15} fill="#F5A623" color="#F5A623" /> {rating_.toFixed(1)} de 5
                                </span>
                            )}
                        </div>

                        <p className="detail-page__desc">{place.description}</p>

                        {services.length > 0 && (
                            <div className="detail-page__services">
                                <h3>Servicios incluidos</h3>
                                <div className="detail-page__services-list">
                                    {services.map((s, i) => {
                                        const Icon = SERVICE_ICONS[s] || null;
                                        return (
                                            <span key={i} className="detail-page__service">
                                                {Icon ? <Icon size={15} /> : "✓"} {s}
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* ── Sección de reseñas ── */}
                        <div className="detail-page__reviews-section">
                            <h3>Reseñas</h3>

                            {reviewSent && !editMode ? (
                                <div className="review-box review-box--success">
                                    ✓ ¡Reseña {editMode ? "actualizada" : "enviada"} correctamente! Gracias por tu opinión.
                                    <button
                                        className="btn btn-outline"
                                        style={{ marginTop: "8px", fontSize: "var(--font-size-sm)" }}
                                        onClick={handleEditReview}
                                    >
                                        ✏️ Editar mi reseña
                                    </button>
                                </div>
                            ) : (isAuthenticated && myReview && !editMode) ? (
                                <div className="review-box" style={{ borderColor: "var(--color-primary)" }}>
                                    <p className="review-box__label">Ya tienes una reseña publicada.</p>
                                    <StarRating value={myReview.rating} />
                                    {myReview.comment && (
                                        <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", margin: 0 }}>
                                            "{myReview.comment}"
                                        </p>
                                    )}
                                    <button
                                        className="btn btn-outline"
                                        style={{ alignSelf: "flex-start", fontSize: "var(--font-size-sm)" }}
                                        onClick={handleEditReview}
                                    >
                                        ✏️ Editar mi reseña
                                    </button>
                                </div>
                            ) : (
                                <div className="review-box">
                                    <p className="review-box__label">
                                        {editMode ? "✏️ Editando tu reseña" : "¿Cuál es tu calificación?"}
                                    </p>
                                    <StarRating value={rating} interactive onChange={setRating} />

                                    <textarea
                                        className="review-box__textarea"
                                        placeholder="Comparte tu experiencia en este lugar..."
                                        value={comment}
                                        onChange={e => setComment(e.target.value)}
                                        rows={3}
                                    />

                                    {!isAuthenticated && (
                                        <p className="review-box__hint">
                                             Inicia sesión para publicar tu reseña. Tu comentario no se perderá.
                                        </p>
                                    )}

                                    {reviewError && (
                                        <p className="review-box__error">{reviewError}</p>
                                    )}

                                    <div style={{ display: "flex", gap: "10px", alignSelf: "flex-end" }}>
                                        {editMode && (
                                            <button
                                                type="button"
                                                className="btn btn-outline"
                                                onClick={() => { setEditMode(false); setReviewError(""); }}
                                                disabled={sending}
                                            >
                                                Cancelar
                                            </button>
                                        )}
                                        <button
                                            className="btn btn-primary"
                                            onClick={handleSendReview}
                                            disabled={sending}
                                        >
                                            <Send size={15} />
                                            {sending ? "Guardando..." : editMode ? "Guardar cambios" : isAuthenticated ? "Publicar reseña" : "Iniciar sesión y publicar"}
                                        </button>
                                    </div>
                                </div>
                            )}

                            <div className="detail-page__reviews-list" style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "16px" }}>
                                {reviews.length === 0 ? (
                                    <p className="detail-page__reviews-empty" style={{ fontStyle: "italic", color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)" }}>No hay reseñas para este lugar aún. ¡Sé el primero en dejar una!</p>
                                ) : (
                                    reviews.map((rev) => (
                                        <div key={rev.id} className="review-item" style={{ background: "var(--color-white)", border: "1px solid var(--color-border)", borderRadius: "var(--radius-lg)", padding: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
                                            <div className="review-item__header" style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                                                <img 
                                                    src={`/assets/${rev.author?.avatar || 'avatar1.png'}`} 
                                                    alt={rev.author?.name} 
                                                    style={{ width: "36px", height: "36px", borderRadius: "50%", objectFit: "cover" }}
                                                    onError={(e) => { e.target.src = '/assets/avatar1.png'; }}
                                                />
                                                <div className="review-item__author-info" style={{ display: "flex", flexDirection: "column", flex: 1 }}>
                                                    <span className="review-item__author-name" style={{ fontWeight: "600", fontSize: "var(--font-size-sm)", color: "var(--color-text)" }}>{rev.author?.name || "Usuario"}</span>
                                                    <span className="review-item__date" style={{ fontSize: "var(--font-size-xs)", color: "var(--color-text-muted)" }}>{new Date(rev.createdAt || rev.created_at).toLocaleDateString()}</span>
                                                </div>
                                                <div className="review-item__stars">
                                                    <StarRating value={rev.rating} />
                                                </div>
                                            </div>
                                            {rev.comment && <p className="review-item__comment" style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text)", margin: 0, lineHeight: "1.5" }}>{rev.comment}</p>}
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="detail-page__sidebar">
                        <div className="card detail-page__book-card">
                            {place.cost && (
                                <div className="detail-page__price">
                                    <DollarSign size={18} />
                                    <span>${Number(place.cost).toFixed(0)}</span>
                                    <small>/{isExperience ? "persona" : "noche"}</small>
                                </div>
                            )}
                            {(place.checkIn || place.checkOut) && (
                                <div className="detail-page__schedule">
                                    {place.checkIn && <span><Clock size={14} /> Horario apertura: {place.checkIn}</span>}
                                    {place.checkOut && <span><Clock size={14} /> Horario de cierre: {place.checkOut}</span>}
                                </div>
                            )}
                            {place.category && (
                                <span className="badge badge-place" style={{ marginTop: "8px" }}>{place.category.name}</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
                .detail-page { padding: 32px 0 64px; }
                .detail-page__back { display: flex; align-items: center; gap: 6px; font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text-muted); background: none; border: none; cursor: pointer; margin-bottom: 24px; transition: color var(--transition); }
                .detail-page__back:hover { color: var(--color-primary); }
                .detail-page__image { position: relative; height: 400px; border-radius: var(--radius-xl); overflow: hidden; margin-bottom: 32px; }
                .detail-page__image img { width: 100%; height: 100%; object-fit: cover; }
                .detail-page__image-placeholder { width: 100%; height: 100%; background: #E5E7EB; }
                .detail-page__type { position: absolute; top: 16px; left: 16px; }
                .detail-page__layout { display: grid; grid-template-columns: 1fr 320px; gap: 40px; align-items: start; }
                .detail-page__title { font-size: var(--font-size-3xl); font-weight: 800; color: var(--color-text); margin-bottom: 16px; }
                .detail-page__meta { display: flex; flex-wrap: wrap; gap: 16px; margin-bottom: 24px; }
                .detail-page__location, .detail-page__rating { display: flex; align-items: center; gap: 6px; font-size: var(--font-size-sm); color: var(--color-text-muted); }
                .detail-page__address { font-size: var(--font-size-sm); color: var(--color-text-muted); }
                .detail-page__desc { font-size: var(--font-size-base); color: var(--color-text); line-height: 1.8; margin-bottom: 32px; }
                .detail-page__services h3, .detail-page__reviews-section h3 { font-size: var(--font-size-lg); font-weight: 700; margin-bottom: 16px; color: var(--color-text); }
                .detail-page__services { margin-bottom: 32px; }
                .detail-page__services-list { display: flex; flex-wrap: wrap; gap: 10px; }
                .detail-page__service { display: flex; align-items: center; gap: 6px; background: var(--color-bg-input); padding: 6px 14px; border-radius: var(--radius-full); font-size: var(--font-size-sm); color: var(--color-text); }
                .detail-page__reviews-section { display: flex; flex-direction: column; gap: 16px; }
                .detail-page__reviews-coming { font-size: var(--font-size-sm); color: var(--color-text-muted); font-style: italic; }
                .detail-page__book-card { padding: 24px; display: flex; flex-direction: column; gap: 16px; position: sticky; top: 80px; }
                .detail-page__price { display: flex; align-items: baseline; gap: 4px; color: var(--color-text); }
                .detail-page__price span { font-size: var(--font-size-3xl); font-weight: 800; }
                .detail-page__price small { font-size: var(--font-size-sm); color: var(--color-text-muted); }
                .detail-page__schedule { display: flex; flex-direction: column; gap: 8px; font-size: var(--font-size-sm); color: var(--color-text-muted); }
                .detail-page__schedule span { display: flex; align-items: center; gap: 6px; }

                .review-box { background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-lg); padding: 20px; display: flex; flex-direction: column; gap: 14px; }
                .review-box--success { background: #D1FAE5; border-color: #10B981; color: #065F46; font-weight: 600; padding: 16px 20px; }
                .review-box__label { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text); }
                .review-box__textarea { width: 100%; padding: 12px 14px; background: var(--color-bg-input); border: 1.5px solid transparent; border-radius: var(--radius); font-size: var(--font-size-sm); color: var(--color-text); resize: vertical; outline: none; font-family: inherit; transition: border-color var(--transition); }
                .review-box__textarea:focus { border-color: var(--color-primary); background: var(--color-white); }
                .review-box__hint { font-size: var(--font-size-xs); color: var(--color-text-muted); background: #FEF3C7; padding: 8px 12px; border-radius: var(--radius-sm); }
                .review-box__error { font-size: var(--font-size-sm); color: var(--color-error); }

                @media (max-width: 900px) { .detail-page__layout { grid-template-columns: 1fr; } .detail-page__image { height: 260px; } }
            `}</style>
        </div>
    );
}
