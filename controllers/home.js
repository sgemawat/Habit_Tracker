// Importing required models and modules
const Habits = require('../models/habits');
const Status = require('../models/status');

// Array of month names
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Controller function for rendering home page
module.exports.home = async function (req, res) {
    try {
        // Retrieve habits from the database, populating status
        let habits = await Habits.find({}).populate('status');

        // Get current date for display
        let currentDate = new Date();
        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate();
        const date = `${month} ${day}`;

        // Render home page with habits and current date
        res.render('./home', {
            habits: habits,
            currdate: date
        });
    } catch (error) {
        console.log('Error', error);
    }
}

// Controller function for creating habits
module.exports.create = async function (req, res) {
    try {
        let nameValue = (req.body.habits ? req.body.habits : req.body.custom_meal);

        // Check if habit already exists
        let habit = await Habits.findOne({ name: nameValue });
        if (habit) {
            console.log('Habit Already Exists');
            return res.redirect('back');
        }

        // Create habit
        habit = await Habits.create({
            name: nameValue
        });

        // Create status entries for the last 7 days
        for (let i = 0; i < 7; i++) {
            let currentDate = new Date();
            currentDate.setDate(currentDate.getDate() - i);

            const month = monthNames[currentDate.getMonth()];
            const day = currentDate.getDate();
            const formattedDate = `${month} ${day}`;

            let date = await Status.create({
                date: formattedDate,
                datestatus: 'Not Started',
                habit: habit._id
            });

            habit.status.push(date);
        }

        habit.save();
        return res.redirect('back');

    } catch (error) {
        console.log('Error', error);
    }
}

// Controller function for toggling habit status
module.exports.toggleStatus = async function (req, res) {
    try {
        let currentDate = new Date();
        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate();
        const date = `${month} ${day}`;

        let status = await Status.findOne({ habit: req.query.id, date: date });
        status.datestatus = req.query.status;
        status.save();

        return res.redirect('back');
    } catch (error) {
        console.log('Error', error);
    }
}

// Controller function for deleting habits
module.exports.delete = async function (req, res) {
    try {
        let habit = await Habits.findById(req.params.id);
        habit.deleteOne();

        // Delete all associated status entries
        await Status.deleteMany({ habit: req.params.id });

        return res.redirect('back');
    } catch (error) {
        console.log('Error', error);
    }
}
