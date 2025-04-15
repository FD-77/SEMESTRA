import React from "react";
import { Link } from "react-router-dom";

import { GiThreeLeaves } from "react-icons/gi";
import { TbCalendarTime } from "react-icons/tb";
import { ImCalculator } from "react-icons/im";
import { FaRegUser } from "react-icons/fa";

const Navbar = () => {
    return (
        <header>
            <nav className="flex justify-between">
                <div>
                    <Link to="/">
                        <GiThreeLeaves />
                        <span>SEMESTRA</span>
                    </Link>
                </div>
                <div>
                    <TbCalendarTime />
                    <Link to="/classes">CLASSES</Link>
                </div>
                <div>
                    <ImCalculator />
                    <Link to="/gpaCalculator">GPA Calculator</Link>
                </div>
                <div>
                    <FaRegUser />
                    <Link to="/profile">Profile</Link>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;
