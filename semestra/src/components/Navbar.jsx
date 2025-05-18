import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiThreeLeaves } from "react-icons/gi";
import { TbCalendarTime } from "react-icons/tb";
import { ImCalculator } from "react-icons/im";
import { FaRegUser } from "react-icons/fa";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";

const navigation = [
    { name: "CLASSES", href: "/classes", icon: TbCalendarTime },
    { name: "GPA Calculator", href: "/gpaCalculator", icon: ImCalculator },
    { name: "Profile", href: "/profile", icon: FaRegUser },
    { name: "Login", href: "/login", icon: FaRegUser },
];

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="relative">
            <nav className="p-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link to="/" className="flex items-center space-x-2">
                        <GiThreeLeaves className="inline-block size-8 md:size-12 text-purple-300" />
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
                    <div className="hidden lg:flex lg:flex-1 lg:justify-between lg:items-center lg:pl-8">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className="flex items-center space-x-2 px-6 py-4 bg-purple-300 text-white rounded-full hover:bg-purple-400"
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
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center space-x-2 px-4 py-3 bg-purple-300 text-white rounded-full hover:bg-purple-400 transition-colors"
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
