import React, {useState, useEffect} from 'react'
import {TbCircleDotted } from "react-icons/tb";
import {CiCirclePlus} from "react-icons/ci";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { TbDotsVertical} from "react-icons/tb";
import Schedule from './schedule';

const Main = () => {
  // Add state for semester GPA
  const [cumulativeGPA, setCumulativeGPA] = useState('N/A');
  const [semesterGPA, setSemesterGPA] = useState('N/A');
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedSeason, setSelectedSeason] = useState('');
  const [selectedYear, setSelectedYear] = useState('');

  const initialTasks=[
    {name: "Complete Fafsa", complete: false},
    {name: "Advisement", complete: false},
    {name: "Sign up for internships", complete: false}
  ];

  const[gpa, setGpa] =useState();
  const[tasks, editTasks] =useState([]);
  const[opentask, openAddTask]=useState(false);
  const[newTask, setNewTask] =useState("");

  useEffect(()=>{
        fetchGPAs();
        fetchTasks();
    }, []);

  //GET GPA
  const fetchGPAs = async () => {
    try {
        // Fetch cumulative GPA
        const cumulativeResponse = await fetch('http://localhost:3000/api/profile/gpa', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        
        if (cumulativeResponse.ok) {
            const cumulativeData = await cumulativeResponse.json();
            setCumulativeGPA(cumulativeData.gpa || 'N/A');
        }

        // Get current term
        const year = new Date().getFullYear();
        const month = new Date().getMonth();
        const season = month >= 0 && month < 5 ? 'Spring' :
                      month >= 5 && month < 8 ? 'Summer' :
                      month >= 8 && month < 12 ? 'Fall' : 'Winter';
        
        setSelectedYear(year);
        setSelectedSeason(season);

        // Fetch semester GPA
        const semesterResponse = await fetch('http://localhost:3000/api/semesters', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (semesterResponse.ok) {
            const semesters = await semesterResponse.json();
            const currentSemester = semesters.find(sem => 
                sem.year === year.toString() && 
                sem.season.toLowerCase() === season.toLowerCase()
            );
            
            // Set semester GPA to N/A if no semester found or no GPA available
            setSemesterGPA(currentSemester?.semesterGPA ? 
                currentSemester.semesterGPA.toFixed(2) : 'N/A');
            setSelectedTerm(`${season} ${year}`);
        } else {
            setSemesterGPA('N/A');
        }
    } catch (err) {
        console.error("Error getting GPAs:", err);
        setCumulativeGPA('N/A');
        setSemesterGPA('N/A');
    }
};
  
  //GET TASKS
  const fetchTasks = async () => {
    try{
      const response= await fetch('http://localhost:3000/api/mainPage/getChecklist',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });
      if (!response.ok){
        throw new Error("Failed to fetch Tasks");
      }
      const newTasks = await response.json();
      editTasks(newTasks);

    } catch(err){
      console.error("Error getting Tasks: ", err);
      alert("Couldn't get get your Tasks");
    }
  };


//Add a Task
  const addATask= async ()=>{
    if (newTask.length<1){
      alert("No new task added. Too Few Arguments")
      openAddTask(false);
      return;
    }
    try{
      const response=await fetch('http://localhost:3000/api/mainPage/addToChecklist',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ taskname: newTask })
      });

      if (!response.ok){
        throw new Error("Failed to add Task");
      }

      const savedTask = await response.json();
      editTasks([...tasks, savedTask]);
      setNewTask("");
      openAddTask(false);
    } catch(err){
      console.error("Error adding Task: ", err);
      alert("Could not add task");
      setNewTask("");
      openAddTask(false);
    }
  };

//Mark a Task Complete/Incomplete
   const markComIncom=async(index)=>{
    const taskId=tasks[index]._id;
    try{
      const response=await fetch(`http://localhost:3000/api/checklist/${taskId}/toggle`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token',)
        }
      });
      if (!response.ok){
        throw new Error ("Failed to mark Task")
      }

      const updatedTask =await response.json();
    
      editTasks(prev =>
        prev.map((task, i) => (i === index? updatedTask : task))
      );

    } catch(err){
      console.error("Error marking Task", err);
      alert("Could not mark task.")
    }
  };

  //Delete a Task
  //Edit a Task

  const updateSemesterGPA = async (year, season) => {
    try {
        const semesterResponse = await fetch('http://localhost:3000/api/semesters', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (semesterResponse.ok) {
            const semesters = await semesterResponse.json();
            const selectedSemester = semesters.find(sem => 
                sem.year === year.toString() && 
                sem.season.toLowerCase() === season.toLowerCase()
            );
            
            // Capitalize season for display
            const capitalizedSeason = season.toUpperCase();
            
            setSemesterGPA(selectedSemester?.semesterGPA ? 
                selectedSemester.semesterGPA.toFixed(2) : 'N/A');
            setSelectedTerm(`${year} ${capitalizedSeason} TERM GPA`);
        } else {
            setSemesterGPA('N/A');
        }
    } catch (err) {
        setSemesterGPA('N/A');
    }
};

  return (
    <div className="w-full min-h-screen flex flex-wrap px-[5%] relative">
      <div className="w-1/3 pr-3 flex flex-col gap-3">
        {/* Cumulative GPA */}
        <div className="rounded-lg bg-[#F1DFB6] h-1/3">
          <h1 className="text-[#EF601E] font-bold text-2xl mt-3">CUMULATIVE GPA</h1>
          <div className="relative w-full h-48">
            <div className="absolute inset-0 z-10 flex items-center justify-center text-4xl sm:text-5xl md:text-8xl text-[#EF601E]">
              {cumulativeGPA || <div className="opacity-80 italic drop-shadow-md text-gray-500">NO GPA...</div>}
            </div>
          </div>
        </div>

        {/* Semester GPA */}
        <div className="rounded-lg bg-[#F1DFB6] h-1/4">
          <h1 className="text-[#EF601E] font-bold text-2xl mt-3">
            {selectedTerm || 'SELECT A SEMESTER'}
          </h1>
          <div className="relative w-full h-24 flex items-center justify-center">
            <div className="text-4xl text-[#EF601E]">
              {selectedTerm && semesterGPA !== 'N/A' ? Number(semesterGPA).toFixed(2) : ''}
            </div>
          </div>
        </div>

        {/* Checklist */}
        <div className="rounded-lg bg-[#9AAD82] h-auto" >
          <h1 className="text-[#D6E8F7] font-bold text-2xl mt-3">SEMESTER <br /> CHECKLIST</h1>
          <div className="p-5 w-full flex flex-wrap">
            <ul className="w-full text-left">
              {tasks.length > 0 ? tasks.map((task, index) => (
                <li key={index} className="pb-1 w-full text-lg text-[#D6E8F7]">
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-start gap-2 w-full max-w-[calc(100%-2rem)]">
                      {task.complete ? 
                      (<RiCheckboxCircleFill onClick={() => markComIncom(index)}className="text-2xl flex-shrink-0 cursor-pointer"/>) 
                      :
                      (<RiCheckboxBlankCircleLine onClick={() => markComIncom(index)} className="text-2xl flex-shrink-0 cursor-pointer"/>)
                      }
                      <span className="break-words w-full">{task.taskname}</span>
                    </div>
                    <TbDotsVertical className="text-xl cursor-pointer ml-2 flex-shrink-0" />
                  </div>
                </li>
              )) : 
              (<li className="text-xl text-[#D6E8F7] text-center">NO TASKS YET...</li>)
              }
            </ul>
        </div>

        {opentask && (
        <div className="bg-[#ac9cb6]  h-/15 w-full rounded-2xl p-1">
          <div>Add your Task</div>
          <textarea className="resize-none h-full w-full relative bg-amber-50 rounded-xl p-1 focus:outline-none focus:ring-1 focus:ring-[hsl(230,31%,78%)]" 
            placeholder='Fill out FAFSA..' 
            value={newTask}
            onChange={(e)=>setNewTask(e.target.value)}
          />
          <div className=" flex justify-center gap-2">
            <button className="bg-amber-100 w-1/3 rounded-2xl" onClick={addATask}>Add</button>
            <button className="bg-amber-100 w-1/3 rounded-2xl" onClick={()=>{openAddTask(false);setNewTask("");}}>Cancel</button>
          </div>
        </div>
      )}
          <button onClick={()=>openAddTask(true)} className="bg-[#D6E8F7] rounded-xl w-2/3 mx-10 my-3">ADD A TASK</button>
        </div>
      </div>

      {/*Schedule*/}
      <div className="w-2/3 rounded-lg bg-[#D6E8F7] p-2" >
        <h1 className="font-bold text-2xl mt-3">SCHEDULE</h1>
        <Schedule onSemesterChange={updateSemesterGPA}></Schedule>
      </div>
    </div>
  )
}

export default Main
