import React from "react";

const GradeCard = ({ grade }) => {
    return (
        <div className="bg-purple-200 rounded-3xl p-4 md:p-6">
            <h2 className="text-xl md:text-2xl mb-2 md:mb-4">Class Grade</h2>
            <div className="text-4xl md:text-6xl font-bold">{grade}</div>
        </div>
    );
};

export default GradeCard;
