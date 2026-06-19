import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PlaceTabs from "../components/publish/PlaceTabs";

export default function PublishPlace() {
    const { user, isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authLoading) return;
        if (!isAuthenticated) navigate("/");
    }, [isAuthenticated, authLoading, navigate]);

    if (authLoading) {
        return <div style={{ display: "flex", justifyContent: "center", padding: "80px" }}><div className="spinner" /></div>;
    }

    return (
        <div className="publish-page">
            <div className="container publish-page__inner">
                <aside className="user-sidebar">
                    <div className="user-sidebar__avatar-wrap">
                        <img src={`/assets/${user?.avatar || "avatar1.png"}`} alt={user?.name} width={64} height={64} style={{ borderRadius: "50%", objectFit: "cover" }} />
                    </div>
                    <h3 className="user-sidebar__name">{user?.name}</h3>
                    <p className="user-sidebar__email">{user?.email}</p>
                    <nav className="user-sidebar__nav">
                        <Link to="/perfil" className="user-sidebar__link">Configuración de Perfil →</Link>
                        <Link to="/mis-publicaciones" className="user-sidebar__link">Mis Publicaciones →</Link>
                        <Link to="/publicar" className="user-sidebar__link user-sidebar__link--active">Publicar Sitio / Experiencia →</Link>
                    </nav>
                </aside>

                <main className="publish-page__main">
                    <div className="publish-page__header">
                        <h1>Publicar Sitio / Experiencia</h1>
                        <p>Comparte tu lugar turístico, posada, cabaña o experiencia con miles de viajeros en TurismoVE.</p>
                    </div>
                    <div className="card" style={{ padding: "32px" }}>
                        <PlaceTabs />
                    </div>
                </main>
            </div>

            <style>{`
                .publish-page { padding: 40px 0 64px; }
                .publish-page__inner { display: grid; grid-template-columns: 260px 1fr; gap: 40px; align-items: start; }
                .publish-page__header { margin-bottom: 24px; }
                .publish-page__header h1 { font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-text); margin-bottom: 6px; }
                .publish-page__header p { font-size: var(--font-size-sm); color: var(--color-text-muted); }
                @media (max-width: 768px) { .publish-page__inner { grid-template-columns: 1fr; } }
            `}</style>
        </div>
    );
}
