import { useState } from "react";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

export default function UpdateNameForm() {
    const { user, updateUser } = useAuth();
    const [name, setName] = useState(user?.name || "");
    const [loading, setLoading] = useState(false);
    const [toast, setToast] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) return;
        setLoading(true);
        try {
            updateUser({ name });
            setToast("Nombre actualizado correctamente.");
            setTimeout(() => setToast(""), 3000);
        } catch {
            setToast("Error al actualizar el nombre.");
            setTimeout(() => setToast(""), 3000);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="profile-section">
            <h3 className="profile-section__title">Actualizar Nombre</h3>
            <form onSubmit={handleSubmit} className="profile-section__form">
                <input
                    type="text"
                    className="input"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Tu nombre completo"
                />
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Guardando..." : "Guardar Nombre"}
                </button>
            </form>
            {toast && <div className="toast">✓ {toast}</div>}
        </div>
    );
}
