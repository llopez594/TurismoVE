import { useNavigate } from "react-router-dom";
import { MapPin, Star, Wifi, Zap, Droplets } from "lucide-react";

const DEFAULT_IMAGES = {
    lugar: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop"
};

const SERVICE_ICONS = {
    "Wi-Fi Starlink": Wifi,
    "Wi-Fi": Wifi,
    "Luz Eléctrica 24/7": Zap,
    "Luz 24/7": Zap,
    "Agua Constante": Droplets,
};

export default function PlaceListItem({ place }) {
    const navigate = useNavigate();
    const image = place.coverImage || place.cover_image || DEFAULT_IMAGES[place.type] || DEFAULT_IMAGES.lugar;
    const fallback = DEFAULT_IMAGES[place.type] || DEFAULT_IMAGES.lugar;
    const rating = parseFloat(place.ratingAverage || place.rating_average || 0);
    
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

    const category = place.category?.name || "";

    return (
        <div className="list-item" onClick={() => navigate(`/lugares/${place.id}`)}>
            <div className="list-item__image">
                {image ? (
                    <img src={image} alt={place.title} onError={e => { e.currentTarget.onerror = null; e.currentTarget.src = fallback; }} />
                ) : (
                    <div className="list-item__placeholder" />
                )}
                {rating > 0 && (
                    <div className="list-item__rating">
                        <Star size={11} fill="#F5A623" color="#F5A623" />
                        {rating.toFixed(1)}
                    </div>
                )}
            </div>

            <div className="list-item__body">
                <h3 className="list-item__title">{place.title}</h3>
                <p className="list-item__location"><MapPin size={13} /> {place.location}</p>
                {category && (
                    <span className="badge badge-place">
                        {category.toUpperCase()}
                    </span>
                )}
                {services.length > 0 && (
                    <div className="list-item__services">
                        {services.slice(0, 3).map((s, i) => {
                            const Icon = SERVICE_ICONS[s] || null;
                            return (
                                <span key={i} className="list-item__service">
                                    {Icon && <Icon size={12} />} {s}
                                </span>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="list-item__right">
                <button className="btn btn-primary" style={{ padding: "8px 18px" }}>
                    Ver Detalles
                </button>
            </div>

            <style>{`
                .list-item { display: flex; gap: 20px; background: var(--color-white); border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 16px; cursor: pointer; transition: all var(--transition); align-items: center; }
                .list-item:hover { box-shadow: var(--shadow-md); transform: translateY(-1px); }
                .list-item__image { position: relative; width: 160px; height: 120px; border-radius: var(--radius); overflow: hidden; flex-shrink: 0; }
                .list-item__image img { width: 100%; height: 100%; object-fit: cover; }
                .list-item__placeholder { width: 100%; height: 100%; background: #E5E7EB; }
                .list-item__rating { position: absolute; top: 8px; left: 8px; background: rgba(0,0,0,0.65); color: #fff; padding: 2px 7px; border-radius: var(--radius-full); font-size: .75rem; font-weight: 700; display: flex; align-items: center; gap: 3px; }
                .list-item__body { flex: 1; display: flex; flex-direction: column; gap: 8px; min-width: 0; }
                .list-item__title { font-size: var(--font-size-lg); font-weight: 700; color: var(--color-text); }
                .list-item__location { display: flex; align-items: center; gap: 4px; font-size: var(--font-size-sm); color: var(--color-text-muted); }
                .list-item__services { display: flex; gap: 8px; flex-wrap: wrap; }
                .list-item__service { display: flex; align-items: center; gap: 4px; font-size: .75rem; color: var(--color-text-muted); background: var(--color-bg-input); padding: 2px 8px; border-radius: var(--radius-full); }
                .list-item__right { display: flex; flex-direction: column; align-items: flex-end; gap: 12px; flex-shrink: 0; }
                @media (max-width: 600px) { .list-item { flex-wrap: wrap; } .list-item__image { width: 100%; height: 180px; } .list-item__right { width: 100%; flex-direction: row; justify-content: space-between; align-items: center; } }
            `}</style>
        </div>
    );
}
