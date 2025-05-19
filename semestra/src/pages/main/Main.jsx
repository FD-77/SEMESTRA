import React, {useState, useEffect, use} from 'react'
import {TbCircleDotted } from "react-icons/tb";
import {CiCirclePlus} from "react-icons/ci";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri";
import Schedule from './schedule';


const Main = () => {


  const initialTasks=[
    {name: "Complete Fafsa", complete: false},
    {name: "Advisement", complete: false},
    {name: "Sign up for internships", complete: false}
  ];

  const[gpa, getGpa] =useState(3.9);
  const[tasks, editTasks] =useState(initialTasks);
  const [task, addTask]=useState(false);
  const[newTask, setNewTask] =useState("");

  const markComIncom=(index)=>{
    const tempTasks=[...schedule];
    console.log("INDEX is", index)
    tempTasks[index].complete=!tempTasks[index].complete;
    editTasks(tempTasks);
  }

  const openAddTask = ()=>{
    addTask(true);
  }

  const closeaddTask=()=>{
    addTask(false);
  }

  const addATask=()=>{
    if (newTask.length<1){
      alert("No new task added. Too Few Arguments")
      closeaddTask();
    }
    else{
      const neww={name: newTask, complete: false};
    editTasks([...tasks, neww]);
    setNewTask("");
    closeaddTask();
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-wrap px-[5%] relative">
      <div className="w-1/3 pr-3 flex flex-col gap-3 ">
      {/*GPA*/}
        <div className="rounded-lg bg-[#F1DFB6] h-1/3">
          <h1 className="text-[#EF601E] font-bold text-2xl mt-3">GPA</h1>
          <div className="relative w-full h-64">
            <div className="absolute inset-0 z-10 flex items-center justify-center text-4xl sm:text-5xl md:text-8xl  text-[#EF601E]">{gpa}</div>
            <TbCircleDotted className='w-full h-full text-[#FDF3DD]'></TbCircleDotted>
          </div> 
        </div>

        {/*Checklist*/}
        <div className=" rounded-lg bg-[#9AAD82] h-auto" >
          <h1 className="text-[#D6E8F7] font-bold text-2xl mt-3">SEMESTER <br /> CHECKLIST</h1>
          <div className="p-5"> 
            <ul className="text-left">
              {tasks.map((task, index) => (
                  <li className="pb-1 flex items-start gap-2 text-lg text-[#D6E8F7]" key={index}> 
                    {task.complete ? <RiCheckboxCircleFill  onClick = {()=>markComIncom(index)} className="text-2xl flex-shrink-0 cursor-pointer" /> 
                    : <RiCheckboxBlankCircleLine onClick = {()=>markComIncom(index)} className="text-2xl flex-shrink-0 cursor-pointer"/>}
                    {task.name}</li>
              ))} 
            </ul>
          </div>
          {task && (
        <div className="bg-[#ac9cb6]  h-/15 w-full rounded-2xl p-1">
          <div>Add your Task</div>
          <textarea className="resize-none h-full w-full relative bg-amber-50 rounded-xl p-1 focus:outline-none focus:ring-1 focus:ring-[hsl(230,31%,78%)]" 
            placeholder='Fill out FAFSA..' 
            value={newTask}
            onChange={(e)=>setNewTask(e.target.value)}
          />
          <div className=" flex justify-center gap-2">
            <button className="bg-amber-100 w-1/3 rounded-2xl" onClick={addATask}>Add</button>
            <button className="bg-amber-100 w-1/3 rounded-2xl" onClick={closeaddTask}>Cancel</button>
          </div>
        </div>
      )}
          <button onClick={addTask} className="bg-[#D6E8F7] rounded-xl w-2/3 mx-10 my-3">ADD A TASK</button>
        </div>
      </div>

      {/*Schedule*/}
      <div className="w-2/3  rounded-lg bg-[#D6E8F7] p-2" >
        <h1 className=" font-bold text-2xl mt-3 ">SCHEDULE</h1>
        <Schedule></Schedule>
      </div>
    </div>
  )
}

export default Main
