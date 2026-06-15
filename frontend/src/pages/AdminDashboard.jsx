import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api, { unwrapResponse } from "../services/api";
import PendingPlaceCard from "../components/admin/PendingPlaceCard";

export default function AdminDashboard() {
    const { isAuthenticated, isAdmin } = useAuth();
    const navigate = useNavigate();
    const [pending, setPending] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toast, setToast] = useState("");

    useEffect(() => {
        if (!isAuthenticated || !isAdmin) { navigate("/"); return; }
        loadPending();
    }, [isAuthenticated, isAdmin]);

    async function loadPending() {
        setLoading(true);
        try {
            const res = await api.get("/admin/places/pending");
            const data = unwrapResponse(res.data);
            setPending(data.data || []);
        } catch {
            setPending([]);
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

    return (
        <div className="admin-page">
            <div className="container">
                <div className="admin-page__header">
                    <h1>Panel de Administración</h1>
                    <p>Gestiona los lugares turísticos pendientes de aprobación.</p>
                    {!loading && (
                        <span className="admin-page__count">
                            {pending.length} lugar{pending.length !== 1 ? "es" : ""} pendiente{pending.length !== 1 ? "s" : ""} de revisión
                        </span>
                    )}
                </div>

                {loading ? (
                    <div className="admin-page__loading"><div className="spinner" /></div>
                ) : pending.length === 0 ? (
                    <div className="admin-page__empty">
                        <span style={{ fontSize: "2.5rem" }}>✅</span>
                        <p>No hay lugares pendientes de aprobación.</p>
                    </div>
                ) : (
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
                )}
            </div>

            {toast && <div className="toast">✓ {toast}</div>}

            <style>{`
                .admin-page { padding: 40px 0 64px; }
                .admin-page__header { margin-bottom: 32px; }
                .admin-page__header h1 { font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-text); margin-bottom: 6px; }
                .admin-page__header p { font-size: var(--font-size-sm); color: var(--color-text-muted); margin-bottom: 12px; }
                .admin-page__count { display: inline-block; background: #FEF3C7; color: #92400E; padding: 4px 12px; border-radius: var(--radius-full); font-size: var(--font-size-sm); font-weight: 700; }
                .admin-page__loading, .admin-page__empty { display: flex; flex-direction: column; align-items: center; gap: 16px; padding: 80px 0; color: var(--color-text-muted); }
                .admin-page__list { display: flex; flex-direction: column; gap: 16px; }
            `}</style>
        </div>
    );
}
