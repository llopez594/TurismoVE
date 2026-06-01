import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

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

        </div>
    );
}
