import React, {useState, useEffect} from 'react'
import {TbCircleDotted } from "react-icons/tb";
import {CiCirclePlus} from "react-icons/ci";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { TbDotsVertical} from "react-icons/tb";
import Schedule from './schedule';
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from 'react-router-dom'; // Add this import at the top

const Main = () => {
  const navigate = useNavigate(); // Add this hook
  const [hasClasses, setHasClasses] = useState(true); // Add this state
  // Add state for semester GPA
  const [cumulativeGPA, setCumulativeGPA] = useState('N/A');
  const [semesterGPA, setSemesterGPA] = useState('N/A');
  const [selectedTerm, setSelectedTerm] = useState('');

  const initialTasks=[
    {name: "Complete Fafsa", complete: false},
    {name: "Advisement", complete: false},
    {name: "Sign up for internships", complete: false}
  ];

  const[gpa, setGpa] =useState();
  const[tasks, editTasks] =useState([]);
  const[opentask, openAddTask]=useState(false);
  const[newTask, setNewTask] =useState("");
  const[editdel, setEdDel]=useState(null); 
  const [editingTask, setEditingTask] = useState(null); // Add this state

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token){
        fetchGPAs(); // Now matches the function name
        fetchTasks();
        checkForClasses(); // Add this line
    }
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

        setSemesterGPA('N/A');
        setSelectedTerm('');
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
      const response=await fetch(`http://localhost:3000/api/mainPage/checklist/${taskId}/toggle`,{
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
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
  const handleDeleteTask = async (taskId) => {
    try {
        const response = await fetch(`http://localhost:3000/api/mainPage/deleteFromChecklist/${taskId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });

        if (!response.ok) {
            throw new Error('Failed to delete task');
        }

        editTasks(tasks.filter(task => task._id !== taskId));
        setEdDel(null);
    } catch (err) {
        console.error("Error deleting task:", err);
        alert("Could not delete task");
    }
};

  //Edit a Task
  const handleEditTask = async (taskId, newName) => {
    try {
        const response = await fetch(`http://localhost:3000/api/mainPage/checklist/${taskId}/name`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
            body: JSON.stringify({ taskname: newName })
        });

        if (!response.ok) {
            throw new Error('Failed to update task');
        }

        const updatedTask = await response.json();
        editTasks(tasks.map(task => 
            task._id === taskId ? updatedTask : task
        ));
        setEditingTask(null);
        setEdDel(null);
    } catch (err) {
        console.error("Error updating task:", err);
        alert("Could not update task");
    }
};

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
  
  // Add this function to check for classes
  const checkForClasses = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/classes', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const classes = await response.json();
            setHasClasses(classes.length > 0);
        }
    } catch (err) {
        console.error("Error checking classes:", err);
    }
  };

  return (
    <div className="w-full min-h-screen flex flex-wrap px-[5%] relative">
      {!hasClasses && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
                        <h2 className="text-2xl font-bold mb-4">No Classes Found</h2>
                        <p className="text-gray-600 mb-6">
                            You need to add classes to access the schedule feature.
                        </p>
                        <button
                            onClick={() => navigate('/classes')}
                            className="bg-[#CAAACD] text-white px-6 py-3 rounded-full cursor-pointer hover:bg-purple-400"
                        >
                            Add Classes
                        </button>
                    </div>
                </div>
            )}
      {/* Left side - Reduced from w-1/3 to w-1/4 */}
      <div className="w-1/4 pr-3 flex flex-col gap-3">
        {/* Cumulative GPA */}
        <div className="rounded-lg bg-[#F1DFB6] min-h-[150px] h-[180px] p-4">
          <h1 className="text-[#EF601E] font-bold text-xl mb-2">CUMULATIVE GPA</h1> {/* Reduced text size */}
          <div className="flex items-center justify-center h-[calc(180px-4rem)]">
            <div className="bg-white rounded-full h-24 w-24 flex items-center justify-center shadow-md"> {/* Reduced circle size */}
              <div className="text-3xl font-bold text-[#EF601E]"> {/* Reduced text size */}
                {cumulativeGPA !== 'N/A' ? Number(cumulativeGPA).toFixed(2) : 
                  <div className="text-xl italic text-gray-400">N/A</div>
                }
              </div>
            </div>
          </div>
        </div>

        {/* Semester GPA */}
        {semesterGPA !== 'N/A' && selectedTerm && (
          <div className="rounded-lg bg-[#F1DFB6] min-h-[150px] h-[180px] p-4">
            <h1 className="text-[#EF601E] font-bold text-xl mb-2">{selectedTerm}</h1> {/* Reduced text size */}
            <div className="flex items-center justify-center h-[calc(180px-4rem)]">
              <div className="bg-white rounded-full h-24 w-24 flex items-center justify-center shadow-md"> {/* Reduced circle size */}
                <div className="text-3xl font-bold text-[#EF601E]"> {/* Reduced text size */}
                  {Number(semesterGPA).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Checklist section */}
        <div className="rounded-lg bg-[#9AAD82] h-auto">
          <h1 className="text-[#D6E8F7] font-bold text-xl mt-2">SEMESTER <br /> CHECKLIST</h1> {/* Reduced text size and top margin */}
          <div className="p-5 w-full flex flex-wrap">
            <ul className="w-full text-left">
              {tasks.length > 0 ? tasks.map((task, index) => (
                <li key={index} className=" relative pb-1 w-full text-lg text-[#D6E8F7]">
                  <div className="flex items-start justify-between w-full">
                    <div className="flex items-start gap-2 w-full max-w-[calc(100%-2rem)]">
                      {task.completed ? 
                      (<RiCheckboxCircleFill onClick={() => markComIncom(index)}className="text-2xl flex-shrink-0 cursor-pointer"/>) 
                      :
                      (<RiCheckboxBlankCircleLine onClick={() => markComIncom(index)} className="text-2xl flex-shrink-0 cursor-pointer"/>)
                      }
                      {editingTask === task._id ? (
                            <input
                                type="text"
                                className="flex-1 bg-white text-black rounded px-2 py-1"
                                value={task.taskname}
                                onChange={(e) => {
                                    editTasks(tasks.map(t => 
                                        t._id === task._id ? {...t, taskname: e.target.value} : t
                                    ));
                                }}
                                onBlur={() => handleEditTask(task._id, task.taskname)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        handleEditTask(task._id, task.taskname);
                                    } else if (e.key === 'Escape') {
                                        setEditingTask(null);
                                        setEdDel(null);
                                    }
                                }}
                                autoFocus
                            />
                        ) : (
                            <span className="break-words w-full">{task.taskname}</span>
                        )}
                    </div>
                    <TbDotsVertical onClick={()=>setEdDel(prev => prev === index ? null : index)} className="text-xl cursor-pointer ml-2 flex-shrink-0" />
                  </div>
                  {editdel ===index && (
                    <div className="bg-white text-black rounded p-2 mt-1 w-25 absolute right-0 z-10">
                    <button className="mx-2 items-center gap-2 flex cursor-pointer" onClick={() => setEditingTask(task._id)} > <FiEdit className="text-xl flex-shrink-0 "/>Edit</button>
                    <button className="mx-2 items-center gap-2 flex cursor-pointer" onClick={() => handleDeleteTask(task._id)}><RiDeleteBin6Line className="text-red-500 text-xl flex-shrink-0"/> Delete</button>
                  </div>
                  )}
                </li>
              )) : 
              (<li className="text-xl text-[#D6E8F7] text-center">NO TASKS YET...</li>)
              }
            </ul>
        </div>
        
        {/* Add task popup and button */}
        {opentask ? (
            <div className="bg-[#ac9cb6] h-/15 w-full rounded-2xl p-1">
                <div>Add your Task</div>
                <textarea 
                    className="resize-none h-full w-full relative bg-amber-50 rounded-xl p-1 focus:outline-none focus:ring-1 focus:ring-[hsl(230,31%,78%)]" 
                    placeholder='Fill out FAFSA..' 
                    value={newTask}
                    onChange={(e)=>setNewTask(e.target.value)}
                />
                <div className="flex justify-center gap-2">
                    <button className="bg-amber-100 w-1/3 rounded-2xl" onClick={addATask}>Add</button>
                    <button className="bg-amber-100 w-1/3 rounded-2xl" onClick={()=>{openAddTask(false);setNewTask("");}}>Cancel</button>
                </div>
            </div>
        ) : (
            <button 
                onClick={()=>openAddTask(true)} 
                className="bg-[#D6E8F7] rounded-xl w-2/3 mx-10 my-3"
            >
                ADD A TASK
            </button>
        )}
        </div>
      </div>

      {/* Schedule - Increased from w-2/3 to w-3/4 */}
      <div className="w-3/4 rounded-lg bg-[#D6E8F7] p-2">
        <h1 className="font-bold text-2xl mt-3">SCHEDULE</h1>
        <Schedule onSemesterChange={updateSemesterGPA}></Schedule>
      </div>
    </div>
  )
}

export default Main
