import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";

export default function HeroBanner() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    function handleSearch(e) {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/buscar?search=${encodeURIComponent(query.trim())}`);
        } else {
            navigate("/buscar");
        }
    }

    return (
        <section className="hero">
            <div className="hero__overlay" />
            <div className="hero__content">
                <h1 className="hero__title">Descubre tu nueva aventura!</h1>
                <p className="hero__subtitle">Encuentra los mejores lugares para explorar en Venezuela.</p>

                <form className="hero__search" onSubmit={handleSearch}>
                    <div className="hero__search-inner">
                        <input
                            type="text"
                            className="hero__search-input"
                            placeholder="Buscar por nombre o ubicación..."
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                        />
                        <button type="submit" className="hero__search-btn">
                            <Search size={18} />
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
                .hero {
                    position: relative;
                    height: 420px;
                    background: var(--color-primary-dark);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    overflow: hidden;
                }
                .hero::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: url('/assets/Isla_Margarita.png') center/cover no-repeat;
                    opacity: 0.25;
                }
                .hero__overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to bottom, rgba(13,59,56,0.7) 0%, rgba(13,17,23,0.85) 100%);
                }
                .hero__content {
                    position: relative;
                    z-index: 1;
                    text-align: center;
                    padding: 0 24px;
                    width: 100%;
                    max-width: 700px;
                }
                .hero__title {
                    font-size: 2.6rem;
                    font-weight: 800;
                    color: #fff;
                    margin-bottom: 12px;
                    line-height: 1.15;
                }
                .hero__subtitle {
                    font-size: 1.05rem;
                    color: rgba(255,255,255,0.75);
                    margin-bottom: 32px;
                }
                .hero__search {
                    width: 100%;
                }
                .hero__search-inner {
                    display: flex;
                    align-items: center;
                    background: var(--color-white);
                    border-radius: var(--radius-full);
                    padding: 6px 6px 6px 18px;
                    gap: 10px;
                    box-shadow: var(--shadow-lg);
                }
                .hero__search-icon {
                color: var(--color-text-muted);
                flex-shrink: 0; 
                }
                .hero__search-input {
                    flex: 1;
                    border: none;
                    outline: none;
                    font-size: var(--font-size-base);
                    color: var(--color-text);
                    background: transparent;
                    min-width: 0;
                }
                .hero__search-btn {
                    background: var(--color-primary);
                    color: var(--color-white);
                    border: none;
                    border-radius: var(--radius-full);
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    flex-shrink: 0;
                    transition: background var(--transition);
                }
                .hero__search-btn:hover { background: var(--color-primary-hover); }
                @media (max-width: 768px) {
                    .hero { height: 360px; }
                    .hero__title { font-size: 1.8rem; }
                    .hero__search-hint { display: none; }
                    .hero__search-divider { display: none; }
                }
            `}</style>
        </section>
    );
}
