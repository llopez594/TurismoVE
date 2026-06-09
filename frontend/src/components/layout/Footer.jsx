import { Link } from "react-router-dom";
import { Instagram, Twitter, Facebook } from "lucide-react";

export default function Footer() {
    return (
        <footer className="footer">
            <div className="container footer__inner">
                {/* Brand */}
                <div className="footer__brand">
                    <Link to="/" className="footer__logo">
                        <img src="/assets/icon.png" alt="TurismoVE" width={28} height={28} />
                        <span>TurismoVE <strong>Explorer</strong></span>
                    </Link>
                    <p className="footer__tagline">
                        Tu portal de confianza para explorar y calificar los mejores lugares en Venezuela.
                        Descubre paraísos naturales con la tranquilidad de servicios básicos garantizados.
                    </p>
                </div>

                {/* Links */}
                <div className="footer__col">
                    <h4 className="footer__heading">EXPLORAR</h4>
                    <Link to="/buscar?categoria=Playas" className="footer__link">Playas</Link>
                    <Link to="/buscar?categoria=Montañas" className="footer__link">Montañas</Link>
                    <Link to="/buscar?categoria=Ciudades" className="footer__link">Ciudades</Link>
                    <Link to="/buscar?categoria=Aventura" className="footer__link">Aventura</Link>
                    <Link to="/buscar?categoria=Cultura" className="footer__link">Cultura</Link>
                    <Link to="/buscar?categoria=Gastronomía" className="footer__link">Gastronomía</Link>
                </div>

                <div className="footer__col">
                    <h4 className="footer__heading">INFORMACIÓN</h4>
                    <span className="footer__link">Soporte al Usuario</span>
                    <span className="footer__link">Preguntas Frecuentes</span>
                    <span className="footer__link">Términos de Servicio</span>
                    <span className="footer__link">Privacidad</span>
                </div>

                <div className="footer__col">
                    <h4 className="footer__heading">CONTACTO</h4>
                    <a href="mailto:info@turismove.com" className="footer__link footer__link--primary">
                        info@turismove.com
                    </a>
                    <span className="footer__link">Soporte: 24/7 en Línea</span>
                    <div className="footer__social">
                        <a href="https://www.instagram.com/turismove2026?igsh=a2hwd3BncmEzbGlx" className="footer__social-icon" aria-label="Instagram"><Instagram size={18} /></a>
                    </div>
                </div>
            </div>

            <div className="footer__bottom">
                <div className="container">
                    <span>© 2026 TurismoVE Explorer. Todos los derechos reservados.</span>
                </div>
            </div>

            <style>{`
                .footer {
                    background: var(--color-white);
                    border-top: 1px solid var(--color-border);
                    margin-top: 64px;
                }
                .footer__inner {
                    display: grid;
                    grid-template-columns: 2fr 1fr 1fr 1fr;
                    gap: 48px;
                    padding-top: 48px;
                    padding-bottom: 48px;
                }
                .footer__logo {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 1rem;
                    font-weight: 700;
                    color: var(--color-text);
                    margin-bottom: 12px;
                }
                .footer__logo strong { color: var(--color-primary); }
                .footer__tagline {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-muted);
                    line-height: 1.7;
                }
                .footer__heading {
                    font-size: var(--font-size-xs);
                    font-weight: 700;
                    letter-spacing: 0.08em;
                    color: var(--color-text);
                    margin-bottom: 16px;
                }
                .footer__col {
                    display: flex;
                    flex-direction: column;
                    gap: 10px;
                }
                .footer__link {
                    font-size: var(--font-size-sm);
                    color: var(--color-text-muted);
                    transition: color var(--transition);
                    cursor: pointer;
                }
                .footer__link:hover { color: var(--color-primary); }
                .footer__link--primary {
                    color: var(--color-primary);
                    font-weight: 600;
                }
                .footer__social {
                    display: flex;
                    gap: 12px;
                    margin-top: 4px;
                }
                .footer__social-icon {
                    color: var(--color-text-muted);
                    transition: color var(--transition);
                }
                .footer__social-icon:hover { color: var(--color-primary); }
                .footer__bottom {
                    border-top: 1px solid var(--color-border);
                    padding: 16px 0;
                }
                .footer__bottom .container {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-size: var(--font-size-xs);
                    color: var(--color-text-muted);
                }
                .footer__badge {
                    background: var(--color-text);
                    color: var(--color-white);
                    padding: 3px 10px;
                    border-radius: var(--radius-full);
                    font-size: 10px;
                    font-weight: 700;
                    letter-spacing: 0.06em;
                }
                @media (max-width: 768px) {
                    .footer__inner {
                        grid-template-columns: 1fr;
                        gap: 32px;
                        padding-top: 32px;
                        padding-bottom: 32px;
                    }
                }
            `}</style>
        </footer>
    );
}
