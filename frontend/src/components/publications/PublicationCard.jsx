import { useNavigate } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";

export default function PublicationCard({ publication, onEdit }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const isExperience = publication.type === "actividad";
    const status = publication.status || "pending";

    const statusMap = {
        approved: { label: "APROBADO", className: "badge-approved" },
        pending: { label: "PENDIENTE", className: "badge-pending" },
        rejected: { label: "RECHAZADO", className: "badge-rejected" },
    };
    const { label, className } = statusMap[status] || statusMap.pending;

    return (
        <div className="pub-card">
            <div className="pub-card__image">
                {publication.coverImage ? (
                    <img src={publication.coverImage} alt={publication.title} />
                ) : (
                    <div className="pub-card__placeholder" />
                )}
            </div>

            <div className="pub-card__body">
                <div className="pub-card__badges">
                    <span className={`badge ${className}`}>● {label}</span>
                    <span className={`badge ${isExperience ? "badge-exp" : "badge-place"}`}>
                        {isExperience ? "EXPERIENCIA" : "LUGAR"}
                    </span>
                </div>
                <h4 className="pub-card__title">{publication.title}</h4>
                {publication.cost && (
                    <p className="pub-card__price">
                        ${Number(publication.cost).toFixed(0)} USD
                        <span> / {isExperience ? "persona" : "noche"}</span>
                    </p>
                )}
            </div>

            <div className="pub-card__actions">
                <button className="pub-card__menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
                    <MoreHorizontal size={18} />
                </button>
                {menuOpen && (
                    <div className="pub-card__menu">
                        <button onClick={() => { onEdit(publication); setMenuOpen(false); }}>
                            Editar
                        </button>
                    </div>
                )}
            </div>

            <style>{`
                .pub-card { display: flex; align-items: center; gap: 16px; background: var(--color-white); border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 14px 16px; position: relative; }
                .pub-card__image { width: 64px; height: 64px; border-radius: var(--radius); overflow: hidden; flex-shrink: 0; }
                .pub-card__image img { width: 100%; height: 100%; object-fit: cover; }
                .pub-card__placeholder { width: 100%; height: 100%; background: #E5E7EB; }
                .pub-card__body { flex: 1; min-width: 0; }
                .pub-card__badges { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 6px; }
                .pub-card__title { font-size: var(--font-size-base); font-weight: 700; color: var(--color-text); margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .pub-card__price { font-size: var(--font-size-sm); color: var(--color-text-muted); }
                .pub-card__price span { font-size: var(--font-size-xs); }
                .pub-card__actions { position: relative; flex-shrink: 0; }
                .pub-card__menu-btn { background: none; border: none; color: var(--color-text-muted); cursor: pointer; padding: 4px; border-radius: var(--radius-sm); }
                .pub-card__menu-btn:hover { background: var(--color-bg-input); }
                .pub-card__menu { position: absolute; right: 0; top: 100%; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius); box-shadow: var(--shadow-md); min-width: 120px; z-index: 10; }
                .pub-card__menu button { width: 100%; text-align: left; padding: 10px 16px; font-size: var(--font-size-sm); color: var(--color-text); background: none; border: none; cursor: pointer; }
                .pub-card__menu button:hover { background: var(--color-bg-input); }
            `}</style>
        </div>
    );
}
