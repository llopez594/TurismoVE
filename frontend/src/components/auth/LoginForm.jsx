import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ onSwitch, onClose }) {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (!email || !password) {
            setError("Correo y contraseña son obligatorios.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            const user = await login(email, password);
            onClose();
            if (user.role === "admin") navigate("/admin");
        } catch (err) {
            setError(err.response?.data?.message || "Correo o contraseña incorrectos.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-form">
            <div className="auth-form__logo">
                <img src="/assets/icon.png" alt="TurismoVE" width={36} height={36} />
                <span>TurismoVE <strong>Explorer</strong></span>
            </div>
            <h2 className="auth-form__title">¡Bienvenido de nuevo!</h2>
            <p className="auth-form__subtitle">Ingresa tus credenciales para continuar</p>

            <form onSubmit={handleSubmit} className="auth-form__fields">
                <div className="auth-form__group">
                    <label className="auth-form__label">Correo Electrónico</label>
                    <div className="auth-form__input-wrap">
                        <Mail size={16} className="auth-form__input-icon" />
                        <input
                            type="email"
                            className="auth-form__input"
                            placeholder="correo@ejemplo.com"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            autoComplete="email"
                        />
                    </div>
                </div>

                <div className="auth-form__group">
                    <label className="auth-form__label">Contraseña</label>
                    <div className="auth-form__input-wrap">
                        <Lock size={16} className="auth-form__input-icon" />
                        <input
                            type={showPassword ? "text" : "password"}
                            className="auth-form__input"
                            placeholder="••••••••"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            autoComplete="current-password"
                        />
                        <button type="button" className="auth-form__eye" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                {error && <p className="auth-form__error">{error}</p>}

                <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
                    {loading ? "Ingresando..." : "Iniciar Sesión"}
                </button>
            </form>

            <p className="auth-form__switch">
                ¿No tienes una cuenta?{" "}
                <button onClick={onSwitch} className="auth-form__switch-btn">
                    Regístrate aquí
                </button>
            </p>

            <style>{`
                .auth-form { text-align: center; }
                .auth-form__logo { display: flex; align-items: center; justify-content: center; gap: 8px; font-size: 1rem; font-weight: 700; color: var(--color-text); margin-bottom: 20px; }
                .auth-form__logo strong { color: var(--color-primary); }
                .auth-form__title { font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-text); margin-bottom: 6px; }
                .auth-form__subtitle { font-size: var(--font-size-sm); color: var(--color-text-muted); margin-bottom: 28px; }
                .auth-form__fields { display: flex; flex-direction: column; gap: 16px; text-align: left; }
                .auth-form__group { display: flex; flex-direction: column; gap: 6px; }
                .auth-form__label { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text); }
                .auth-form__input-wrap { position: relative; display: flex; align-items: center; }
                .auth-form__input-icon { position: absolute; left: 14px; color: var(--color-text-muted); pointer-events: none; }
                .auth-form__input { width: 100%; padding: 12px 14px 12px 40px; background: var(--color-bg-input); border: 1.5px solid transparent; border-radius: var(--radius); font-size: var(--font-size-base); color: var(--color-text); outline: none; transition: border-color var(--transition); }
                .auth-form__input:focus { border-color: var(--color-primary); background: var(--color-white); }
                .auth-form__eye { position: absolute; right: 14px; background: none; border: none; color: var(--color-text-muted); cursor: pointer; padding: 0; }
                .auth-form__error { background: #FEE2E2; color: #991B1B; padding: 10px 14px; border-radius: var(--radius-sm); font-size: var(--font-size-sm); text-align: center; }
                .auth-form__switch { margin-top: 20px; font-size: var(--font-size-sm); color: var(--color-text-muted); }
                .auth-form__switch-btn { background: none; border: none; color: var(--color-primary); font-weight: 700; cursor: pointer; font-size: var(--font-size-sm); }
                .auth-form__switch-btn:hover { text-decoration: underline; }
                .auth-form__input::-ms-reveal, .auth-form__input::-ms-clear {display: none;}
            `}</style>
        </div>
    );
}
