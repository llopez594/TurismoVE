import { useState } from "react";
import PublishPlaceForm from "./PublishPlaceForm";

export default function PlaceTabs() {
    const [activeTab, setActiveTab] = useState("lugar");

    return (
        <div className="place-tabs">
            <div className="place-tabs__header">
                <button
                    className={`place-tabs__tab ${activeTab === "lugar" ? "place-tabs__tab--active" : ""}`}
                    onClick={() => setActiveTab("lugar")}
                >
                    Publicar Lugar Turístico (US-09)
                </button>
                <button
                    className={`place-tabs__tab ${activeTab === "actividad" ? "place-tabs__tab--active" : ""}`}
                    onClick={() => setActiveTab("actividad")}
                >
                    Publicar Experiencia (US-10)
                </button>
            </div>
            <div className="place-tabs__body">
                <PublishPlaceForm type={activeTab} />
            </div>

            <style>{`
                .place-tabs__header { display: flex; border-bottom: 2px solid var(--color-border); margin-bottom: 28px; }
                .place-tabs__tab { padding: 12px 20px; font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text-muted); background: none; border: none; cursor: pointer; border-bottom: 2px solid transparent; margin-bottom: -2px; transition: all var(--transition); }
                .place-tabs__tab--active { color: var(--color-primary); border-bottom-color: var(--color-primary); }
                .place-tabs__tab:hover { color: var(--color-primary); }
            `}</style>
        </div>
    );
}
