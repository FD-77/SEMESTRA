import React, {useState} from 'react'
import {TbCircleDotted } from "react-icons/tb";
import {CiCirclePlus} from "react-icons/ci";
import { RiCheckboxBlankCircleLine } from "react-icons/ri";
import { RiCheckboxCircleFill } from "react-icons/ri";




const Main = () => {

  const [task, addTask]=useState(false);

  const openAddTask = ()=>{
    addTask(true);
  }

  const closeaddTask=()=>{
    addTask(false);
  }

  const addATask=()=>{
    //add the task to table
    closeaddTask();
  }
//will eventually get from backend
  const times = [
    { slot: "08:00-08:30", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false },
    { slot: "08:30-09:00", bg: "EF601E", sun: false, mon: true, tue: false, wed: true, thu: false, fri: false, sat: false },
    { slot: "09:00-09:30", bg: "EF601E", sun: false, mon: true, tue: false, wed: true, thu: false, fri: false, sat: false },
    { slot: "09:30-10:00", bg: "EF601E", sun: false, mon: true, tue: false, wed: true, thu: false, fri: false, sat: false },
    { slot: "10:00-10:30", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false },
    { slot: "10:30-11:00", bg: "EF601E", sun: true, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false },
    { slot: "11:00-11:30", bg: "EF601E", sun: true, mon: false, tue: false, wed: false, thu: false, fri: true, sat: false },
    { slot: "11:30-12:00", bg: "EF601E", sun: true, mon: false, tue: false, wed: false, thu: false, fri: true, sat: false },
    { slot: "12:00-12:30", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: true, sat: false },
    { slot: "12:30-13:00", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false },
    { slot: "13:00-13:30", bg: "EF601E", sun: false, mon: false, tue: true, wed: false, thu: true, fri: false, sat: false },
    { slot: "13:30-14:00", bg: "EF601E", sun: false, mon: false, tue: true, wed: false, thu: true, fri: false, sat: false },
    { slot: "14:00-14:30", bg: "EF601E", sun: false, mon: false, tue: true, wed: false, thu: true, fri: false, sat: false },
    { slot: "14:30-15:00", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false },
    { slot: "15:00-15:30", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: true },
    { slot: "15:30-16:00", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: true },
    { slot: "16:00-16:30", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: true },
    { slot: "16:30-17:00", bg: "EF601E", sun: false, mon: true, tue: false, wed: true, thu: false, fri: false, sat: false },
    { slot: "17:00-17:30", bg: "EF601E", sun: false, mon: true, tue: false, wed: true, thu: false, fri: false, sat: false },
    { slot: "17:30-18:00", bg: "EF601E", sun: false, mon: true, tue: false, wed: true, thu: false, fri: false, sat: false },
    { slot: "18:00-18:30", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: true, sat: false },
    { slot: "18:30-19:00", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: true, sat: false },
    { slot: "19:00-19:30", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: true, sat: false },
    { slot: "19:30-20:00", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false },
    { slot: "20:00-20:30", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false },
    { slot: "20:30-21:00", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false },
    { slot: "21:00-21:30", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false },
    { slot: "21:30-22:00", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false },
    { slot: "22:00-22:30", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false },
    { slot: "22:30-23:00", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false },
    { slot: "23:00-23:30", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false },
    { slot: "23:30-24:00", bg: "EF601E", sun: false, mon: false, tue: false, wed: false, thu: false, fri: false, sat: false },
  ];
  //will get from backend, will also add checked/not
  const tasks=["Complete Fafsa", "Advisement", "Sign up for internships"];
  let gpa=3.9;

  return (
    <div className="w-full min-h-screen flex flex-wrap p-3 relative">
      
      {task && (
        <div className="bg-[#ac9cb6] absolute z-10 top-1/3 left-1/3 h-/15 w-1/3 rounded-2xl p-1">
          <div>Add your Task</div>
          <textarea className="resize-none h-full w-full relative bg-amber-50 rounded-xl p-1 focus:outline-none focus:ring-1 focus:ring-[hsl(230,31%,78%)]" placeholder='Fill out FAFSA..' />
          <div className=" flex justify-center gap-2">
            <button className="bg-amber-100 w-1/3 rounded-2xl" onClick={addATask}>Add</button>
            <button className="bg-amber-100 w-1/3 rounded-2xl" onClick={closeaddTask}>Cancel</button>
          </div>
        </div>
      )}

      <div className="w-1/3 pr-3 flex flex-col gap-3">
      {/*GPA*/}
        <div className="rounded-lg bg-[#F1DFB6] h-1/3">
          <h1 className="text-[#EF601E] font-bold text-2xl mt-3">GPA</h1>
          <div className="relative w-full h-64">
            <div className="absolute inset-0 z-10 flex items-center justify-center text-4xl sm:text-5xl md:text-8xl  text-[#EF601E]">{gpa}</div>
            <TbCircleDotted className='w-full h-full text-[#FDF3DD]'></TbCircleDotted>
          </div> 
        </div>

        {/*Checklist*/}
        <div className=" rounded-lg bg-[#9AAD82] h-2/3" >
          <h1 className="text-[#D6E8F7] font-bold text-2xl mt-3">SEMESTER <br /> CHECKLIST</h1>
          <div className="p-5"> 
            <ul className="text-left">
              {tasks.map((task, index) => (
                  <li className="pb-1 flex items-center gap-2 text-lg text-[#D6E8F7]" key={index}> <RiCheckboxBlankCircleLine className="text-2xl"/>{task}</li>
              ))} 
            </ul>
          </div>
          <button onClick={addTask} className="bg-[#D6E8F7] rounded-xl w-2/3 mx-10 ">ADD A TASK</button>
        </div>
      </div>

      {/*Schedule*/}
      <div className="w-2/3  rounded-lg bg-[#D6E8F7] p-2" >
        <h1 className=" font-bold text-2xl mt-3 ">SCHEDULE</h1>
        <div className='p-2'> 
          <div className="flex w-full">
            <div className="flex-1 border border-[#778ebe] bg-[#c2cbdf] p-1 text-xs">Time</div>
            <div className="flex-1 border border-[#778ebe] bg-[#c2cbdf] p-1 text-xs">Sunday</div>
            <div className="flex-1 border border-[#778ebe] bg-[#c2cbdf] p-1 text-xs">Monday</div>
            <div className="flex-1 border border-[#778ebe] bg-[#c2cbdf] p-1 text-xs" >Tuesday</div>
            <div className="flex-1 border border-[#778ebe] bg-[#c2cbdf] p-1 text-xs"> Wednesday</div>
            <div className="flex-1 border border-[#778ebe] bg-[#c2cbdf] p-1 text-xs" >Thursday</div>
            <div className="flex-1 border border-[#778ebe] bg-[#c2cbdf] p-1 text-xs" >Friday</div>
            <div className="flex-1 border border-[#778ebe] bg-[#c2cbdf] p-1 text-xs">Saturday</div>
          </div>

          {times.map((time, day)=>(
            <div key={day}>
              <div className="flex w-full">
                <div className="flex-1 border border-[#778ebe] bg-[#c2cbdf] p-1 text-xs ">{time.slot}</div>
                <div className={`flex-1 border  ${time.sun ? 'bg-[#ade1b1] text-[#ade1b1] border-[#ade1b1]' : 'bg-[#c2cbdf] text-[#c2cbdf] border-[#778ebe]'} p-1 text-xs `} >Sunday</div>
                <div className={`flex-1 border  ${time.mon ? 'bg-[#e1d4ad] text-[#e1d4ad] border-[#e1d4ad]' : 'bg-[#c2cbdf] text-[#c2cbdf] border-[#778ebe]'} p-1 text-xs `}>Monday</div>
                <div className={`flex-1 border  ${time.tue ? 'bg-[#aeade1] text-[#aeade1] border-[#aeade1]' : 'bg-[#c2cbdf] text-[#c2cbdf] border-[#778ebe]'} p-1 text-xs `} >Tuesday</div>
                <div className={`flex-1 border  ${time.wed ? 'bg-[#d0ade1] text-[#d0ade1] border-[#d0ade1]' : 'bg-[#c2cbdf] text-[#c2cbdf] border-[#778ebe]'} p-1 text-xs `}> Wednesday</div>
                <div className={`flex-1 border  ${time.thu ? 'bg-[#ade1d7] text-[#ade1d7] border-[#ade1d7]' : 'bg-[#c2cbdf] text-[#c2cbdf] border-[#778ebe]'} p-1 text-xs `}>Thursday</div>
                <div className={`flex-1 border  ${time.fri ? 'bg-[#e1adad] text-[#e1adad] border-[#e1adad]' : 'bg-[#c2cbdf] text-[#c2cbdf] border-[#778ebe]'} p-1 text-xs `} >Friday</div>
                <div className={`flex-1 border  ${time.sat ? 'bg-[#ade1b1] text-[#ade1b1] border-[#ade1b1]' : 'bg-[#c2cbdf] text-[#c2cbdf] border-[#778ebe]'} p-1 text-xs `}>Saturday</div>
              </div>
            </div>            
          ))}
        </div>        
      </div>
    </div>
  )
}

export default Main
