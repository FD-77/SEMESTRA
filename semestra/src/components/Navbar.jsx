import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiThreeLeaves } from "react-icons/gi";
import { TbCalendarTime } from "react-icons/tb";
import { ImCalculator } from "react-icons/im";
import { FaRegUser } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";

const Navbar = ({ isLoggedIn }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
    };

    // Move base navigation into auth-dependent routes
    const navigation = isLoggedIn 
        ? [
            { name: "CLASSES", href: "/classes", icon: TbCalendarTime },
            { name: "GPA Calculator", href: "/gpaCalculator", icon: ImCalculator },
            { name: "Profile", href: "/profile", icon: FaRegUser },
            { name: "Sign Out", href: "#", icon: BiLogOut, onClick: handleLogout }
        ]
        : [
            { name: "Login", href: "/login", icon: FaRegUser },
            { name: "Sign Up", href: "/register", icon: FaRegUser }
        ];

    return (
        <header className="relative">
            <nav className="p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <GiThreeLeaves className="inline-block size-8 md:size-12 text-[#CAAACD]" />
                        <span className="text-xl md:text-3xl font-bold font-mono">
                            SEMESTRA
                        </span>
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="lg:hidden text-gray-600 hover:text-gray-900"
                    >
                        {isMenuOpen ? (
                            <RiCloseLine className="size-8" />
                        ) : (
                            <RiMenu3Line className="size-8" />
                        )}
                    </button>

                    {/* Desktop navigation */}
                    <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:pl-8 lg:gap-5">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={item.onClick}
                                className="flex items-center space-x-2 px-6 py-4 bg-[#CAAACD] text-white rounded-full hover:bg-purple-300"
                            >
                                <item.icon className="inline-block size-12" />
                                <span className="text-2xl font-bold">
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Mobile navigation */}
                {isMenuOpen && (
                    <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-lg p-4 lg:hidden space-y-2 z-50">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                onClick={(e) => {
                                    setIsMenuOpen(false);
                                    item.onClick && item.onClick(e);
                                }}
                                className="flex items-center space-x-2 px-4 py-3 bg-[#CAAACD] text-white rounded-full hover:bg-purple-300 transition-colors"
                            >
                                <item.icon className="inline-block size-6" />
                                <span className="text-lg font-bold">
                                    {item.name}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navbar;
