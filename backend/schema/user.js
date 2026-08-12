const { model, Schema} = require("mongoose");
const bcrypt = require("bcrypt");
const { Timestamp } = require("mongodb");
const emailValidate = require("email-validator");

const schema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: {
            validator: (email)=> {
                return emailValidate.validate(email)
            },
            message: "Invalid email"
        }
    },
    password: {
        type: String,
        required: true
    }
},{timestamps: true})

// unique email
schema.pre('save', async function(){
    const count = await model("User").countDocuments({email: this.email})
    if(count > 0){
        throw new Error("Email already exists")
    }
})

// password encrypt
schema.pre('save', async function(){
    const encryptedPassword = await bcrypt.hash(this.password.toString(),12);
    this.password = encryptedPassword;
})
const userSchema = model("User",schema)
module.exports = { userSchema }