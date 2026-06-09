import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AVATARS = ["avatar1.png", "avatar2.png", "avatar3.png", "avatar4.png", "avatar5.png"];

export default function RegisterForm({ onSwitch, onClose }) {
    const { register } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [selectedAvatar, setSelectedAvatar] = useState("avatar1.png");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    async function handleSubmit(e) {
        e.preventDefault();
        if (!name || !email || !password) {
            setError("Todos los campos son obligatorios.");
            return;
        }
        if (password.length < 6) {
            setError("La contraseña debe tener al menos 6 caracteres.");
            return;
        }
        setError("");
        setLoading(true);
        try {
            await register(name, email, password, selectedAvatar);
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || "Error al registrarse. Intenta de nuevo.");
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
            <h2 className="auth-form__title">Crear Cuenta</h2>
            <p className="auth-form__subtitle">Regístrate para calificar y reservar alojamientos</p>

            <form onSubmit={handleSubmit} className="auth-form__fields">
                <div className="auth-form__group">
                    <label className="auth-form__label">Nombre Completo</label>
                    <div className="auth-form__input-wrap">
                        <User size={16} className="auth-form__input-icon" />
                        <input
                            type="text"
                            className="auth-form__input"
                            placeholder="ej. María González"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                </div>

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
                            placeholder="Mínimo 6 caracteres"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <button type="button" className="auth-form__eye" onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                    </div>
                </div>

                <div className="auth-form__group">
                    <label className="auth-form__label">Avatar de Perfil</label>
                    <div className="avatar-selector">
                        {AVATARS.map(av => (
                            <button
                                key={av}
                                type="button"
                                className={`avatar-selector__item ${selectedAvatar === av ? "avatar-selector__item--active" : ""}`}
                                onClick={() => setSelectedAvatar(av)}
                            >
                                <img src={`/assets/${av}`} alt={av} width={44} height={44} />
                            </button>
                        ))}
                    </div>
                </div>

                {error && <p className="auth-form__error">{error}</p>}

                <button type="submit" className="btn btn-primary btn-full btn-lg" disabled={loading}>
                    {loading ? "Creando cuenta..." : "Crear Cuenta"}
                </button>
            </form>

            <p className="auth-form__switch">
                ¿Ya tienes cuenta?{" "}
                <button onClick={onSwitch} className="auth-form__switch-btn">
                    Inicia sesión aquí
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
                .avatar-selector { display: flex; gap: 10px; flex-wrap: wrap; }
                .avatar-selector__item { background: none; border: 2.5px solid transparent; border-radius: 50%; padding: 2px; cursor: pointer; transition: border-color var(--transition); }
                .avatar-selector__item img { border-radius: 50%; display: block; }
                .avatar-selector__item--active { border-color: var(--color-primary); }
                .avatar-selector__item:hover { border-color: var(--color-primary-light); }
                .auth-form__input::-ms-reveal, .auth-form__input::-ms-clear {display: none;}
            `}</style>
        </div>
    );
}
