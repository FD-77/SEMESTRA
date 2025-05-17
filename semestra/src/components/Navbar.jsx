import React from "react";
import { Link } from "react-router-dom";

import { GiThreeLeaves } from "react-icons/gi";
import { TbCalendarTime } from "react-icons/tb";
import { ImCalculator } from "react-icons/im";
import { FaRegUser } from "react-icons/fa";

const navigation = [
    { name: "CLASSES", href: "/classes", icon: TbCalendarTime },
    { name: "GPA Calculator", href: "/gpaCalculator", icon: ImCalculator },
    { name: "Profile", href: "/profile", icon: FaRegUser },
    { name: "Login", href: "/login", icon:FaRegUser },
];

const Navbar = () => {
    return (
        <header>
            <nav className="flex justify-between items-center">
                <div>
                    <Link to="/" className="flex items-center space-x-2">
                        <GiThreeLeaves className="inline-block size-12 text-purple-300" />
                        <span className="text-3xl font-bold font-mono">
                            SEMESTRA
                        </span>
                    </Link>
                </div>
                {navigation.map((item) => (
                    <div key={item.name}>
                        <Link
                            to={item.href}
                            className="flex items-center space-x-2 px-6 py-4 bg-purple-300 text-white rounded-full hover:bg-purple-400"
                        >
                            <item.icon className="inline-block size-12" />
                            <span className="text-2xl font-bold">
                                {item.name}
                            </span>
                        </Link>
                    </div>
                ))}

            </nav>
        </header>
    );
};

export default Navbar;
