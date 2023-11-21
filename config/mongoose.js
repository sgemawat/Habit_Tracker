// Importing mongoose for database connection
const mongoose = require('mongoose');

// Connecting to the MongoDB database
mongoose.connect(`mongodb://127.0.0.1:27017/habits_db`);

// Getting the default connection
const db = mongoose.connection;

// Event handler for connection error
db.on('error', console.error.bind(console, 'Error connecting to the db'));

// Event handler for successful connection
db.once('open', function () {
  console.log("Successfully connected to the Database");
});

// Exporting the database connection object
module.exports = db;
