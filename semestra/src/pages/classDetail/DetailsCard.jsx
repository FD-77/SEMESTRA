import React from "react";

const DetailsCard = ({ details }) => {
    const formatTime = (time) => {
        if (!time) return "";
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const standardHour = hour % 12 || 12;
        return `${standardHour}:${minutes} ${ampm}`;
    };

    const formatSchedule = (schedule) => {
        if (!schedule || !Array.isArray(schedule) || schedule.length === 0) {
            return "No schedule available";
        }
        
        return schedule.map((slot, index) => {
            if (!slot.days || !slot.startTime || !slot.endTime) {
                return "";
            }
            const days = slot.days.map(day => day.charAt(0).toUpperCase() + day.slice(1)).join(", ");
            const startTime = formatTime(slot.startTime);
            const endTime = formatTime(slot.endTime);
            return `${days}: ${startTime} - ${endTime}`;
        }).filter(Boolean).join(" | ");
    };

    return (
        <div className="bg-blue-100 rounded-3xl p-4 md:p-6">
            <h2 className="text-xl md:text-2xl mb-2 md:mb-4">Class Details</h2>
            <div className="space-y-1 md:space-y-2 text-sm md:text-base text-left">
                <p>
                    <strong>Course Number:</strong> {details.classNo}
                </p>
                <p>
                    <strong>Class Name:</strong> {details.className}
                </p>
                <p>
                    <strong>Professor:</strong> {details.professor}
                </p>
                <p>
                    <strong>Class Times:</strong> {formatSchedule(details.schedule)}
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
