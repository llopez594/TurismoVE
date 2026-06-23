import { useState } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AuthModal from "../auth/AuthModal";
import ChatWidget from "../chatbot/ChatWidget";
import { useAuth } from "../../context/AuthContext";

export default function Layout() {
    const { authModalOpen, authModalView, closeAuthModal, openAuthModal } = useAuth();

    function openLogin() {
        openAuthModal("login");
    }

    function openRegister() {
        openAuthModal("register");
    }

    return (
        <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
            <Navbar onLoginClick={openLogin} onRegisterClick={openRegister} />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            <Footer />
            <AuthModal
                isOpen={authModalOpen}
                onClose={closeAuthModal}
                initialView={authModalView}
            />
            <ChatWidget />
        </div>
    );
}
