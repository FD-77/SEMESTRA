import React from "react";
import { Link } from "react-router-dom";

import { TbEditCircle } from "react-icons/tb";

const Classes = () => {
    const classes = [
        {
            classNo: "CSC 47300",
            name: "Web Site Design",
            href: "/",
            term: "2025 Spring Term",
            bgColor: "bg-red-200",
        },
        {
            classNo: "CSC 33200",
            name: "Operating Systems",
            href: "/",
            term: "2025 Spring Term",
            bgColor: "bg-green-200",
        },
        {
            classNo: "CSC 32200",
            name: "Software Engineering",
            href: "/",
            term: "2025 Spring Term",
            bgColor: "bg-blue-200",
        },
        {
            classNo: "CSC 38000",
            name: "Computer Security",
            href: "/",
            term: "2025 Spring Term",
            bgColor: "bg-yellow-200",
        },
        {
            classNo: "CSC 36000",
            name: "Modern Distribute Computing",
            href: "/",
            term: "2025 Spring Term",
            bgColor: "bg-pink-200",
        },
        {
            classNo: "CSC 44700",
            name: "Intro to Machine Learning",
            href: "/",
            term: "2025 Spring Term",
            bgColor: "bg-orange-200",
        },
    ];

    return (
        <main>
            <div className="max-w-full mx-auto my-10">
                <h1 className="text-5xl pb-10">Classes</h1>
                <div className="grid grid-cols-3 gap-4">
                    {classes.map((item) => (
                        <div
                            key={item.classNo}
                            className={`${item.bgColor} relative rounded-3xl py-16 space-y-4`}
                        >
                            <Link
                                to={item.href}
                                className="absolute top-4 right-4 cursor-pointer"
                            >
                                <TbEditCircle className="size-10" />
                            </Link>
                            <p className="text-3xl text-gray-800 font-bold">
                                {item.classNo}
                            </p>
                            <p className="text-2xl text-gray-700">
                                {item.name}
                            </p>
                            <p className="text-lg text-gray-600">{item.term}</p>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
};

export default Classes;
