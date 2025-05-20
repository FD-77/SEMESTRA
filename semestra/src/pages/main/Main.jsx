import React, {useState, useEffect} from 'react'
import {TbCircleDotted } from "react-icons/tb";
import {CiCirclePlus} from "react-icons/ci";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { TbDotsVertical} from "react-icons/tb";
import Schedule from './schedule';

const Main = () => {

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
        fetchGPA();
        fetchTasks();
    }, []);

  //GET GPA
  const fetchGPA = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/profile/gpa', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        });
        if (!response.ok) {
            throw new Error("Failed to fetch GPA");
        }
        const data = await response.json();
        setGpa(data.gpa || 'N/A');
    } catch (err) {
        console.error("Error getting GPA: ", err);
        setGpa('N/A');
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


  return (
    <div className="w-full min-h-screen flex flex-wrap px-[5%] relative">
      <div className="w-1/3 pr-3 flex flex-col gap-3 ">
      {/*GPA*/}
        <div className="rounded-lg bg-[#F1DFB6] h-1/3">
          <h1 className="text-[#EF601E] font-bold text-2xl mt-3">CUMULATIVE GPA</h1>
          <div className="relative w-full h-64">
            <div className="absolute inset-0 z-10 flex items-center justify-center text-4xl sm:text-5xl md:text-8xl  text-[#EF601E] ">{gpa ? gpa: <div className="opacity-80 italic drop-shadow-md text-gray-500">NO GPA...</div>}</div>
          </div> 
        </div>

        {/*Checklist*/}
        <div className=" rounded-lg bg-[#9AAD82] h-auto" >
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
        <h1 className=" font-bold text-2xl mt-3 ">SCHEDULE</h1>
        <Schedule></Schedule>
      </div>
    </div>
  )
}

export default Main
