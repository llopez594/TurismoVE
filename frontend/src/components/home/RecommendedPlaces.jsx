import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api, { unwrapResponse } from "../../services/api";
import PlaceCard from "../ui/PlaceCard";

export default function RecommendedPlaces() {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        api.get("/places?limit=3")
            .then(res => {
                const data = unwrapResponse(res.data);
                setPlaces(data.data || []);
            })
            .catch(() => setPlaces([]))
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className="rec-places">
            <div className="container">
                <div className="rec-places__header">
                    <h2 className="rec-places__title">Lugares recomendados</h2>
                    <button className="rec-places__ver-todos" onClick={() => navigate("/buscar")}>
                        Ver todos →
                    </button>
                </div>

                {loading ? (
                    <div className="rec-places__loading">
                        <div className="spinner" />
                    </div>
                ) : places.length === 0 ? (
                    <p className="rec-places__empty">No hay lugares disponibles por ahora.</p>
                ) : (
                    <div className="rec-places__grid">
                        {places.map(place => (
                            <PlaceCard key={place.id} place={place} />
                        ))}
                    </div>
                )}
            </div>

            <style>{`
                .rec-places { padding: 40px 0; }
                .rec-places__header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
                .rec-places__title { font-size: var(--font-size-xl); font-weight: 700; color: var(--color-text); }
                .rec-places__ver-todos { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-primary); background: none; border: none; cursor: pointer; }
                .rec-places__ver-todos:hover { text-decoration: underline; }
                .rec-places__grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
                .rec-places__loading { display: flex; justify-content: center; padding: 48px; }
                .rec-places__empty { color: var(--color-text-muted); font-size: var(--font-size-sm); }
                @media (max-width: 900px) { .rec-places__grid { grid-template-columns: repeat(2, 1fr); } }
                @media (max-width: 600px) { .rec-places__grid { grid-template-columns: 1fr; } }
            `}</style>
        </section>
    );
}
