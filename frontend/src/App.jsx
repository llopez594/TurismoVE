import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Search from "./pages/Search";
import PlaceDetail from "./pages/PlaceDetail";


function ComingSoon({ name }) {

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
                        <Route path="publicar" element={<ComingSoon name="Publicar" />} />
                        <Route path="mis-publicaciones" element={<ComingSoon name="Mis Publicaciones" />} />
                        <Route path="perfil" element={<ComingSoon name="Perfil — Sprint" />} />
                        <Route path="admin" element={<ComingSoon name="Admin — Sprint" />} />
                        <Route path="*" element={<ComingSoon name="Página no encontrada" />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
}
