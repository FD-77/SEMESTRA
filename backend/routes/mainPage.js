const router = require('express').Router();
const SemChecklist =require('../models/SemChecklist.js');
const auth = require('../middleware/auth');
const Class = require('../models/Class');
const User = require('../models/User');


//Get Classes
router.get('/classes', auth, async (req, res) => {
    try {
        const classes = await Class.find({ userId: req.user.id });
        res.json(classes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get Semester Checklist
router.get('/getChecklist', auth, async (req, res) => {
    try {
        const tasks = await SemChecklist.find({ userId: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Get GPA
router.get('/gpa', auth, async (req, res) => {
    console.log("Reached api");
    try {
        const user = await User.findOne({ userId: req.user.id });
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({gpa: user.gpa});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


//Add Task
router.post('/addToChecklist', auth, async (req, res) => {
    const {taskname} = req.body;
    if (!taskname){
        return res.status(400).json({message: "Task name is required"});
    }
    try{
        const newTask=new SemChecklist({
            taskname: taskname,
            userId: req.user.id
        });
        const savedTask=await newTask.save();
        res.status(201).json(savedTask);
    } catch (err){
        res.status(500).json({message: "Error adding a task"});
    }
});

//Delete Task
router.delete('/deleteFromChecklist/:id', auth, async(req, res) =>{
    try{
        const deleted =await SemChecklist.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id
        });
        if (!deleted){
            return res.status(404).json({ message: "Task not found" });
        }
        res.json({message: "Task was deleted successfully"});
    } catch(err){
        res.status(500).json({messgae: "Error deleting task"});
    }
});

//Change Task Complete/!Complete
router.patch('/checklist/:id/toggle', auth, async(req, res)=>{
    try{
        const task = await SemChecklist.findOne(
            { _id: req.params.id, userId: req.user.id}
            
        );
        if (!task){
            return res.status(404).json({message: "Task not found"});
        }
        const updatedTask = await SemChecklist.findOneAndUpdate(
            
            { _id: req.params.id, userId: req.user.id},
            {completed: !task.completed},
            {new: true}
        );
        res.json(updatedTask);
    } catch (err){
        console.error(err);
        res.status(500).json({message: "Error updating task"});
    }
})

//Change Task Name
router.patch('/checklist/:id/name', auth, async(req, res)=>{
    const {taskname}= req.body;
    try{
        const updatedTask = await SemChecklist.findOneAndUpdate(
            {_id: req.params.id, userID: req.user.id},
            {taskname},
            {new: true}
        );
        if (!updatedTask){
            return res.status(404).json({message: "Task not found"});
        }
        res.json(updatedTask);
    } catch (err){
        res.status(500).json({message: "Error updating task name"});
    }
})
module.exports = router;
