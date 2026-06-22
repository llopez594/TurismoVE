import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { MapPin, Star, Clock, DollarSign, Wifi, Zap, Droplets, ArrowLeft, MessageSquare } from "lucide-react";
import api, { unwrapResponse } from "../services/api";
import { useAuth } from "../context/AuthContext";

const SERVICE_ICONS = { "Wi-Fi Starlink": Wifi, "Wi-Fi": Wifi, "Luz Eléctrica 24/7": Zap, "Luz 24/7": Zap, "Agua Constante": Droplets };

export default function PlaceDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const [place, setPlace] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [reviewOpen, setReviewOpen] = useState(false);

    useEffect(() => {
        api.get(`/places/${id}`)
            .then(res => {
                const data = unwrapResponse(res.data);
                setPlace(data.data || data);
            })
            .catch(() => setError("Lugar no encontrado."))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <div style={{ display: "flex", justifyContent: "center", padding: "80px" }}><div className="spinner" /></div>;
    if (error || !place) return <div style={{ textAlign: "center", padding: "80px", color: "var(--color-text-muted)" }}>{error || "Lugar no encontrado."}</div>;

    const rating = parseFloat(place.ratingAverage || 0);
    
    let services = [];
    if (place.services) {
        if (Array.isArray(place.services)) {
            services = place.services;
        } else if (typeof place.services === "string") {
            try {
                services = JSON.parse(place.services);
            } catch (e) {
                services = [];
            }
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
                    {place.coverImage ? (
                        <img src={place.coverImage} alt={place.title} />
                    ) : (
                        <div className="detail-page__image-placeholder" />
                    )}
                    <span className={`badge ${isExperience ? "badge-exp" : "badge-place"} detail-page__type`}>
                        {isExperience ? "EXPERIENCIA" : "ALOJAMIENTO"}
                    </span>
                </div>

                <div className="detail-page__layout">
                    <div className="detail-page__main">
                        <h1 className="detail-page__title">{place.title}</h1>

                        <div className="detail-page__meta">
                            <span className="detail-page__location"><MapPin size={15} /> {place.location}</span>
                            {place.address && <span className="detail-page__address">{place.address}</span>}
                            {rating > 0 && (
                                <span className="detail-page__rating">
                                    <Star size={15} fill="#F5A623" color="#F5A623" /> {rating.toFixed(1)} de 5
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

                        <div className="detail-page__reviews-section">
                            <h3>Reseñas</h3>
                            {isAuthenticated ? (
                                <button className="btn btn-outline" onClick={() => setReviewOpen(true)}>
                                    <MessageSquare size={16} /> Escribir una reseña
                                </button>
                            ) : (
                                <p style={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-sm)" }}>
                                    Inicia sesión para dejar una reseña.
                                </p>
                            )}
                            <p className="detail-page__reviews-coming">Las reseñas estarán disponibles próximamente.</p>
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
                                    {place.checkIn && <span><Clock size={14} /> Check-in: {place.checkIn}</span>}
                                    {place.checkOut && <span><Clock size={14} /> Check-out: {place.checkOut}</span>}
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
                @media (max-width: 900px) { .detail-page__layout { grid-template-columns: 1fr; } .detail-page__image { height: 260px; } }
            `}</style>
        </div>
    );
}
