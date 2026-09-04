const express = require("express");
const router = express.Router();
const { dbConnection } = require("../config/db");
const { userSchema } = require('../schema/user.js');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secret = '8cbb3e320c8aac743f82d0dedc083b2c'

router.get("/",(req,res)=>{
    res.send("User route get")
})
router.post("/register", async (req, res) => {
    try{
        const payload = req.body;
        await userSchema.create(payload)
        res.json({message:"User Registered Successfully",oK:true});
    }
    catch(error){
        res.status(505).json({message:error.message ,ok:false})
    }

});

router.post("/login", async (req, res) => {
    try{
        const payload = req.body;
        const user = await userSchema.findOne({email: payload.email})
        
        if(user){
            const isLogin = await bcrypt.compare(payload.password, user.password);
            console.log(user.password);
            
            if(isLogin){
                const tokenPayload = {
                    id: user._id,
                    username: user.username,
                    email: user.email
                }

                const token = jwt.sign(tokenPayload, secret, {expiresIn: '7d'});
                
                res.json({message: "Login Successfully",user:tokenPayload, token: token})
            }
            else{
                res.status(404).json({message: "password is incorrect"})
            }
        }
        else{
            res.status(404).json({message: "user not found"})
        }
    }
    catch(err){
        res.status(500).json({message: err.message});
    }
});

module.exports = router;