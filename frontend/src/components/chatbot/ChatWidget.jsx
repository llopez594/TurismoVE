import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
    const [open, setOpen] = useState(false);

    return (
        <div className="chat-widget">
            {open && (
                <div className="chat-widget__window">
                    <ChatWindow onClose={() => setOpen(false)} />
                </div>
            )}
            <button
                className="chat-widget__btn"
                onClick={() => setOpen(!open)}
                aria-label={open ? "Cerrar chat" : "Abrir chat"}
            >
                {open ? <X size={24} /> : <MessageCircle size={24} />}
            </button>

            <style>{`
                .chat-widget { position: fixed; bottom: 24px; right: 24px; z-index: 1000; display: flex; flex-direction: column; align-items: flex-end; gap: 12px; }
                .chat-widget__window { animation: slideUpChat 0.25s ease; }
                @keyframes slideUpChat { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
                .chat-widget__btn { width: 54px; height: 54px; border-radius: 50%; background: var(--color-primary); color: #fff; border: none; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-lg); transition: all var(--transition); }
                .chat-widget__btn:hover { background: var(--color-primary-hover); transform: scale(1.05); }
            `}</style>
        </div>
    );
}
