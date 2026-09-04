const { model, Schema } = require("mongoose");
const bcrypt = require("bcrypt");
const emailValidate = require("email-validator");

const schema = new Schema(
  {
    // 🏪 Store Information
    storeName: {
      type: String,
      required: true,
      trim: true,
    },

    logoUri: {
      type: String,
      default: "",
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    state: {
      type: String,
      required: true,
      trim: true,
    },

    pincode: {
      type: String,
      required: true,
      match: [/^[0-9]{6}$/, "Invalid pincode"],
    },

    // 👤 Owner Information
    ownerName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,

      validate: {
        validator: (email) => emailValidate.validate(email),
        message: "Invalid email",
      },
    },

    phoneNo: {
      type: String,
      required: true,
      match: [/^[6-9][0-9]{9}$/, "Invalid phone number"],
    },

    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// 🔐 Password encryption
schema.pre("save", async function (next) {
  // Don't hash password again if it hasn't changed
  if (!this.isModified("password")) {
    return next();
  }
  console.log(this.password);
  

  this.password = await bcrypt.hash(this.password, 12);
});

const adminSchema = model("Admin", schema);

module.exports = { adminSchema };