import React from "react";

const DetailsCard = ({ details }) => {
    return (
        <div className="bg-blue-100 rounded-3xl p-4 md:p-6">
            <h2 className="text-xl md:text-2xl mb-2 md:mb-4">Class Details</h2>
            <div className="space-y-1 md:space-y-2 text-sm md:text-base text-left">
                <p>
                    <strong>Class No.:</strong> {details.classNo}
                </p>
                <p>
                    <strong>Class Name:</strong> {details.className}
                </p>
                <p>
                    <strong>Professor:</strong> {details.professor}
                </p>
                <p>
                    <strong>Class Times:</strong> {details.classTimes}
                </p>
                <p>
                    <strong>Room:</strong> {details.room}
                </p>
                <p>
                    <strong>Credits:</strong> {details.credits}
                </p>
                <p>
                    <strong>Term:</strong> {details.term}
                </p>
            </div>
        </div>
    );
};

export default DetailsCard;
