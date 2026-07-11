import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api, { unwrapResponse } from "../services/api";
import PendingPlaceCard from "../components/admin/PendingPlaceCard";

const ROLE_LABELS = {
    user: "Usuario",
    content_creator: "Creador de contenido",
    admin: "Administrador"
};

export default function AdminDashboard() {
    const { isAuthenticated, isAdmin, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [pending, setPending] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState("");
    const [userSearch, setUserSearch] = useState("");

    useEffect(() => {
        if (authLoading) return;
        if (!isAuthenticated || !isAdmin) { navigate("/"); return; }
        loadDashboard();
    }, [isAuthenticated, isAdmin, authLoading, navigate]);

    if (authLoading) {
        return <div style={{ display: "flex", justifyContent: "center", padding: "80px" }}><div className="spinner" /></div>;
    }

    async function loadDashboard() {
        setLoading(true);
        try {
            const [pendingRes, usersRes] = await Promise.all([
                api.get("/admin/places/pending"),
                api.get("/admin/users")
            ]);
            const pendingData = unwrapResponse(pendingRes.data);
            const usersData = unwrapResponse(usersRes.data);
            setPending(pendingData.data || []);
            setUsers(usersData.data || []);
        } catch {
            setPending([]);
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }

    function showToast(msg) {
        setToast(msg);
        setTimeout(() => setToast(""), 3000);
    }

    async function handleApprove(id) {
        try {
            await api.patch(`/admin/places/${id}/approve`);
            showToast("Lugar aprobado correctamente.");
            setPending(prev => prev.filter(p => p.id !== id));
        } catch {
            showToast("Error al aprobar el lugar.");
        }
    }

    async function handleReject(id) {
        try {
            await api.patch(`/admin/places/${id}/reject`);
            showToast("Lugar rechazado.");
            setPending(prev => prev.filter(p => p.id !== id));
        } catch {
            showToast("Error al rechazar el lugar.");
        }
    }

    async function handleRoleChange(userId, role) {
        try {
            const res = await api.patch(`/admin/users/${userId}/role`, { role });
            const data = unwrapResponse(res.data);
            setUsers(prev => prev.map(item => item.id === userId ? { ...item, role: data.data?.role || role } : item));
            showToast("Rol actualizado correctamente.");
        } catch (err) {
            showToast(err.response?.data?.message || "Error al actualizar el rol.");
        }
    }

    const filteredUsers = users.filter(item => {
        const text = `${item.name} ${item.email}`.toLowerCase();
        return text.includes(userSearch.trim().toLowerCase());
    });

    return (
        <div className="admin-page">
            <div className="container">
                <div className="admin-page__header">
                    <h1>Panel de Administración</h1>
                    <p>Gestiona usuarios y lugares turísticos pendientes de aprobación.</p>
                </div>

                {loading ? (
                    <div className="admin-page__loading"><div className="spinner" /></div>
                ) : (
                    <div className="admin-page__stack">
                        {pending.length > 0 && (
                            <section className="admin-section">
                                <div className="admin-section__header">
                                    <h2>Pendientes</h2>
                                    <span>{pending.length} por revisar</span>
                                </div>
                                <div className="admin-page__list">
                                    {pending.map(place => (
                                        <PendingPlaceCard
                                            key={place.id}
                                            place={place}
                                            onApprove={handleApprove}
                                            onReject={handleReject}
                                        />
                                    ))}
                                </div>
                            </section>
                        )}

                        <section className="admin-section">
                            <div className="admin-section__header">
                                <h2>Usuarios</h2>
                                <span>{filteredUsers.length} de {users.length}</span>
                            </div>
                            <input
                                className="input admin-users__search"
                                placeholder="Buscar por nombre o correo..."
                                value={userSearch}
                                onChange={e => setUserSearch(e.target.value)}
                            />
                            <div className="admin-users">
                                {filteredUsers.map(item => (
                                    <div key={item.id} className="admin-user">
                                        <img src={`/assets/${item.avatar || "avatar1.png"}`} alt={item.name} />
                                        <div className="admin-user__body">
                                            <strong>{item.name}</strong>
                                            <span>{item.email}</span>
                                        </div>
                                        <select className="input admin-user__role" value={item.role} onChange={e => handleRoleChange(item.id, e.target.value)}>
                                            {Object.entries(ROLE_LABELS).map(([value, label]) => (
                                                <option key={value} value={value}>{label}</option>
                                            ))}
                                        </select>
                                    </div>
                                ))}
                                {filteredUsers.length === 0 && (
                                    <div className="admin-page__empty">
                                        <p>No hay usuarios que coincidan con la búsqueda.</p>
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>
                )}
            </div>

            {toast && <div className="toast">✓ {toast}</div>}

            <style>{`
                .admin-page { padding: 40px 0 64px; }
                .admin-page__header { margin-bottom: 32px; }
                .admin-page__header h1 { font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-text); margin-bottom: 6px; }
                .admin-page__header p { font-size: var(--font-size-sm); color: var(--color-text-muted); margin-bottom: 12px; }
                .admin-page__loading, .admin-page__empty { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 40px 0; color: var(--color-text-muted); }
                .admin-page__stack { display: flex; flex-direction: column; gap: 24px; }
                .admin-section { background: var(--color-white); border-radius: var(--radius-xl); box-shadow: var(--shadow); padding: 20px; }
                .admin-section__header { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-bottom: 16px; }
                .admin-section__header h2 { font-size: var(--font-size-lg); font-weight: 800; color: var(--color-text); }
                .admin-section__header span { font-size: var(--font-size-xs); color: var(--color-text-muted); font-weight: 700; }
                .admin-users__search { margin-bottom: 14px; }
                .admin-users { display: flex; flex-direction: column; gap: 10px; }
                .admin-user { display: grid; grid-template-columns: 42px 1fr 190px; gap: 12px; align-items: center; padding: 10px; border: 1px solid var(--color-border); border-radius: var(--radius); }
                .admin-user img { width: 42px; height: 42px; border-radius: var(--radius-full); object-fit: cover; }
                .admin-user__body { min-width: 0; display: flex; flex-direction: column; gap: 2px; }
                .admin-user__body strong { font-size: var(--font-size-sm); color: var(--color-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .admin-user__body span { font-size: var(--font-size-xs); color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .admin-user__role { min-width: 0; }
                .admin-page__list { display: flex; flex-direction: column; gap: 16px; }
                @media (max-width: 640px) { .admin-user { grid-template-columns: 42px 1fr; } .admin-user__role { grid-column: 1 / -1; } }
            `}</style>
        </div>
    );
}
