const express = require("express");
const router = express.Router();
const { userSchema } = require("../schema/user.js");
const { adminSchema } = require("../schema/admin.js");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secret, requireUser } = require("../middleware/auth");

router.get("/", (req, res) => res.send("User route get"));

router.get("/me", requireUser, async (req, res) => {
  const user = await userSchema.findById(req.auth.id).select("-password").lean();
  if (!user) return res.status(404).json({ message: "User not found" });
  res.json({ user: { id: user._id.toString(), username: user.username, email: user.email } });
});

router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username?.trim() || !email?.trim() || !password) {
      return res.status(400).json({ message: "Username, email and password are required", ok: false });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must contain at least 6 characters", ok: false });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existing = await userSchema.findOne({ email: normalizedEmail });
    if (existing) return res.status(409).json({ message: "Email already exists", ok: false });

    await userSchema.create({ username: username.trim(), email: normalizedEmail, password });
    return res.status(201).json({ message: "User registered successfully", ok: true });
  } catch (error) {
    console.error("User register error:", error);
    return res.status(400).json({ message: error.message, ok: false });
  }
});

router.post("/login", async (req, res) => {
  try {
    const email = req.body.email?.trim().toLowerCase();
    const password = req.body.password;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await userSchema.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isLogin = await bcrypt.compare(password, user.password);
    if (!isLogin) return res.status(401).json({ message: "Invalid email or password" });

    const tokenPayload = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      role: "user",
    };
    const token = jwt.sign(tokenPayload, secret, { expiresIn: "7d" });

    return res.json({ message: "Login successful", user: tokenPayload, token });
  } catch (error) {
    console.error("User login error:", error);
    return res.status(500).json({ message: "Unable to login right now" });
  }
});

router.get("/:admin_id", async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.admin_id)) {
      return res.status(400).json({ message: "Invalid store id" });
    }
    const adminData = await adminSchema.findById(req.params.admin_id).lean();
    if (!adminData) return res.status(404).json({ message: "Store not found" });

    const completeAddress = `${adminData.address}, ${adminData.city} - ${adminData.pincode}, ${adminData.state}`;
    return res.json({
      storeName: adminData.storeName,
      completeAddress,
      city: adminData.city,
      state: adminData.state,
      logoUri: adminData.logoUri || "",
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
