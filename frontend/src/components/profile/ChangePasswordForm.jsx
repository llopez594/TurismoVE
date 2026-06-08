import { useState } from "react";
import { Lock } from "lucide-react";

export default function ChangePasswordForm() {
    const [form, setForm] = useState({ current: "", next: "", confirm: "" });
    const [error, setError] = useState("");
    const [toast, setToast] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        if (!form.current || !form.next || !form.confirm) {
            setError("Todos los campos son obligatorios.");
            return;
        }
        if (form.next.length < 6) {
            setError("La nueva contraseña debe tener al menos 6 caracteres.");
            return;
        }
        if (form.next !== form.confirm) {
            setError("Las contraseñas no coinciden.");
            return;
        }
        setLoading(true);
        setTimeout(() => {
            setToast("Contraseña actualizada correctamente.");
            setTimeout(() => setToast(""), 3000);
            setForm({ current: "", next: "", confirm: "" });
            setLoading(false);
        }, 800);
    }

    return (
        <div className="profile-section">
            <h3 className="profile-section__title">Cambiar Contraseña</h3>
            <form onSubmit={handleSubmit} className="cpf__form">
                {[
                    { name: "current", label: "Contraseña Actual", placeholder: "••••••••" },
                    { name: "next", label: "Nueva Contraseña", placeholder: "Nueva contraseña (mínimo 6 caracteres)" },
                    { name: "confirm", label: "Confirmar Nueva Contraseña", placeholder: "Confirmar nueva contraseña" },
                ].map(f => (
                    <div key={f.name} className="cpf__group">
                        <label className="cpf__label">{f.label}</label>
                        <div style={{ position: "relative" }}>
                            <Lock size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--color-text-muted)", pointerEvents: "none" }} />
                            <input
                                type="password"
                                name={f.name}
                                className="input"
                                style={{ paddingLeft: 36 }}
                                placeholder={f.placeholder}
                                value={form[f.name]}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                ))}
                {error && <p style={{ color: "var(--color-error)", fontSize: "var(--font-size-sm)" }}>{error}</p>}
                <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? "Actualizando..." : "Actualizar Contraseña"}
                </button>
            </form>
            {toast && <div className="toast">✓ {toast}</div>}

            <style>{`
                .cpf__form { display: flex; flex-direction: column; gap: 16px; }
                .cpf__group { display: flex; flex-direction: column; gap: 6px; }
                .cpf__label { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text); }
            `}</style>
        </div>
    );
}
