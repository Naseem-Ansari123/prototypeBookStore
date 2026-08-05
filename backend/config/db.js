const { MongoClient } = require("mongodb");

const client = new MongoClient("mongodb://localhost:27017/");

let db;

const dbConnection = async () => {
    if (db) return db;   // Reuse existing connection

    await client.connect();

    console.log("MongoDB Connected Successfully");

    db = client.db("BookStore");

    return db;
};

module.exports = { dbConnection };