import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api, { unwrapResponse } from "../services/api";
import PlaceFilters from "../components/search/PlaceFilters";
import PlaceListItem from "../components/search/PlaceListItem";

export default function Search() {
    const [searchParams] = useSearchParams();
    const [places, setPlaces] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [page, setPage] = useState(1);

    const [searchText, setSearchText] = useState(searchParams.get("search") || "");
    const [location, setLocation] = useState("");
    const [categoryId, setCategoryId] = useState("");

    useEffect(() => {
        setLoading(true);
        setError("");
        const params = new URLSearchParams();
        if (searchText) params.append("search", searchText);
        if (categoryId) params.append("categoryId", categoryId);
        params.append("page", page);
        params.append("limit", 10);

        api.get(`/places?${params.toString()}`)
            .then(res => {
                const data = unwrapResponse(res.data);
                setPlaces(data.data || []);
                setTotal(data.total || 0);
            })
            .catch(() => setError("Error al cargar los alojamientos."))
            .finally(() => setLoading(false));
    }, [searchText, categoryId, page]);

    return (
        <div className="search-page">
            <div className="container">
                <div className="search-page__header">
                    <div>
                        <h1 className="search-page__title">Todos los los lugares</h1>
                        <p className="search-page__subtitle">Explora los mejores lugares verificados en todo el país.</p>
                    </div>
                </div>

                <PlaceFilters
                    onSearchChange={val => { setSearchText(val); setPage(1); }}
                    onLocationChange={setLocation}
                    onCategoryChange={val => { setCategoryId(val); setPage(1); }}
                />

                {loading ? (
                    <div className="search-page__loading"><div className="spinner" /></div>
                ) : error ? (
                    <div className="search-page__error">{error}</div>
                ) : places.length === 0 ? (
                    <div className="search-page__empty">
                        <span style={{ fontSize: "2.5rem" }}>🔍</span>
                        <p>No se encontraron lugares con esos filtros.</p>
                    </div>
                ) : (
                    <>
                        <p className="search-page__count">{total} Lugar{total !== 1 ? "es" : ""} encontrado{total !== 1 ? "s" : ""}</p>
                        <div className="search-page__list">
                            {places.map(place => (
                                <PlaceListItem key={place.id} place={place} />
                            ))}
                        </div>
                        {total > 10 && (
                            <div className="search-page__pagination">
                                <button className="btn btn-outline" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>← Anterior</button>
                                <span>Página {page}</span>
                                <button className="btn btn-outline" onClick={() => setPage(p => p + 1)} disabled={page * 10 >= total}>Siguiente →</button>
                            </div>
                        )}
                    </>
                )}
            </div>

            <style>{`
                .search-page { padding: 40px 0; }
                .search-page__header { margin-bottom: 28px; }
                .search-page__title { font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-text); margin-bottom: 4px; }
                .search-page__subtitle { font-size: var(--font-size-sm); color: var(--color-text-muted); }
                .search-page__count { font-size: var(--font-size-sm); color: var(--color-text-muted); margin: 16px 0; }
                .search-page__list { display: flex; flex-direction: column; gap: 16px; }
                .search-page__loading, .search-page__empty { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 12px; padding: 80px 0; color: var(--color-text-muted); }
                .search-page__error { color: var(--color-error); text-align: center; padding: 40px; }
                .search-page__pagination { display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: 32px; }
            `}</style>
        </div>
    );
}
