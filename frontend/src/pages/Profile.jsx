import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import UpdateNameForm from "../components/profile/UpdateNameForm";
import AvatarUpdate from "../components/profile/AvatarUpdate";
import ChangePasswordForm from "../components/profile/ChangePasswordForm";

export default function Profile() {
    const { user, isAuthenticated, isAdmin, loading: authLoading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (authLoading) return;
        if (!isAuthenticated) navigate("/");
    }, [isAuthenticated, authLoading, navigate]);

    if (authLoading) {
        return <div style={{ display: "flex", justifyContent: "center", padding: "80px" }}><div className="spinner" /></div>;
    }

    return (
        <div className="profile-page">
            <div className="container profile-page__inner">
                <aside className="user-sidebar">
                    <div className="user-sidebar__avatar-wrap">
                        <img src={`/assets/${user?.avatar || "avatar1.png"}`} alt={user?.name} width={64} height={64} style={{ borderRadius: "50%", objectFit: "cover" }} />
                    </div>
                    <h3 className="user-sidebar__name">{user?.name}</h3>
                    <p className="user-sidebar__email">{user?.email}</p>
                    <nav className="user-sidebar__nav">
                    {isAuthenticated && (
                        isAdmin ? (
                        <>
                            <Link to="/perfil" className="user-sidebar__link user-sidebar__link--active">Configuración de Perfil</Link>
                            <Link to="/mis-publicaciones" className="user-sidebar__link">Publicaciones </Link>
                        </>
                        ) : (
                        <>
                            <Link to="/perfil" className="user-sidebar__link user-sidebar__link--active">Configuración de Perfil</Link>
                            <Link to="/mis-publicaciones" className="user-sidebar__link">Mis Publicaciones </Link>
                            <Link to="/publicar" className="user-sidebar__link">Publicar Lugar / Experiencia </Link>
                        </>
                    )

                    )}
                    </nav>
                </aside>

                <main className="profile-page__main">
                    <div className="profile-page__header">
                        <h1>Configuracion de Perfil</h1>
                        <p>Gestiona tu información personal. </p>
                    </div>

                    <div className="profile-page__sections">
                        <UpdateNameForm />
                        <AvatarUpdate />
                        <ChangePasswordForm />
                    </div>
                </main>
            </div>

            <style>{`
                .user-sidebar { background: var(--color-white); border-radius: var(--radius-xl); box-shadow: var(--shadow); padding: 28px 24px; display: flex; flex-direction: column; align-items: center; text-align: center; gap: 8px; }
                .user-sidebar__name { font-size: var(--font-size-lg); font-weight: 700; color: var(--color-text); }
                .user-sidebar__email { font-size: var(--font-size-sm); color: var(--color-text-muted); margin-bottom: 8px; }
                .user-sidebar__nav { width: 100%; display: flex; flex-direction: column; gap: 4px; }
                .user-sidebar__link { display: block; padding: 10px 14px; border-radius: var(--radius); font-size: var(--font-size-sm); font-weight: 500; color: var(--color-text-muted); transition: all var(--transition); text-align: left; }
                .user-sidebar__link:hover { background: var(--color-bg-input); color: var(--color-primary); }
                .user-sidebar__link--active { background: #E8F5F5; color: var(--color-primary); font-weight: 700; }
                .profile-page { padding: 40px 0 64px; }
                .profile-page__inner { display: grid; grid-template-columns: 260px 1fr; gap: 40px; align-items: start; }
                .profile-page__header { margin-bottom: 28px; }
                .profile-page__header h1 { font-size: var(--font-size-2xl); font-weight: 800; color: var(--color-text); margin-bottom: 6px; }
                .profile-page__header p { font-size: var(--font-size-sm); color: var(--color-text-muted); }
                .profile-page__sections { display: flex; flex-direction: column; gap: 24px; }
                .profile-section { background: var(--color-white); border-radius: var(--radius-lg); box-shadow: var(--shadow); padding: 24px; }
                .profile-section__title { font-size: var(--font-size-base); font-weight: 700; color: var(--color-text); margin-bottom: 16px; }
                .profile-section__form { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
                .profile-section__form .input { flex: 1; min-width: 200px; }
                @media (max-width: 768px) { .profile-page__inner { grid-template-columns: 1fr; } }
            `}</style>
        </div>
    );
}
