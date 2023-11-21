// Importing required models
const Habits = require('../../models/habits');
const Status = require('../../models/status');

// Array of month names
const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Self-invoking async function to run the habit update process
(async () => {
  try {
    let currentDate = new Date();
    let previousDate = currentDate;

    // Continuous loop to check for date changes
    while (true) {
      currentDate = new Date();

      // If the date has changed since the last check
      if (currentDate.getDate() !== previousDate.getDate()) {

        console.log('function run');

        // Get current month and day for new date
        const month = monthNames[currentDate.getMonth()];
        const day = currentDate.getDate();
        const formattedDate = `${month} ${day}`;

        // Calculate date 7 days ago for removal
        const dateToRemove = new Date(previousDate);
        dateToRemove.setDate(dateToRemove.getDate() - 7);
        const RemoveMonth = monthNames[dateToRemove.getMonth()];
        const RemoveDay = dateToRemove.getDate();
        const RemoveDate = `${RemoveMonth} ${RemoveDay}`;

        // Retrieve all habits from the database
        let habits = await Habits.find({});

        // Loop through each habit
        for (let habit of habits) {
          // Find status entry for the habit on the date to remove
          let status = await Status.findOne({ date: RemoveDate, habit: habit._id });

          // If status entry exists, delete it
          if (status) {
            let dateID = status._id;
            await Status.deleteOne({ _id: dateID });

            // Remove the status entry from the habit
            await Habits.findByIdAndUpdate(habit._id, { $pull: { status: dateID } });
          }

          // Create a new status entry for the current date
          let newStatus = await Status.create({
            date: formattedDate,
            datestatus: 'Not Started',
            habit: habit._id
          });

          // Add the new status entry to the habit's status array
          habit.status.push(newStatus._id);
          await habit.save();
        }
      }

      // Update previousDate for the next iteration
      previousDate = currentDate;

      // Delay for 1 minute (adjust as needed)
      await delay(60000);
    }
  } catch (error) {
    console.log('Error', error);
  }
})();

// Function to introduce a delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
