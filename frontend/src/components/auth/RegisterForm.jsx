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
                .avatar-selector { display: flex; gap: 10px; flex-wrap: wrap; }
                .avatar-selector__item { background: none; border: 2.5px solid transparent; border-radius: 50%; padding: 2px; cursor: pointer; transition: border-color var(--transition); }
                .avatar-selector__item img { border-radius: 50%; display: block; }
                .avatar-selector__item--active { border-color: var(--color-primary); }
                .avatar-selector__item:hover { border-color: var(--color-primary-light); }
            `}</style>
        </div>
    );
}
