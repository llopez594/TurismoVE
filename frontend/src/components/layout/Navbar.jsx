import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X, Bell, LogOut, User, MapPin, BookOpen, PlusCircle, Shield } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function Navbar({ onLoginClick, onRegisterClick }) {
    const { user, isAuthenticated, isAdmin, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate("/");
        setMenuOpen(false);
    }

    return (
        <header className="navbar">
            <div className="container navbar__inner">
                {!isAuthenticated ?(
                   <Link to="/" className="navbar__logo">
                        <img src="/assets/icon.png" alt="TurismoVE" width={32} height={32} />
                        <span>TurismoVE <strong>Explorer</strong></span>
                    </Link>
                ) : (
                   <Link to="/admin" className="navbar__logo">
                        <img src="/assets/icon.png" alt="TurismoVE" width={32} height={32} />
                        <span>TurismoVE <strong>Explorer</strong></span>
                    </Link>
                )}

                <nav className="navbar__links hide-mobile">
                    {!isAuthenticated ?(
                    <Link to="/buscar" className="navbar__link">Explorar</Link>
                    ) : (
                        <Link to="/perfil" className="navbar__link">
                            Perfil
                        </Link>
                    )}
                        
                    {isAuthenticated && (
                        isAdmin ? (
                            <>
                                <Link to="/mis-publicaciones" className="navbar__link">
                                    Publicaciones
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link to="/buscar" className="navbar__link">Explorar</Link>
                                <Link to="/mis-publicaciones" className="navbar__link">
                                    Mis publicaciones
                                </Link>

                                <Link to="/publicar" className="navbar__link">
                                    Publicar
                                </Link>
                            </>
                        )
                    )}
                </nav>
                

                <div className="navbar__auth hide-mobile">
                    {isAuthenticated ? (
                        <div className="navbar__user">
                            <Link to="/perfil" className="navbar__user-profile-link">
                                <img
                                    src={`/assets/${user.avatar || "avatar1.png"}`}
                                    alt={user.name}
                                    width={34} height={34}
                                    style={{ borderRadius: "50%", objectFit: "cover" }}
                                />
                                <span className="navbar__user-name">{user.name}</span>
                            </Link>
                            <button onClick={handleLogout} className="btn btn-outline" style={{ padding: "7px 16px" }}>
                                <LogOut size={15} /> Salir
                            </button>
                        </div>
                    ) : (
                        <>
                            <button onClick={onLoginClick} className="navbar__link">Iniciar sesión</button>
                            <button onClick={onRegisterClick} className="btn btn-primary" style={{ padding: "8px 18px" }}>
                                Registrarse
                            </button>
                        </>
                    )}
                </div>

                <div className="navbar__mobile-controls hide-desktop">
                    <Bell size={22} style={{ color: "var(--color-white)" }} />
                    {isAuthenticated ? (
                        <Link to="/perfil" style={{ display: "block" }}>
                            <img
                                src={`/assets/${user.avatar || "avatar1.png"}`}
                                alt={user.name}
                                width={32} height={32}
                                style={{ borderRadius: "50%", objectFit: "cover" }}
                            />
                        </Link>
                    ) : (
                        <button onClick={onLoginClick} style={{ color: "var(--color-white)", background: "none", border: "none" }}>
                            <User size={22} />
                        </button>
                    )}
                    <button onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--color-white)", background: "none", border: "none" }}>
                        {menuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {menuOpen && (
                <div className="navbar__mobile-menu">
                    {!isAuthenticated ?(
                        <Link to="/buscar" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                            <MapPin size={18} /> Explorar
                        </Link>
                    ) : (
                        <Link to="/perfil" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                                <User size={18} /> Mi Perfil
                        </Link>
                    )}

                    {isAuthenticated && (
                        isAdmin ? (
                        <>
                            <Link to="/mis-publicaciones" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                                    <BookOpen size={18} /> Publicaciones
                                </Link>
                            <Link to="/admin" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                                <Shield size={18} /> Panel Admin
                            </Link>
                        </>
                        ) : (
                            <>
                                <Link to="/buscar" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                                    <MapPin size={18} /> Explorar
                                </Link>
                                <Link to="/mis-publicaciones" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                                    <BookOpen size={18} /> Mis Publicaciones
                                </Link>
                                <Link to="/publicar" className="navbar__mobile-link" onClick={() => setMenuOpen(false)}>
                                    <PlusCircle size={18} /> Publicar
                                </Link>
                            </>
                        )
   
                    )}
             
                    {!isAuthenticated ? (
                        <>
                            <button className="navbar__mobile-link" onClick={() => { onLoginClick(); setMenuOpen(false); }}>
                                Iniciar sesión
                            </button>
                            <button className="navbar__mobile-link" onClick={() => { onRegisterClick(); setMenuOpen(false); }}>
                                Registrarse
                            </button>
                        </>
                    ) : (
                        <button className="navbar__mobile-link navbar__mobile-link--danger" onClick={handleLogout}>
                            <LogOut size={18} /> Cerrar sesión
                        </button>
                    )}
                </div>
            )}

            <style>{`
                .navbar { position: sticky; top: 0; z-index: 100; background: var(--color-white); border-bottom: 1px solid var(--color-border); box-shadow: var(--shadow-sm); }
                .navbar__inner { display: flex; align-items: center; justify-content: space-between; height: var(--navbar-height); gap: 24px; }
                .navbar__logo { display: flex; align-items: center; gap: 10px; font-size: 1.1rem; color: var(--color-text); white-space: nowrap; }
                .navbar__logo strong { color: var(--color-primary); }
                .navbar__links { display: flex; align-items: center; gap: 4px; flex: 1; }
                .navbar__link { padding: 6px 12px; border-radius: var(--radius-sm); font-size: var(--font-size-sm); font-weight: 500; color: var(--color-text-muted); transition: all var(--transition); background: none; border: none; cursor: pointer; }
                .navbar__link:hover { color: var(--color-primary); background: #F0FAFA; }
                .navbar__link--admin { color: var(--color-primary); font-weight: 700; }
                .navbar__auth { display: flex; align-items: center; gap: 12px; }
                .navbar__user { display: flex; align-items: center; gap: 16px; }
                .navbar__user-profile-link { display: flex; align-items: center; gap: 10px; transition: all var(--transition); }
                .navbar__user-profile-link:hover { color: var(--color-primary); opacity: 0.85; }
                .navbar__user-name { font-size: var(--font-size-sm); font-weight: 600; color: var(--color-text); }
                .navbar__mobile-controls { display: flex; align-items: center; gap: 16px; }
                @media (max-width: 768px) {
                    .navbar { background: var(--color-primary-dark); }
                    .navbar__logo { color: var(--color-white); }
                    .navbar__logo strong { color: #4DD9C0; }
                }
                .navbar__mobile-menu { background: var(--color-primary-dark); padding: 16px; display: flex; flex-direction: column; gap: 4px; }
                .navbar__mobile-link { display: flex; align-items: center; gap: 12px; padding: 12px 16px; border-radius: var(--radius-sm); color: rgba(255,255,255,0.85); font-size: var(--font-size-base); font-weight: 500; background: none; border: none; cursor: pointer; width: 100%; text-align: left; transition: background var(--transition); }
                .navbar__mobile-link:hover { background: rgba(255,255,255,0.1); color: var(--color-white); }
                .navbar__mobile-link--danger { color: #FCA5A5; }
            `}</style>
        </header>
    );
}
