import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

// AuthModal se importará cuando Carlos lo construya en Sprint 1
// import AuthModal from "../auth/AuthModal";

export default function Layout() {
    const [authOpen, setAuthOpen] = useState(false);
    const [authView, setAuthView] = useState("login");

    function openLogin() {
        setAuthView("login");
        setAuthOpen(true);
    }

    function openRegister() {
        setAuthView("register");
        setAuthOpen(true);
    }

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar
                onLoginClick={openLogin}
                onRegisterClick={openRegister}
            />

            <main style={{ flex: 1 }}>
                <Outlet />
            </main>

            <Footer />

            {/* AuthModal se descomenta cuando Carlos termine Sprint 1 */}
            {/* <AuthModal
                isOpen={authOpen}
                onClose={() => setAuthOpen(false)}
                initialView={authView}
            /> */}
        </div>
    );
}
