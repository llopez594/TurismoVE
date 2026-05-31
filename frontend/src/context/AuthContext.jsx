import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { getToken, getUser, saveSession, clearSession } from "../utils/storage";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    const [loading, setLoading] = useState(true);

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
        return userData;
    }

    async function register(name, email, password, avatar = "avatar1.png") {
        const res = await api.post("/auth/register", { name, email, password, avatar });
        const { user: userData, token: tokenData } = res.data;
        setUser(userData);
        setToken(tokenData);
        saveSession(userData, tokenData);
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

    return (
        <AuthContext.Provider value={{
            user,
            token,
            loading,
            isAuthenticated: !!user,
            isAdmin: user?.role === "admin",
            login,
            register,
            logout,
            updateUser
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
