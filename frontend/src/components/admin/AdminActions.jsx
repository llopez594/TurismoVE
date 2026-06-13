import { useState } from "react";
import { CheckCircle, XCircle } from "lucide-react";

export default function AdminActions({ placeId, onApprove, onReject }) {
    const [loading, setLoading] = useState(false);

    async function handleApprove() {
        setLoading(true);
        await onApprove(placeId);
        setLoading(false);
    }

    async function handleReject() {
        setLoading(true);
        await onReject(placeId);
        setLoading(false);
    }

    return (
        <div className="admin-actions">
            <button
                className="admin-actions__btn admin-actions__btn--approve"
                onClick={handleApprove}
                disabled={loading}
            >
                <CheckCircle size={16} />
                {loading ? "..." : "Aprobar"}
            </button>
            <button
                className="admin-actions__btn admin-actions__btn--reject"
                onClick={handleReject}
                disabled={loading}
            >
                <XCircle size={16} />
                {loading ? "..." : "Rechazar"}
            </button>

            <style>{`
                .admin-actions { display: flex; flex-direction: column; gap: 8px; }
                .admin-actions__btn { display: flex; align-items: center; gap: 6px; padding: 8px 16px; border-radius: var(--radius); font-size: var(--font-size-sm); font-weight: 700; border: none; cursor: pointer; transition: all var(--transition); white-space: nowrap; }
                .admin-actions__btn:disabled { opacity: 0.6; cursor: not-allowed; }
                .admin-actions__btn--approve { background: #D1FAE5; color: #065F46; }
                .admin-actions__btn--approve:hover:not(:disabled) { background: #A7F3D0; }
                .admin-actions__btn--reject { background: #FEE2E2; color: #991B1B; }
                .admin-actions__btn--reject:hover:not(:disabled) { background: #FECACA; }
            `}</style>
        </div>
    );
}
