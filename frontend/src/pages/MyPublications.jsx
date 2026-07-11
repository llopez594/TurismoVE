import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api, { unwrapResponse } from "../services/api";
import PublicationCard from "../components/publications/PublicationCard";
import EditPlaceModal from "../components/publications/EditPlaceModal";

export default function MyPublications() {
    const { user, isAuthenticated, isAdmin, isContentCreator, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [publications, setPublications] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editTarget, setEditTarget] = useState(null);
    const [filters, setFilters] = useState({ search: "", userId: "", status: "" });
    const canViewPublications = isAdmin || isContentCreator;

    async function loadPublications() {
        setLoading(true);
        try {
            if (isAdmin) {
                const params = new URLSearchParams();
                if (filters.search) params.append("search", filters.search);
                if (filters.userId) params.append("userId", filters.userId);
                if (filters.status) params.append("status", filters.status);
                const res = await api.get(`/admin/places?${params.toString()}`);
                const data = unwrapResponse(res.data);
                setPublications(data.data || data || []);
            } else {
                const res = await api.get("/places/user/me");
                const data = unwrapResponse(res.data);
                setPublications(data.data || data || []);
            }
        } catch {
            setPublications([]);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (authLoading) return;
        if (!isAuthenticated || !canViewPublications) { navigate("/"); return; }
        loadPublications();
    }, [isAuthenticated, canViewPublications, isAdmin, isContentCreator, authLoading, navigate, filters]);

    useEffect(() => {
        if (!isAdmin) return;
        api.get("/admin/users")
            .then(res => {
                const data = unwrapResponse(res.data);
                setUsers(data.data || []);
            })
            .catch(() => setUsers([]));
    }, [isAdmin]);

    if (authLoading) {
        return <div style={{ display: "flex", justifyContent: "center", padding: "80px" }}><div className="spinner" /></div>;
    }

    if (!canViewPublications) return null;

    function handleFilterChange(e) {
        setFilters(prev => ({ ...prev, [e.target.name]: e.target.value }));
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
                        <Link to="/perfil" className="user-sidebar__link">Configuración de Perfil</Link>
                        <Link to="/mis-publicaciones" className="user-sidebar__link user-sidebar__link--active">
                            {isAdmin ? "Publicaciones" : "Mis Publicaciones"}
                        </Link>
                        {isAdmin && <Link to="/admin" className="user-sidebar__link">Usuarios</Link>}
                        {isContentCreator && <Link to="/publicar" className="user-sidebar__link">Publicar Lugar</Link>}
                    </nav>
                </aside>

                <main className="my-pubs-page__main">
                    <div className="my-pubs-page__header">
                        <h1>{isAdmin ? "Publicaciones" : "Mis Publicaciones"}</h1>
                        <p className="my-pubs-page__subtitle">
                            {isAdmin
                                ? "Gestiona lugares aprobados, pendientes y rechazados."
                                : "Revisa tus publicaciones pendientes de aprobación y las que ya fueron aprobadas."}
                        </p>
                    </div>

                    {isAdmin && (
                        <div className="my-pubs-page__filters">
                            <input
                                className="input"
                                name="search"
                                placeholder="Buscar por título, ubicación o dirección..."
                                value={filters.search}
                                onChange={handleFilterChange}
                            />
                            <select className="input" name="userId" value={filters.userId} onChange={handleFilterChange}>
                                <option value="">Todos los creadores</option>
                                {users.map(item => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            <select className="input" name="status" value={filters.status} onChange={handleFilterChange}>
                                <option value="">Todos los estados</option>
                                <option value="pending">Pendiente</option>
                                <option value="approved">Aprobado</option>
                                <option value="rejected">Rechazado</option>
                            </select>
                        </div>
                    )}

                    {loading ? (
                        <div style={{ display: "flex", justifyContent: "center", padding: "48px" }}>
                            <div className="spinner" />
                        </div>
                    ) : publications.length === 0 ? (
                        <div className="my-pubs-page__empty">
                            <p>No hay publicaciones para mostrar.</p>
                            {isContentCreator && <Link to="/publicar" className="btn btn-primary">Publicar mi primer lugar</Link>}
                        </div>
                    ) : (
                        <div className="my-pubs-page__list">
                            {publications.map(pub => (
                                <PublicationCard key={pub.id} publication={pub} onEdit={setEditTarget} showAuthor={isAdmin} />
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
                .my-pubs-page__filters { display: grid; grid-template-columns: 1fr 220px 180px; gap: 12px; margin-bottom: 18px; }
                .my-pubs-page__list { display: flex; flex-direction: column; gap: 12px; }
                .my-pubs-page__empty { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 64px 24px; color: var(--color-text-muted); }
                .user-sidebar { background: var(--color-white); border-radius: var(--radius-xl); box-shadow: var(--shadow); padding: 28px 24px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; }
                .user-sidebar__name { font-size: var(--font-size-lg); font-weight: 700; color: var(--color-text); }
                .user-sidebar__email { font-size: var(--font-size-sm); color: var(--color-text-muted); margin-bottom: 8px; }
                .user-sidebar__nav { width: 100%; display: flex; flex-direction: column; gap: 4px; }
                .user-sidebar__link { display: block; padding: 10px 14px; border-radius: var(--radius); font-size: var(--font-size-sm); font-weight: 500; color: var(--color-text-muted); transition: all var(--transition); text-align: left; }
                .user-sidebar__link:hover { background: var(--color-bg-input); color: var(--color-primary); }
                .user-sidebar__link--active { background: #E8F5F5; color: var(--color-primary); font-weight: 700; }
                @media (max-width: 900px) { .my-pubs-page__filters { grid-template-columns: 1fr; } }
                @media (max-width: 768px) { .my-pubs-page__inner { grid-template-columns: 1fr; } }
            `}</style>
        </div>
    );
}
