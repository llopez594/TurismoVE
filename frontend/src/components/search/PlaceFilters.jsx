import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import api, { unwrapResponse } from "../../services/api";

export default function PlaceFilters({ searchValue = "", categoryValue = "", onSearchChange, onCategoryChange }) {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        api.get("/categories")
            .then(res => {
                const data = unwrapResponse(res.data);
                setCategories(data.data || []);
            })
            .catch(() => {});
    }, []);

    function handleSearch(e) {
        const val = e.target.value;
        onSearchChange(val);
    }

    function handleCategory(e) {
        const val = e.target.value;
        onCategoryChange(val);
    }

    return (
        <div className="place-filters">
            <div className="place-filters__input-wrap">
                <Search size={16} className="place-filters__icon" />
                <input
                    type="text"
                    className="place-filters__input"
                    placeholder="Buscar por nombre o ubicación..."
                    value={searchValue}
                    onChange={handleSearch}
                />
            </div>

            <select
                className="place-filters__select"
                value={categoryValue}
                onChange={handleCategory}
            >
                <option value="">Todas las Categorías</option>
                {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
            </select>

            <style>{`
                .place-filters { 
                    display: flex;
                    gap: 12px;
                    flex-wrap: wrap;
                    margin-bottom: 24px;
                }

                .place-filters__input-wrap {
                    position: relative;
                    flex: 1;
                    min-width: 180px;
                }

                .place-filters__icon {
                    position: absolute;
                    left: 12px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: var(--color-text-muted);
                    pointer-events: none;
                }

                .place-filters__input {
                    width: 100%;
                    padding: 10px 14px 10px 36px;
                    background: var(--color-white);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius);
                    font-size: var(--font-size-sm);
                    color: var(--color-text);
                    outline: none;
                    transition: border-color var(--transition);
                }

                .place-filters__input:focus {
                    border-color: var(--color-primary);
                }

                .place-filters__select {
                    padding: 10px 14px;
                    background: var(--color-white);
                    border: 1px solid var(--color-border);
                    border-radius: var(--radius);
                    font-size: var(--font-size-sm);
                    color: var(--color-text);
                    outline: none;
                    cursor: pointer;
                    min-width: 180px;
                }

                .place-filters__select:focus {
                    border-color: var(--color-primary);
                }
            `}</style>
        </div>
    );
}

