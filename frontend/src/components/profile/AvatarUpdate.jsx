import { useState } from "react";
import { useAuth } from "../../context/AuthContext";

const AVATARS = ["avatar1.png", "avatar2.png", "avatar3.png", "avatar4.png", "avatar5.png"];

export default function AvatarUpdate() {
    const { user, updateUser } = useAuth();
    const [selected, setSelected] = useState(user?.avatar || "avatar1.png");
    const [toast, setToast] = useState("");

    function handleSelect(av) {
        setSelected(av);
        updateUser({ avatar: av });
        setToast("Avatar actualizado correctamente.");
        setTimeout(() => setToast(""), 3000);
    }

    return (
        <div className="profile-section">
            <h3 className="profile-section__title">Actualizar Foto de Perfil</h3>
            <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-text-muted)", marginBottom: "16px" }}>
                Selecciona un avatar o sube tu propia foto:
            </p>
            <div className="avatar-update__grid">
                {AVATARS.map(av => (
                    <button
                        key={av}
                        type="button"
                        className={`avatar-update__item ${selected === av ? "avatar-update__item--active" : ""}`}
                        onClick={() => handleSelect(av)}
                    >
                        <img src={`/assets/${av}`} alt={av} width={48} height={48} />
                    </button>
                ))}
            </div>
            {toast && <div className="toast">✓ {toast}</div>}

            <style>{`
                .avatar-update__grid { display: flex; gap: 12px; flex-wrap: wrap; }
                .avatar-update__item { background: none; border: 2.5px solid transparent; border-radius: 50%; padding: 3px; cursor: pointer; transition: border-color var(--transition); }
                .avatar-update__item img { border-radius: 50%; display: block; }
                .avatar-update__item--active { border-color: var(--color-primary); }
                .avatar-update__item:hover { border-color: var(--color-primary-light); }
            `}</style>
        </div>
    );
}
