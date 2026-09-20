const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const emailValidate = require("email-validator");

const schema = new Schema({
  username: { type: String, required: true, trim: true },
  email: {
    type: String, required: true, unique: true, lowercase: true, trim: true,
    validate: { validator: (email) => emailValidate.validate(email), message: "Invalid email" }
  },
  password: { type: String, required: true, minlength: 6 }
}, { timestamps: true });

schema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

const userSchema = model("User", schema);
module.exports = { userSchema };
