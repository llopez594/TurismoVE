import { createContext, useContext, useState, useEffect, useRef } from "react";
import api from "../services/api";
import { getToken, getUser, saveSession, clearSession } from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

    // Modal de auth
    const [authModalOpen, setAuthModalOpen] = useState(false);
    const [authModalView, setAuthModalView] = useState("login");
    const onSuccessCallbackRef = useRef(null);

    useEffect(() => {
        const savedToken = getToken();
        const savedUser = getUser();
        if (savedToken && savedUser) {
            setToken(savedToken);
            setUser(savedUser);
        }
        setLoading(false);
    }, []);

    async function login(email, password) {
        const res = await api.post("/auth/login", { email, password });
        const { user: userData, token: tokenData } = res.data;
        setUser(userData);
        setToken(tokenData);
        saveSession(userData, tokenData);

        // Si hay un callback pendiente, ejecutarlo después del login
        if (onSuccessCallbackRef.current) {
            await onSuccessCallbackRef.current(userData);
            onSuccessCallbackRef.current = null;
        }

        return userData;
    }

    async function register(name, email, password, avatar = "avatar1.png") {
        const res = await api.post("/auth/register", { name, email, password, avatar });
        const { user: userData, token: tokenData } = res.data;
        setUser(userData);
        setToken(tokenData);
        saveSession(userData, tokenData);

        if (onSuccessCallbackRef.current) {
            await onSuccessCallbackRef.current(userData);
            onSuccessCallbackRef.current = null;
        }

        return userData;
    }

    function logout() {
        setUser(null);
        setToken(null);
        clearSession();
    }

    function updateUser(updatedData) {
        const updated = { ...user, ...updatedData };
        setUser(updated);
        saveSession(updated, token);
    }

    // Abre el modal de auth y registra un callback que se ejecuta tras login/registro exitoso
    function openAuthModal(view = "login", onSuccess = null) {
        onSuccessCallbackRef.current = onSuccess;
        setAuthModalView(view);
        setAuthModalOpen(true);
    }

    function closeAuthModal() {
        setAuthModalOpen(false);
        onSuccessCallbackRef.current = null;
    }

    return (
        <AuthContext.Provider value={{
            user, token, loading,
            isAuthenticated: !!user,
            isAdmin: user?.role === "admin",
            isContentCreator: user?.role === "content_creator",
            login, register, logout, updateUser,
            // Modal
            authModalOpen, authModalView,
            openAuthModal, closeAuthModal
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth debe usarse dentro de AuthProvider");
    return context;
}
