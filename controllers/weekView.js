// Importing required models and modules
const Habits = require('../models/habits');
const Status = require('../models/status');

// Array of month names
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

// Controller function for rendering weekView page
module.exports.weekView = async function (req, res) {
    try {
        // Retrieve habits from the database, populating status
        let habits = await Habits.find({}).populate('status');

        // Get current date for display
        let currentDate = new Date();
        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate();
        const date = `${month} ${day}`;

        // Render weekView page with habits and current date
        res.render('./weekView', {
            habits: habits,
            currdate: date
        });
    } catch (error) {
        console.log('Error', error);
    }
}

// Controller function for toggling habit status in weekView
module.exports.toggleStatus = async function (req, res) {
    try {
        // Find status entry for the specified habit and date
        let status = await Status.findOne({ habit: req.query.id, date: req.query.date });

        // Toggle status between 'Not Started', 'Done', and 'Not Done'
        if (status.datestatus === 'Not Started') {
            status.datestatus = 'Done';
        } else if (status.datestatus === 'Done') {
            status.datestatus = 'Not Done';
        } else {
            status.datestatus = 'Not Started';
        }

        // Save the updated status
        status.save();

        // Redirect back to the previous page
        return res.redirect('back');
    } catch (error) {
        console.log('Error', error);
    }
}
