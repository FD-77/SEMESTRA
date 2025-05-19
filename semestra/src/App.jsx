import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar isLoggedIn={isLoggedIn} />
            <main className="flex-grow">
                <Outlet context={{ setIsLoggedIn }} />
            </main>
            <Footer />
        </div>
    );
}

export default App;
