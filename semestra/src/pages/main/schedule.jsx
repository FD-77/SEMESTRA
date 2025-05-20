import { useState, useEffect } from "react";

const seasons = [
    { id: 'spring', name: 'Spring' },
    { id: 'summer', name: 'Summer' },
    { id: 'fall', name: 'Fall' },
    { id: 'winter', name: 'Winter' }
];

const years = Array.from({ length: 10 }, (_, i) => {
    const year = new Date().getFullYear() - 2 + i;
    return { id: year.toString(), name: year.toString() };
});

const Schedule = ({ onSemesterChange }) => {
    const dayofWeek=["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const times = [
    { slot: "08:00-08:30", actual: "8:00 AM - 8:30 AM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "08:30-09:00", actual: "8:30 AM - 9:00 AM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "09:00-09:30", actual: "9:00 AM - 9:30 AM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "09:30-10:00", actual: "9:30 AM - 10:00 AM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "10:00-10:30", actual: "10:00 AM - 10:30 AM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "10:30-11:00", actual: "10:30 AM - 11:00 AM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "11:00-11:30", actual: "11:00 AM - 11:30 AM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "11:30-12:00", actual: "11:30 AM - 12:00 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "12:00-12:30", actual: "12:00 PM - 12:30 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "12:30-13:00", actual: "12:30 PM - 1:00 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "13:00-13:30", actual: "1:00 PM - 1:30 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "13:30-14:00", actual: "1:30 PM - 2:00 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "14:00-14:30", actual: "2:00 PM - 2:30 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "14:30-15:00", actual: "2:30 PM - 3:00 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "15:00-15:30", actual: "3:00 PM - 3:30 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "15:30-16:00", actual: "3:30 PM - 4:00 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "16:00-16:30", actual: "4:00 PM - 4:30 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "16:30-17:00", actual: "4:30 PM - 5:00 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "17:00-17:30", actual: "5:00 PM - 5:30 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "17:30-18:00", actual: "5:30 PM - 6:00 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "18:00-18:30", actual: "6:00 PM - 6:30 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "18:30-19:00", actual: "6:30 PM - 7:00 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "19:00-19:30", actual: "7:00 PM - 7:30 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "19:30-20:00", actual: "7:30 PM - 8:00 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "20:00-20:30", actual: "8:00 PM - 8:30 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "20:30-21:00", actual: "8:30 PM - 9:00 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "21:00-21:30", actual: "9:00 PM - 9:30 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "21:30-22:00", actual: "9:30 PM - 10:00 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "22:00-22:30", actual: "10:00 PM - 10:30 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "22:30-23:00", actual: "10:30 PM - 11:00 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "23:00-23:30", actual: "11:00 PM - 11:30 PM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    { slot: "23:30-24:00", actual: "11:30 PM - 12:00 AM", bg: "EF601E", sun: [], mon: [], tue: [], wed: [], thu: [], fri: [], sat: [] },
    ];
 

    const [schedule, editSchedule] = useState(times);
    const [classes, editClasses] = useState([]);
    const [selectedYear, setSelectedYear] = useState('2025'); 
    const [selectedSeason, setSelectedSeason] = useState('spring');

    // Add this useEffect to trigger initial semester change
    useEffect(() => {
        const seasonName = seasons.find(s => s.id === selectedSeason)?.name;
        if (selectedYear && seasonName) {
            onSemesterChange(selectedYear, seasonName);
        }
    }, []); // Empty dependency array means this runs once on mount


    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            fetchClasses();
        }
        
    }, []);

    //get Classes
    const fetchClasses = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/classes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch classes");
        }
        const gotClasses = await response.json();
        
        // Filter classes by selected semester
        if (selectedYear && selectedSeason) {
            const termToMatch = `${selectedYear} ${selectedSeason.charAt(0).toUpperCase() + selectedSeason.slice(1)} Term`;
            const filteredClasses = gotClasses.filter(cls => cls.term === termToMatch);
            editClasses(filteredClasses);
        } else {
            editClasses([]); // No classes if no semester selected
        }
    } catch (err) {
        console.error("Error getting Classes: ", err);
        alert("Could not get your classes");
    }
};

// Update useEffect to run when semester selection changes
useEffect(() => {
    fetchClasses();
}, [selectedYear, selectedSeason]);


    useEffect(() => {
        // Reset schedule to initial state when semester changes
        editSchedule(times);
        
        console.log(schedule);
        const updatedSchedule = [...times]; // Use times instead of schedule to start fresh
    
        const getSlotIndex = (timeStr) => {
            let [hourStr, minuteAmPm] = timeStr.split(':');
            let minuteStr = minuteAmPm.substring(0, 2);
            let ampm = minuteAmPm.substring(2).trim().toUpperCase();
            let hour = parseInt(hourStr, 10);
            let minute = parseInt(minuteStr, 10);
    
            if (ampm === 'PM' && hour !== 12) {
                hour += 12;
            } else if (ampm === 'AM' && hour === 12) {
                hour = 0; // Midnight
            }
    
            const startTimeFirstSlot = schedule[0]?.slot?.split('-')[0];
            const startHourReference = startTimeFirstSlot ? parseInt(startTimeFirstSlot.split(':')[0], 10) : 8;
    
            let roundedMinute = Math.round(minute / 30) * 30;

            if (roundedMinute === 60) {
                roundedMinute = 0;
                hour = (hour + 1) % 24; 
            }

            const totalMinutes = (hour - startHourReference) * 60 + roundedMinute;
            const slotIndex = totalMinutes / 30;  // Each slot is 30 minutes

            return slotIndex;
        };
    
        classes.forEach(cls => {
            const {className}=cls;
            
            cls.schedule.forEach(scheduleEntry =>{
                const { startTime, endTime, days } = scheduleEntry; 
                let startIndex = getSlotIndex(startTime);
                let endIndex = getSlotIndex(endTime);
                const [endHourStr] = endTime.split(':');
                const endHour = parseInt(endHourStr.split(' ')[0], 10);
                const endMinStr = endTime.split(':')[1]?.substring(0, 2) || '0';
                const endMin = parseInt(endMinStr, 10);

                if (endMin === 0) {
                    endIndex -= (endHour > (times[0]?.slot?.split('-')[0]?.split(':')[0] || 8) ? 0 : 0);
                } else if (endMin === 45) {
                    endIndex += 1;
                } else if (endMin === 15) {
                    endIndex -= 1;
                }

                days.forEach(day => {
                    const dayLower = day.toLowerCase().substring(0, 3);
                    for (let i = startIndex; i < endIndex; i++) {
                        if (updatedSchedule[i] && updatedSchedule[i].hasOwnProperty(dayLower)) {
                            if (i === startIndex) {
                                updatedSchedule[i][dayLower] = [true, className]; // Mark start + store name
                            } 
                            else {
                                updatedSchedule[i][dayLower] = [className]; // Normal timeslot
                            }
                        }    
                    }
                });
            })       
    
            
        });
        editSchedule(updatedSchedule);
    }, [classes, selectedYear, selectedSeason]); // Add selectedYear and selectedSeason as dependencies
      
    const firstClassIndex = schedule.findIndex(timeSlot =>
        ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'].some(day => timeSlot[day].length > 0)
    );
  const visibleSchedule = schedule.slice(firstClassIndex);
  return (
      <>
      {/* Add semester selector */}
      <div className="flex gap-4 mb-4">
    <select 
        value={selectedYear}
        onChange={(e) => {
            setSelectedYear(e.target.value);
            if (selectedSeason && e.target.value) {
                const seasonName = seasons.find(s => s.id === selectedSeason)?.name;
                onSemesterChange(e.target.value, seasonName);
            }
        }}
        className="flex-1 p-2 border rounded-md text-gray-700"
    >
        <option value="">Select Year</option>
        {years.map(year => (
            <option key={year.id} value={year.id}>
                {year.name}
            </option>
        ))}
    </select>
    <select
        value={selectedSeason}
        onChange={(e) => {
            setSelectedSeason(e.target.value);
            if (selectedYear && e.target.value) {
                // Find the season object and use its name instead of id
                const seasonName = seasons.find(s => s.id === e.target.value)?.name;
                onSemesterChange(selectedYear, seasonName);
            }
        }}
        className="flex-1 p-2 border rounded-md text-gray-700"
    >
        <option value="">Select Season</option>
        {seasons.map(season => (
            <option key={season.id} value={season.id}>
                {season.name}
            </option>
        ))}
    </select>
</div>

      {/* Existing table code */}
      <div className='overflow-x-auto rounded-lg shadow-md'>
  <table className="min-w-full leading-normal">
      <thead>
          <tr className="bg-gray-100 text-gray-700">
              <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-[#EF601E]">Time</th>
              {dayofWeek.map(day => (
                  <th key={day} className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wider text-[#EF601E]">{day}</th>
              ))}
          </tr>
      </thead>
      <tbody>
          {(!selectedYear || !selectedSeason) ? (
  <tr><td colSpan="8" className="text-center py-4 text-xl text-gray-500 italic">
      Please select a semester...
  </td></tr>
) : classes.length === 0 ? (
  <tr><td colSpan="8" className="text-center py-4 text-xl text-gray-500 italic">
      No classes in this semester...
  </td></tr>
) : (
  visibleSchedule.map((timeSlot, index) => (
      <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <th className="px-4 py-2 text-left text-sm font-medium text-gray-900">{timeSlot.actual}</th>
                  <td className={`px-4 py-2 text-center text-sm ${timeSlot.sun[0] ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600'}`}>
                      {timeSlot.sun[1] ? timeSlot.sun[1] : ''} 
                  </td>
                  <td className={`px-4 py-2 text-center text-sm ${timeSlot.mon[0] ? 'bg-yellow-100 text-yellow-700 font-semibold' : 'text-gray-600'}`}>
                      {timeSlot.mon[1] ? timeSlot.mon[1] : ''}
                  </td>
                  <td className={`px-4 py-2 text-center text-sm ${timeSlot.tue[0] ? 'bg-blue-100 text-blue-700 font-semibold' : 'text-gray-600'}`}>
                      {timeSlot.tue[1] ? timeSlot.tue[1] : ''}
                  </td>
                  <td className={`px-4 py-2 text-center text-sm ${timeSlot.wed[0] ? 'bg-purple-100 text-purple-700 font-semibold' : 'text-gray-600'}`}>
                      {timeSlot.wed[1] ? timeSlot.wed[1] : ''}
                  </td>
                  <td className={`px-4 py-2 text-center text-sm ${timeSlot.thu[0] ? 'bg-teal-100 text-teal-700 font-semibold' : 'text-gray-600'}`}>
                      {timeSlot.thu[1] ? timeSlot.thu[1] : ''}
                  </td>
                  <td className={`px-4 py-2 text-center text-sm ${timeSlot.fri[0] ? 'bg-red-100 text-red-700 font-semibold' : 'text-gray-600'}`}>
                      {timeSlot.fri[1] ? timeSlot.fri[1] : ''}
                  </td>
                  <td className={`px-4 py-2 text-center text-sm ${timeSlot.sat[0] ? 'bg-green-100 text-green-700 font-semibold' : 'text-gray-600'}`}>
                      {timeSlot.sat[1] ? timeSlot.sat[1] : ''}
                  </td>
              </tr>
  ))
)}
      </tbody>
  </table>
</div>
      </>
  )
};export default Schedule;