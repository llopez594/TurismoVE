import { MapPin, User, Calendar } from "lucide-react";
import AdminActions from "./AdminActions";

export default function PendingPlaceCard({ place, onApprove, onReject }) {
    const date = place.createdAt ? new Date(place.createdAt).toLocaleDateString("es-VE") : "";
    const authorName = place.createdByLabel || place.author?.name || place.createdBy || "Usuario";

    return (
        <div className="pending-card">
            <div className="pending-card__image">
                {place.coverImage ? (
                    <img src={place.coverImage} alt={place.title} />
                ) : (
                    <div className="pending-card__placeholder" />
                )}
                <span className="badge badge-place pending-card__type">
                    LUGAR
                </span>
            </div>

            <div className="pending-card__body">
                <div className="pending-card__top">
                    <span className="badge badge-pending">● PENDIENTE</span>
                </div>
                <h3 className="pending-card__title">{place.title}</h3>
                <div className="pending-card__meta">
                    <span><MapPin size={13} /> {place.location}</span>
                    <span><User size={13} /> {authorName}</span>
                    {date && <span><Calendar size={13} /> {date}</span>}
                </div>
                {place.description && (
                    <p className="pending-card__desc">{place.description}</p>
                )}
            </div>

            <div className="pending-card__actions">
                <AdminActions
                    placeId={place.id}
                    onApprove={onApprove}
                    onReject={onReject}
                />
            </div>

            <style>{`
                .pending-card { display: flex; gap: 20px; background: var(--color-white); border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 20px; align-items: flex-start; }
                .pending-card__image { position: relative; width: 140px; height: 110px; border-radius: var(--radius); overflow: hidden; flex-shrink: 0; }
                .pending-card__image img { width: 100%; height: 100%; object-fit: cover; }
                .pending-card__placeholder { width: 100%; height: 100%; background: #E5E7EB; }
                .pending-card__type { position: absolute; bottom: 6px; left: 6px; font-size: .65rem; }
                .pending-card__body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: 8px; }
                .pending-card__top { display: flex; gap: 8px; }
                .pending-card__title { font-size: var(--font-size-lg); font-weight: 700; color: var(--color-text); }
                .pending-card__meta { display: flex; flex-wrap: wrap; gap: 12px; font-size: var(--font-size-sm); color: var(--color-text-muted); }
                .pending-card__meta span { display: flex; align-items: center; gap: 4px; }
                .pending-card__desc { font-size: var(--font-size-sm); color: var(--color-text-muted); line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
                .pending-card__actions { flex-shrink: 0; display: flex; flex-direction: column; gap: 8px; }
                @media (max-width: 600px) { .pending-card { flex-wrap: wrap; } .pending-card__image { width: 100%; height: 160px; } }
            `}</style>
        </div>
    );
}
