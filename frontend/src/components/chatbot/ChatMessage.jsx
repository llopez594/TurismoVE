export default function ChatMessage({ message }) {
    const isUser = message.role === "user";
    const isTyping = message.typing;

    return (
        <div className={`chat-msg ${isUser ? "chat-msg--user" : "chat-msg--bot"}`}>
            {!isUser && (
                <div className="chat-msg__avatar">
                    <img src="/assets/icon.png" alt="Bot" width={28} height={28} style={{ borderRadius: "50%" }} />
                </div>
            )}
            <div className="chat-msg__bubble">
                {isTyping ? (
                    <div className="chat-msg__typing">
                        <span /><span /><span />
                    </div>
                ) : (
                    <p>{message.text}</p>
                )}
            </div>

            <style>{`
                .chat-msg { display: flex; gap: 8px; align-items: flex-end; margin-bottom: 12px; }
                .chat-msg--user { flex-direction: row-reverse; }
                .chat-msg__avatar { width: 28px; height: 28px; flex-shrink: 0; }
                .chat-msg__bubble { max-width: 78%; padding: 10px 14px; border-radius: 16px; font-size: .85rem; line-height: 1.5; }
                .chat-msg--bot .chat-msg__bubble { background: #F3F4F6; color: var(--color-text); border-bottom-left-radius: 4px; }
                .chat-msg--user .chat-msg__bubble { background: var(--color-primary); color: #fff; border-bottom-right-radius: 4px; }
                .chat-msg__typing { display: flex; gap: 4px; align-items: center; padding: 2px 0; }
                .chat-msg__typing span { width: 7px; height: 7px; background: var(--color-text-muted); border-radius: 50%; animation: bounce 1.2s infinite; }
                .chat-msg__typing span:nth-child(2) { animation-delay: .2s; }
                .chat-msg__typing span:nth-child(3) { animation-delay: .4s; }
                @keyframes bounce { 0%,80%,100% { transform: translateY(0); } 40% { transform: translateY(-6px); } }
            `}</style>
        </div>
    );
}
