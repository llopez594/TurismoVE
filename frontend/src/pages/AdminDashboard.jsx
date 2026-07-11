import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RotateCcw, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import api, { unwrapResponse } from "../services/api";
import PendingPlaceCard from "../components/admin/PendingPlaceCard";

const ROOT_ADMIN_EMAIL = "admin@turismove.com";

const ROLE_LABELS = {
    user: "Usuario",
    content_creator: "Creador de contenido",
    admin: "Administrador"
};

export default function AdminDashboard() {
    const { user, isAuthenticated, isAdmin, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const [pending, setPending] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState("");
    const [userSearch, setUserSearch] = useState("");
    const [passwordTarget, setPasswordTarget] = useState(null);
    const [newPassword, setNewPassword] = useState("");
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [passwordError, setPasswordError] = useState("");

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

    function openPasswordModal(item) {
        setPasswordTarget(item);
        setNewPassword("");
        setPasswordError("");
    }

    function closePasswordModal() {
        setPasswordTarget(null);
        setNewPassword("");
        setPasswordError("");
    }

    async function handlePasswordReset(e) {
        e.preventDefault();
        if (!newPassword || newPassword.length < 6) {
            setPasswordError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }

        setPasswordLoading(true);
        setPasswordError("");
        try {
            await api.patch(`/admin/users/${passwordTarget.id}/password`, { password: newPassword });
            showToast("Contraseña reseteada correctamente.");
            closePasswordModal();
        } catch (err) {
            setPasswordError(err.response?.data?.message || "Error al resetear la contraseña.");
        } finally {
            setPasswordLoading(false);
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
                                {filteredUsers.map(item => {
                                    const isRootAdmin = item.email === ROOT_ADMIN_EMAIL;

                                    return (
                                        <div key={item.id} className="admin-user">
                                            <img src={`/assets/${item.avatar || "avatar1.png"}`} alt={item.name} />
                                            <div className="admin-user__body">
                                                <strong>{item.name}</strong>
                                                <span>{item.email}</span>
                                            </div>
                                            {isRootAdmin ? (
                                                <span className="admin-user__protected-role">Administrador</span>
                                            ) : (
                                                <div className="admin-user__controls">
                                                    {item.id !== user?.id && (
                                                        <button
                                                            className="admin-user__reset-btn"
                                                            type="button"
                                                            title="Resetear la contraseña"
                                                            onClick={() => openPasswordModal(item)}
                                                        >
                                                            <RotateCcw size={16} />
                                                        </button>
                                                    )}
                                                    <select className="input admin-user__role" value={item.role} onChange={e => handleRoleChange(item.id, e.target.value)}>
                                                        {Object.entries(ROLE_LABELS).map(([value, label]) => (
                                                            <option key={value} value={value}>{label}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
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

            {passwordTarget && (
                <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) closePasswordModal(); }}>
                    <div className="modal-card admin-password-modal">
                        <button className="admin-password-modal__close" type="button" onClick={closePasswordModal} disabled={passwordLoading}>
                            <X size={20} />
                        </button>
                        <h2 className="admin-password-modal__title">Resetear contraseña</h2>
                        <p className="admin-password-modal__subtitle">
                            Nueva contraseña para <strong>{passwordTarget.name}</strong>.
                        </p>
                        <form className="admin-password-modal__form" onSubmit={handlePasswordReset}>
                            <div className="admin-password-modal__group">
                                <label>Nueva contraseña</label>
                                <input
                                    className="input"
                                    type="password"
                                    value={newPassword}
                                    onChange={e => setNewPassword(e.target.value)}
                                    placeholder="Mínimo 6 caracteres"
                                    disabled={passwordLoading}
                                    autoFocus
                                />
                            </div>
                            {passwordError && <p className="admin-password-modal__error">{passwordError}</p>}
                            <div className="admin-password-modal__actions">
                                <button type="button" className="btn btn-outline" onClick={closePasswordModal} disabled={passwordLoading}>Cancelar</button>
                                <button type="submit" className="btn btn-primary" disabled={passwordLoading}>
                                    {passwordLoading ? "Guardando..." : "Guardar contraseña"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

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
                .admin-user { display: grid; grid-template-columns: 42px 1fr 236px; gap: 12px; align-items: center; padding: 10px; border: 1px solid var(--color-border); border-radius: var(--radius); }
                .admin-user img { width: 42px; height: 42px; border-radius: var(--radius-full); object-fit: cover; }
                .admin-user__body { min-width: 0; display: flex; flex-direction: column; gap: 2px; }
                .admin-user__body strong { font-size: var(--font-size-sm); color: var(--color-text); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .admin-user__body span { font-size: var(--font-size-xs); color: var(--color-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .admin-user__controls { display: grid; grid-template-columns: 34px 1fr; gap: 8px; align-items: center; }
                .admin-user__protected-role { justify-self: end; display: inline-flex; align-items: center; justify-content: center; min-height: 34px; padding: 0 14px; border-radius: var(--radius); background: var(--color-bg-input); color: var(--color-text-muted); font-size: var(--font-size-sm); font-weight: 700; }
                .admin-user__reset-btn { width: 34px; height: 34px; display: inline-flex; align-items: center; justify-content: center; color: var(--color-text-muted); background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius); cursor: pointer; transition: all var(--transition); }
                .admin-user__reset-btn:hover { color: var(--color-primary); border-color: var(--color-primary); background: #F0FAFA; }
                .admin-user__role { min-width: 0; }
                .admin-page__list { display: flex; flex-direction: column; gap: 16px; }
                .admin-password-modal { max-width: 440px; position: relative; }
                .admin-password-modal__close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: var(--color-text-muted); cursor: pointer; }
                .admin-password-modal__title { font-size: var(--font-size-xl); font-weight: 800; color: var(--color-text); margin-bottom: 6px; }
                .admin-password-modal__subtitle { font-size: var(--font-size-sm); color: var(--color-text-muted); margin-bottom: 20px; }
                .admin-password-modal__form { display: flex; flex-direction: column; gap: 16px; }
                .admin-password-modal__group { display: flex; flex-direction: column; gap: 6px; }
                .admin-password-modal__group label { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text); }
                .admin-password-modal__error { background: #FEE2E2; color: #991B1B; padding: 10px 14px; border-radius: var(--radius-sm); font-size: var(--font-size-sm); }
                .admin-password-modal__actions { display: flex; justify-content: flex-end; gap: 12px; }
                @media (max-width: 640px) { .admin-user { grid-template-columns: 42px 1fr; } .admin-user__controls, .admin-user__protected-role { grid-column: 1 / -1; justify-self: stretch; } }
            `}</style>
        </div>
    );
}
