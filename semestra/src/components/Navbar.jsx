import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <header>
            <nav className="flex justify-between">
                <div>
                    <Link to="/">SEMESTRA</Link>
                </div>
                <div>
                    <Link to="/classes">CLASSES</Link>
                </div>
                <div>
                    <Link to="/gpaCalculator">GPA Calculator</Link>
                </div>
                <div>
                    <Link to="/profile">Profile</Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
