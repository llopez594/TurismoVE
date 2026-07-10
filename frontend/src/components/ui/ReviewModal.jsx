import { useState } from "react";
import { X } from "lucide-react";
import StarRating from "../ui/StarRating";

export default function ReviewModal({ isOpen, onClose, placeName }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [toast, setToast] = useState(false);

    if (!isOpen) return null;

    function handleSubmit(e) {
        e.preventDefault();
        setToast(true);
        setTimeout(() => { setToast(false); onClose(); }, 1500);
    }

    return (
        <div className="modal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
            <div className="modal-card" style={{ maxWidth: 480 }}>
                <button style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "var(--color-text-muted)" }} onClick={onClose}>
                    <X size={20} />
                </button>

                <h2 style={{ fontSize: "var(--font-size-xl)", fontWeight: 800, color: "var(--color-text)" }}>
                    Escribir una reseña
                </h2>
                <div style={{ borderBottom: "1px solid var(--color-border)", margin: "16px -32px 24px" }} />

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: "var(--font-size-base)", color: "var(--color-text)", marginBottom: "16px" }}>
                            ¿Cómo calificarías tu experiencia en este lugar?
                        </p>
                        <div style={{ display: "flex", justifyContent: "center" }}>
                            <StarRating value={rating} interactive onChange={setRating} size={36} />
                        </div>
                    </div>

                    <div>
                        <label style={{ fontSize: "var(--font-size-sm)", fontWeight: 700, color: "var(--color-text)", display: "block", marginBottom: "8px" }}>
                            Comentario Escrito
                        </label>
                        <textarea
                            className="input"
                            rows={4}
                            placeholder="Comparte los detalles de tu estadía y opinión del lugar..."
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                        />
                    </div>

                    {toast && <div className="toast">✓ Las reseñas estarán disponibles próximamente.</div>}

                    <div style={{ borderTop: "1px solid var(--color-border)", margin: "0 -32px", padding: "20px 32px 0", display: "flex", gap: "12px", justifyContent: "flex-end", background: "var(--color-bg-input)" }}>
                        <button type="button" className="btn btn-outline" onClick={onClose}>Cancelar</button>
                        <button type="submit" className="btn btn-primary">Publicar Reseña</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
