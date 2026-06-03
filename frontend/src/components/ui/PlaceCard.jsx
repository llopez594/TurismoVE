import { useNavigate } from "react-router-dom";
import { MapPin, Star } from "lucide-react";

export default function PlaceCard({ place }) {
    const navigate = useNavigate();

    const image = place.coverImage || place.cover_image || null;
    const category = place.category?.name || "";
    const rating = parseFloat(place.ratingAverage || place.rating_average || 0);
    const cost = place.cost ? `$${Number(place.cost).toFixed(0)}` : null;
    const isExperience = place.type === "actividad";

    return (
        <div className="place-card" onClick={() => navigate(`/lugares/${place.id}`)}>
            <div className="place-card__image">
                {image ? (
                    <img src={image} alt={place.title} />
                ) : (
                    <div className="place-card__placeholder" />
                )}
                {rating > 0 && (
                    <div className="place-card__rating">
                        <Star size={12} fill="#F5A623" color="#F5A623" />
                        <span>{rating.toFixed(1)}</span>
                    </div>
                )}
                {category && (
                    <span className={`place-card__badge ${isExperience ? "badge-exp" : "badge-place"}`}>
                        {isExperience ? "EXPERIENCIA" : "ALOJAMIENTO"}
                    </span>
                )}
            </div>

            <div className="place-card__body">
                <p className="place-card__location">
                    <MapPin size={12} /> {place.location}
                </p>
                <h3 className="place-card__title">{place.title}</h3>
                {cost && (
                    <p className="place-card__price">
                        {cost} <span>/{isExperience ? "persona" : "noche"}</span>
                    </p>
                )}
                <button className="btn btn-primary place-card__btn">Explorar</button>
            </div>

            <style>{`
                .place-card { background: var(--color-white); border-radius: var(--radius-lg); overflow: hidden; box-shadow: var(--shadow); cursor: pointer; transition: all var(--transition-slow); }
                .place-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-lg); }
                .place-card__image { position: relative; height: 200px; overflow: hidden; }
                .place-card__image img { width: 100%; height: 100%; object-fit: cover; transition: transform var(--transition-slow); }
                .place-card:hover .place-card__image img { transform: scale(1.05); }
                .place-card__placeholder { width: 100%; height: 100%; background: #E5E7EB; }
                .place-card__rating { position: absolute; top: 10px; left: 10px; background: rgba(0,0,0,0.65); color: #fff; padding: 3px 8px; border-radius: var(--radius-full); display: flex; align-items: center; gap: 4px; font-size: .78rem; font-weight: 700; }
                .place-card__badge { position: absolute; bottom: 10px; left: 10px; font-size: .68rem; font-weight: 800; letter-spacing: .05em; padding: 3px 9px; border-radius: var(--radius-full); }
                .place-card__body { padding: 14px 16px 16px; }
                .place-card__location { display: flex; align-items: center; gap: 4px; font-size: .75rem; color: var(--color-primary); font-weight: 600; margin-bottom: 4px; text-transform: uppercase; letter-spacing: .04em; }
                .place-card__title { font-size: var(--font-size-base); font-weight: 700; color: var(--color-text); margin-bottom: 8px; line-height: 1.3; }
                .place-card__price { font-size: var(--font-size-lg); font-weight: 800; color: var(--color-text); margin-bottom: 12px; }
                .place-card__price span { font-size: var(--font-size-sm); font-weight: 400; color: var(--color-text-muted); }
                .place-card__btn { width: 100%; justify-content: center; }
            `}</style>
        </div>
    );
}
