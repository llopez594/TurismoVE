import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import PlaceDetail from "./pages/PlaceDetail";
import PublishPlace from "./pages/PublishPlace";
import MyPublications from "./pages/MyPublications";
import Profile from "./pages/Profile";

function NotFound() {
    return (
        <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", minHeight: "60vh", gap: "16px",
            color: "var(--color-text-muted)"
        }}>
            <span style={{ fontSize: "3rem" }}>🔍</span>
            <h2 style={{ color: "var(--color-text)" }}>Página no encontrada</h2>
            <p>La página que buscas no existe.</p>
            <a href="/" style={{ color: "var(--color-primary)", fontWeight: 700 }}>Volver al inicio</a>
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="buscar" element={<Search />} />
                        <Route path="lugares/:id" element={<PlaceDetail />} />
                        <Route path="publicar" element={<PublishPlace />} />
                        <Route path="mis-publicaciones" element={<MyPublications />} />
                        <Route path="perfil" element={<Profile />} />
                        <Route path="admin" element={<ComingSoon name="Admin" />} />
                        <Route path="*" element={<NotFound />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
