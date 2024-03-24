const mongoose = require('mongoose');
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1/ReunionHub';

const connectDb = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log(`DB connection successful on ${mongoUri}!`);
    } catch (error) {
        console.error("Error connecting to DB:", error);
        process.exit(1); // Exit the process if unable to connect to MongoDB
    }
};

module.exports = connectDb;
