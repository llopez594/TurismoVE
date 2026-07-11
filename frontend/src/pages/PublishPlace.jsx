import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PublishPlaceForm from "../components/publish/PublishPlaceForm";

export default function PublishPlace() {
    const { user, isAuthenticated, isAdmin, isContentCreator, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const canPublish = isAdmin || isContentCreator;

    useEffect(() => {
        if (authLoading) return;
        if (!isAuthenticated || !canPublish) navigate("/");
    }, [isAuthenticated, canPublish, authLoading, navigate]);

    if (authLoading) {
        return <div style={{ display: "flex", justifyContent: "center", padding: "80px" }}><div className="spinner" /></div>;
    }

    if (!canPublish) return null;

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
                        <Link to="/perfil" className="user-sidebar__link">Configuración de Perfil</Link>
                        <Link to="/mis-publicaciones" className="user-sidebar__link">Mis Publicaciones</Link>
                        <Link to="/publicar" className="user-sidebar__link user-sidebar__link--active">Publicar Lugar</Link>
                    </nav>
                </aside>

                <main className="publish-page__main">
                    <div className="publish-page__header">
                        <h1>Publicar Sitio</h1>
                        <p>Comparte un lugar turístico para que sea revisado por un administrador.</p>
                    </div>
                    <div className="card" style={{ padding: "32px" }}>
                        <PublishPlaceForm />
                    </div>
                </main>
            </div>

            <style>{`
                .user-sidebar { background: var(--color-white); border-radius: var(--radius-xl); box-shadow: var(--shadow); padding: 28px 24px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; }
                .user-sidebar__name { font-size: var(--font-size-lg); font-weight: 700; color: var(--color-text); }
                .user-sidebar__email { font-size: var(--font-size-sm); color: var(--color-text-muted); margin-bottom: 8px; }
                .user-sidebar__nav { width: 100%; display: flex; flex-direction: column; gap: 4px; }
                .user-sidebar__link { display: block; padding: 10px 14px; border-radius: var(--radius); font-size: var(--font-size-sm); font-weight: 500; color: var(--color-text-muted); transition: all var(--transition); text-align: left; }
                .user-sidebar__link:hover { background: var(--color-bg-input); color: var(--color-primary); }
                .user-sidebar__link--active { background: #E8F5F5; color: var(--color-primary); font-weight: 700; }
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
