import { useState, useEffect } from "react";
import { X } from "lucide-react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

export default function AuthModal({ isOpen, onClose, initialView = "login" }) {
    const [view, setView] = useState(initialView);

    useEffect(() => {
        setView(initialView);
    }, [initialView]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => { document.body.style.overflow = ""; };
    }, [isOpen]);

    if (!isOpen) return null;

    function handleOverlayClick(e) {
        if (e.target === e.currentTarget) onClose();
    }

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-card auth-modal">
                <button className="auth-modal__close" onClick={onClose} aria-label="Cerrar">
                    <X size={20} />
                </button>

                {view === "login" ? (
                    <LoginForm
                        onSwitch={() => setView("register")}
                        onClose={onClose}
                    />
                ) : (
                    <RegisterForm
                        onSwitch={() => setView("login")}
                        onClose={onClose}
                    />
                )}
            </div>

            <style>{`
                .auth-modal { max-width: 460px; padding: 40px 36px; }
                .auth-modal__close { position: absolute; top: 16px; right: 16px; background: none; border: none; color: var(--color-text-muted); cursor: pointer; padding: 4px; border-radius: var(--radius-sm); transition: background var(--transition); }
                .auth-modal__close:hover { background: var(--color-bg-input); color: var(--color-text); }
            `}</style>
        </div>
    );
}
