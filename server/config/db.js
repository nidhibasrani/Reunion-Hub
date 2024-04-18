const mongoose = require('mongoose');
const mongoUri ='mongodb://127.0.0.1/reunion-hub';

const connectDb = async () => {
    try {
        await mongoose.connect(mongoUri);
        console.log(`DB connection successful on ${mongoUri}!`);
    } catch (error) {
        console.error("Error connecting to DB:", error);
        process.exit(1); 
    }
};

module.exports = connectDb;
