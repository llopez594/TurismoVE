import { useNavigate } from "react-router-dom";
import { Waves, Mountain, Building2, Compass, Landmark, UtensilsCrossed, Moon, ShoppingBag } from "lucide-react";

const CATEGORIES = [
    {id:1,  name: "Playas",       icon: Waves,            color: "#0D7377" },
    {id:2, name: "Montañas",      icon: Mountain,         color: "#2DA44E" },
    {id:3, name: "Ciudades",      icon: Building2,        color: "#0969DA" },
    {id:4, name: "Aventura",      icon: Compass,          color: "#E3B341" },
    {id:5, name: "Cultura",       icon: Landmark,         color: "#6B46C1" },
    {id:6, name: "Gastronomía",   icon: UtensilsCrossed,  color: "#CF222E" },
    {id:7, name: "Vida nocturna", icon: Moon,             color: "#0D3B38" },
    {id:8, name: "Compras",       icon: ShoppingBag,      color: "#8B5CF6" },
];

export default function CategoryGrid() {
    const navigate = useNavigate();

    return (
        <section className="categories">
            <div className="container">
                <h2 className="categories__title">Explora por categoría</h2>
                <div className="categories__grid">
                    {CATEGORIES.map(cat => {
                        const Icon = cat.icon;
                        return (
                            <button
                                key={cat.name}
                                className="category-item"
                                onClick={() => navigate(`/buscar?categoria=${cat.id}`)}
                            >
                                <div className="category-item__icon" style={{ background: cat.color + "18", color: cat.color }}>
                                    <Icon size={24} />
                                </div>
                                <span className="category-item__name">{cat.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <style>{`
                .categories { padding: 48px 0 32px; }
                .categories__title { font-size: var(--font-size-xl); font-weight: 700; color: var(--color-text); margin-bottom: 24px; }
                .categories__grid { display: flex; gap: 12px; flex-wrap: wrap; }
                .category-item { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 16px 20px; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-lg); cursor: pointer; transition: all var(--transition); min-width: 90px; }
                .category-item:hover { border-color: var(--color-primary); box-shadow: var(--shadow-md); transform: translateY(-2px); }
                .category-item__icon { width: 52px; height: 52px; border-radius: var(--radius); display: flex; align-items: center; justify-content: center; }
                .category-item__name { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text); white-space: nowrap; }
                @media (max-width: 768px) {
                    .categories__grid { gap: 8px; }
                    .category-item { padding: 12px 14px; min-width: 76px; }
                    .category-item__icon { width: 44px; height: 44px; }
                }
            `}</style>
        </section>
    );
}
