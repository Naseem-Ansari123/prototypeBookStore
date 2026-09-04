const express = require("express");
const router = express.Router();
const { adminSchema } = require("../schema/admin");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const secret = '8cbb3e320c8aac743f82d0dedc083b2c'

router.get('/',(req,res)=>{
    res.send("hello admin")
})

router.post('/register', async (req,res)=>{
    try{
        const payload = req.body;
        await adminSchema.create(payload)
        res.json({message:"Admin Registered Successfully",oK:true});
    }
    catch(error){
        res.status(505).json({message:error.message ,ok:false})
    }
})

router.post("/login", async (req, res) => {
    try{
        const payload = req.body;
        const admin = await adminSchema.findOne({email: payload.email})
        
        if(admin){
            const isLogin = await bcrypt.compare(payload.password, admin.password);
            
            if(isLogin){
                const tokenPayload = {
                    id: admin._id,
                    adminName: admin.ownerName,
                    email: admin.email
                }

                const token = jwt.sign(tokenPayload, secret, {expiresIn: '7d'});
                res.json({message: "Login Successfully",admin:tokenPayload, token: token})
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