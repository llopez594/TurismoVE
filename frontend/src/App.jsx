import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

function ComingSoon({ name }) {

}

export default function App() {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>

                        <Route index element={<Home />} />

                        <Route path="buscar" element={<ComingSoon name="Buscar" />} />
                        <Route path="lugares/:id" element={<ComingSoon name="Detalle" />} />

                        <Route path="publicar" element={<ComingSoon name="Publicar — Sprint 2" />} />
                        <Route path="mis-publicaciones" element={<ComingSoon name="Mis Publicaciones" />} />

                        <Route path="perfil" element={<ComingSoon name="Perfil" />} />


                        <Route path="admin" element={<ComingSoon name="Admin" />} />

                        <Route path="*" element={<ComingSoon name="Página no encontrada" />} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
