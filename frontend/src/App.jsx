import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";

function ComingSoon({ name }) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "60vh",
            gap: "16px",
            color: "var(--color-text-muted)"
        }}>
            <span style={{ fontSize: "3rem" }}>🏗️</span>
            <h2 style={{ color: "var(--color-text)" }}>{name}</h2>
            <p>Esta página está en construcción.</p>
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>


                        <Route index element={<ComingSoon name="Home — Sprint 1" />} />

                        <Route path="buscar" element={<ComingSoon name="Buscar — Sprint 2" />} />
                        <Route path="lugares/:id" element={<ComingSoon name="Detalle — Sprint 2 " />} />

                        <Route path="publicar" element={<ComingSoon name="Publicar — Sprint 2" />} />
                        <Route path="mis-publicaciones" element={<ComingSoon name="Mis Publicaciones — Sprint 2" />} />

                        <Route path="perfil" element={<ComingSoon name="Perfil — Sprint 3" />} />

  
                        <Route path="admin" element={<ComingSoon name="Admin — Sprint 3" />} />

                        <Route path="*" element={<ComingSoon name="Página no encontrada" />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
