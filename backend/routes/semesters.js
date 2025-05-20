const router = require('express').Router();
const Semester = require('../models/Semester');
const Class = require('../models/Class'); // Add Class model
const auth = require('../middleware/auth');

// Create or update semester GPA
router.post('/', auth, async (req, res) => {
    try {
        const { year, season, semesterGPA } = req.body; // Changed from gpa to semesterGPA
        const term = `${year} ${season.charAt(0).toUpperCase() + season.slice(1)} Term`;
        
        // Check if there are any classes in this semester
        const classesInSemester = await Class.find({
            userId: req.user.id,
            term: term
        });

        if (classesInSemester.length === 0) {
            await Semester.deleteOne({
                userId: req.user.id,
                year,
                season
            });
            return res.json({ message: 'No classes in semester, record removed' });
        }

        // If classes exist, update or create semester record
        let semester = await Semester.findOne({
            userId: req.user.id,
            year,
            season
        });

        if (!semester) {
            semester = new Semester({
                userId: req.user.id,
                year,
                season,
                term,
                semesterGPA: semesterGPA // Changed from gpa to semesterGPA
            });
        } else {
            semester.semesterGPA = semesterGPA; // Changed from gpa to semesterGPA
        }

        await semester.save();
        console.log('Saved semester:', semester); // Add logging
        res.json(semester);
    } catch (err) {
        console.error('Error saving semester:', err);
        res.status(400).json({ message: err.message });
    }
});

// Get all semesters
router.get('/', auth, async (req, res) => {
    try {
        // Only return semesters that have classes
        const semesters = await Semester.find({ userId: req.user.id });
        const validSemesters = [];

        for (const semester of semesters) {
            const term = `${semester.year} ${semester.season.charAt(0).toUpperCase() + semester.season.slice(1)} Term`;
            const classCount = await Class.countDocuments({
                userId: req.user.id,
                term: term
            });

            if (classCount > 0) {
                validSemesters.push(semester);
            } else {
                // Clean up semester with no classes
                await Semester.deleteOne({ _id: semester._id });
            }
        }

        res.json(validSemesters);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;