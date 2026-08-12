const mongoose = require("mongoose");

const dbConnection = async () => {
    try {
        if (mongoose.connection.readyState === 1) {
            return mongoose.connection;
        }

        await mongoose.connect("mongodb://localhost:27017/BookStore");

        console.log("MongoDB Connected Successfully");

        return mongoose.connection;
    } catch (error) {
        console.error("MongoDB Connection Failed:", error);
        throw error;
    }
};

module.exports = { dbConnection };