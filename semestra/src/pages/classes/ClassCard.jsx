import React from "react";
import { Link } from "react-router-dom";

import { TbEditCircle, TbTrash } from "react-icons/tb";

const ClassCard = ({ classData, onEditClass, onDeleteClass }) => {
    return (
        <div
            key={classData.classNo}
            className={`${classData.bgColor} relative rounded-3xl py-16 space-y-4`}
        >
            <div className="absolute top-4 right-4 flex gap-2">
                <TbEditCircle
                    className="size-10 cursor-pointer hover:text-blue-600"
                    onClick={() => onEditClass(classData)}
                />

                <TbTrash
                    className="size-10 cursor-pointer hover:text-red-600"
                    onClick={() => onDeleteClass(classData.id)}
                />
            </div>

            <Link to={`/classes/${classData.id}`} className="">
                <p className="text-3xl text-gray-800 font-bold">
                    {classData.classNo}
                </p>
                <p className="text-2xl text-gray-700">{classData.className}</p>
                <p className="text-lg text-gray-600">{classData.term}</p>
            </Link>
        </div>
    );
};

export default ClassCard;
