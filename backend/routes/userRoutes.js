const express = require("express");
const router = express.Router();
const { dbConnection } = require("../config/db");


router.get("/",(req,res)=>{
    res.send("User route get")
})
router.post("/register", async (req, res) => {
    const newUser = req.body;
    const db = await dbConnection();
    const userCollection = db.collection("user")
    userCollection.insertOne(newUser) 
    res.json({message:"User Registered Successfully"});

});

router.post("/login", (req, res) => {
    res.send("User Logged In");
});

module.exports = router;