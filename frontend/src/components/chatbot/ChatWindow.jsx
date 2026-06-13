import { useState, useRef, useEffect } from "react";
import { X, Send } from "lucide-react";
import api from "../../services/api";
import ChatMessage from "./ChatMessage";

const WELCOME = {
    id: 0,
    role: "bot",
    text: "¡Hola! Soy el asistente turístico de TurismoVE. ¿En qué puedo ayudarte hoy? Puedo recomendarte destinos, experiencias y alojamientos en Venezuela. 🌴"
};

export default function ChatWindow({ onClose }) {
    const [messages, setMessages] = useState([WELCOME]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    async function sendMessage() {
        const text = input.trim();
        if (!text || loading) return;

        setInput("");
        setMessages(prev => [...prev, { id: Date.now(), role: "user", text }]);
        setLoading(true);
        setMessages(prev => [...prev, { id: "typing", role: "bot", typing: true }]);

        try {
            const res = await api.post("/ai/chat", { message: text });
            setMessages(prev => [
                ...prev.filter(m => m.id !== "typing"),
                { id: Date.now(), role: "bot", text: res.data.reply }
            ]);
        } catch {
            setMessages(prev => [
                ...prev.filter(m => m.id !== "typing"),
                { id: Date.now(), role: "bot", text: "Lo siento, tuve un problema al responder. Intenta de nuevo." }
            ]);
        } finally {
            setLoading(false);
        }
    }

    function handleKey(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    }

    return (
        <div className="chat-window">
            <div className="chat-window__header">
                <div className="chat-window__header-info">
                    <img src="/assets/icon.png" alt="TurismoVE" width={28} height={28} style={{ borderRadius: "50%" }} />
                    <div>
                        <p className="chat-window__title">Asistente TurismoVE</p>
                        <p className="chat-window__status">En línea</p>
                    </div>
                </div>
                <button className="chat-window__close" onClick={onClose}><X size={18} /></button>
            </div>

            <div className="chat-window__messages">
                {messages.map(msg => (
                    <ChatMessage key={msg.id} message={msg} />
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="chat-window__input-area">
                <input
                    type="text"
                    className="chat-window__input"
                    placeholder="Escribe tu mensaje..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    disabled={loading}
                />
                <button
                    className="chat-window__send"
                    onClick={sendMessage}
                    disabled={!input.trim() || loading}
                >
                    <Send size={16} />
                </button>
            </div>

            <style>{`
                .chat-window { display: flex; flex-direction: column; width: 340px; height: 480px; background: var(--color-white); border-radius: var(--radius-xl); box-shadow: var(--shadow-lg); overflow: hidden; border: 1px solid var(--color-border); }
                .chat-window__header { background: var(--color-primary-dark); padding: 14px 16px; display: flex; align-items: center; justify-content: space-between; }
                .chat-window__header-info { display: flex; align-items: center; gap: 10px; }
                .chat-window__title { font-size: var(--font-size-sm); font-weight: 700; color: #fff; }
                .chat-window__status { font-size: .72rem; color: #4DD9C0; }
                .chat-window__close { background: none; border: none; color: rgba(255,255,255,0.7); cursor: pointer; padding: 2px; }
                .chat-window__close:hover { color: #fff; }
                .chat-window__messages { flex: 1; overflow-y: auto; padding: 16px; }
                .chat-window__input-area { display: flex; gap: 8px; padding: 12px 14px; border-top: 1px solid var(--color-border); }
                .chat-window__input { flex: 1; padding: 8px 12px; background: var(--color-bg-input); border: 1px solid transparent; border-radius: var(--radius-full); font-size: var(--font-size-sm); outline: none; transition: border-color var(--transition); }
                .chat-window__input:focus { border-color: var(--color-primary); }
                .chat-window__send { background: var(--color-primary); color: #fff; border: none; border-radius: 50%; width: 34px; height: 34px; display: flex; align-items: center; justify-content: center; cursor: pointer; flex-shrink: 0; transition: background var(--transition); }
                .chat-window__send:hover:not(:disabled) { background: var(--color-primary-hover); }
                .chat-window__send:disabled { opacity: 0.5; cursor: not-allowed; }
            `}</style>
        </div>
    );
}
