import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api, { unwrapResponse } from "../services/api";
import PublicationCard from "../components/publications/PublicationCard";
import EditPlaceModal from "../components/publications/EditPlaceModal";

export default function MyPublications() {
    const { user, isAuthenticated, isAdmin, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editTarget, setEditTarget] = useState(null);

    async function loadPublications() {
        setLoading(true);
        try {
            const res = await api.get("/places/user/me");
            const data = unwrapResponse(res.data);
            setPublications(data.data || data || []);
        } catch {
            setPublications([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (authLoading) return;
        if (!isAuthenticated) { navigate("/"); return; }
        loadPublications();
    }, [isAuthenticated, user, authLoading, navigate]);

    if (authLoading) {
        return <div style={{ display: "flex", justifyContent: "center", padding: "80px" }}><div className="spinner" /></div>;
    }

    return (
        <div className="my-pubs-page">
            <div className="container my-pubs-page__inner">
                <aside className="user-sidebar">
                    <div className="user-sidebar__avatar">
                        <img src={`/assets/${user?.avatar || "avatar1.png"}`} alt={user?.name} width={64} height={64} style={{ borderRadius: "50%" }} />
                    </div>
                    <h3 className="user-sidebar__name">{user?.name}</h3>
                    <p className="user-sidebar__email">{user?.email}</p>
                    <nav className="user-sidebar__nav">
                        {isAuthenticated && (
                            isAdmin ? (
                                <>
                                    <Link to="/perfil" className="user-sidebar__link">Configuración de Perfil</Link>
                                    <Link to="/mis-publicaciones" className="user-sidebar__link user-sidebar__link--active">Publicaciones</Link>
                                   </>
                            ) : (
                                <>
                                    <Link to="/perfil" className="user-sidebar__link">Configuración de Perfil</Link>
                                    <Link to="/mis-publicaciones" className="user-sidebar__link user-sidebar__link--active">Mis Publicaciones</Link>
                                    <Link to="/publicar" className="user-sidebar__link">Publicar Lugar / Experiencia</Link>
                                </>
                            )
                        )}

                    </nav>
                </aside>

                <main className="my-pubs-page__main">
                    <div className="my-pubs-page__header">
                    {isAuthenticated && (
                        isAdmin? (
                            <>
                                <h1>Publicaciones</h1>
                                <p className="my-pubs-page__subtitle">
                                    A continuación se muestran los lugares y experiencias <strong>aprobados.</strong>
                                </p>
                            </>
                        ) : (
                            <>
                                <h1>Mis Publicaciones</h1>
                                <p className="my-pubs-page__subtitle">
                                    A continuación se muestran los lugares y experiencias que has publicado.
                                    Los lugares nuevos inician en estado <strong>Pendiente de Aprobación</strong>.
                                </p>
                            </>
                        )
                    )}

                    </div>

                    {loading ? (
                        <div style={{ display: "flex", justifyContent: "center", padding: "48px" }}>
                            <div className="spinner" />
                        </div>
                    ) : publications.length === 0 ? (
                        <div className="my-pubs-page__empty">
                            <p>Aún no has publicado ningún lugar.</p>
                            <Link to="/publicar" className="btn btn-primary">Publicar mi primer lugar</Link>
                        </div>
                    ) : (
                        <div className="my-pubs-page__list">
                            {publications.map(pub => (
                                <PublicationCard key={pub.id} publication={pub} onEdit={setEditTarget} />
                            ))}
                        </div>
                    )}
                </main>
            </div>

            {editTarget && (
                <EditPlaceModal
                    isOpen={!!editTarget}
                    onClose={() => setEditTarget(null)}
                    publication={editTarget}
                    onSaveSuccess={loadPublications}
                />
            )}

            <style>{`
                .my-pubs-page { padding: 40px 0 64px; }
                .my-pubs-page__inner { display: grid; grid-template-columns: 260px 1fr; gap: 40px; align-items: start; }
                .my-pubs-page__main { min-width: 0; }
                .my-pubs-page__header { margin-bottom: 24px; }
                .my-pubs-page__header h1 { font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-text); margin-bottom: 8px; }
                .my-pubs-page__subtitle { font-size: var(--font-size-sm); color: var(--color-text-muted); line-height: 1.6; }
                .my-pubs-page__list { display: flex; flex-direction: column; gap: 12px; }
                .my-pubs-page__empty { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 64px 24px; color: var(--color-text-muted); }
                @media (max-width: 768px) { .my-pubs-page__inner { grid-template-columns: 1fr; } }
            `}</style>
        </div>
    );
}
