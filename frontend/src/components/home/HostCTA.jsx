import { useNavigate } from "react-router-dom";
import { PlusCircle, BookOpen } from "lucide-react";

export default function HostCTA() {
    const navigate = useNavigate();

    return (
        <section className="host-cta">
            <div className="container host-cta__inner">
                <div className="host-cta__text">
                    <span className="host-cta__tag">PARA ANFITRIONES</span>
                    <h2 className="host-cta__title">¿Tienes un espacio o experiencia increíble?</h2>
                    <p className="host-cta__desc">
                        Comparte tu lugar turístico, posada, cabaña o experiencia con miles de viajeros en TurismoVE.
                        Publicar es gratis y lleva menos de 2 minutos.
                    </p>
                    <div className="host-cta__actions">
                        <button className="btn btn-primary" onClick={() => navigate("/publicar")}>
                            <PlusCircle size={18} /> Publicar mi espacio
                        </button>
                        <button className="btn btn-outline host-cta__outline" onClick={() => navigate("/mis-publicaciones")}>
                            <BookOpen size={18} /> Ver mis publicaciones
                        </button>
                    </div>
                </div>
                <div className="host-cta__image">
                    <img src="/assets/host-cta-illustration.png" alt="Publicar en TurismoVE" />
                </div>
            </div>

            <style>{`
                .host-cta { background: var(--color-primary-dark); padding: 56px 0; margin-top: 48px; }
                .host-cta__inner { display: flex; align-items: center; justify-content: space-between; gap: 40px; }
                .host-cta__text { max-width: 560px; }
                .host-cta__tag { display: inline-block; background: rgba(255,255,255,0.12); color: rgba(255,255,255,0.8); font-size: .72rem; font-weight: 800; letter-spacing: .1em; padding: 4px 12px; border-radius: var(--radius-full); margin-bottom: 16px; }
                .host-cta__title { font-size: var(--font-size-2xl); font-weight: 800; color: #fff; margin-bottom: 14px; line-height: 1.3; }
                .host-cta__desc { font-size: var(--font-size-base); color: rgba(255,255,255,0.7); line-height: 1.7; margin-bottom: 28px; }
                .host-cta__actions { display: flex; gap: 14px; flex-wrap: wrap; }
                .host-cta__outline { color: var(--color-white); border-color: rgba(255,255,255,0.35); }
                .host-cta__outline:hover { border-color: var(--color-white); background: rgba(255,255,255,0.08); }
                .host-cta__image { flex-shrink: 0; }
                .host-cta__image img { width: 160px; height: 160px; object-fit: contain; opacity: 0.9; }
                @media (max-width: 768px) {
                    .host-cta__inner { flex-direction: column; text-align: center; }
                    .host-cta__actions { justify-content: center; }
                    .host-cta__image { display: none; }
                }
            `}</style>
        </section>
    );
}
