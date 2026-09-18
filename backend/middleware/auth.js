const jwt = require("jsonwebtoken");

const secret = process.env.JWT_SECRET || "bookverse-development-secret-change-me";

const readToken = (req) => {
  const header = req.headers.authorization || "";
  return header.startsWith("Bearer ") ? header.slice(7) : null;
};

const requireAuth = (req, res, next) => {
  try {
    const token = readToken(req);
    if (!token) return res.status(401).json({ message: "Authentication required" });
    req.auth = jwt.verify(token, secret);
    next();
  } catch {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

const requireAdmin = (req, res, next) => {
  requireAuth(req, res, () => {
    if (req.auth.role !== "admin") {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  });
};

const requireUser = (req, res, next) => {
  requireAuth(req, res, () => {
    if (req.auth.role !== "user") {
      return res.status(403).json({ message: "User access required" });
    }
    next();
  });
};

module.exports = { secret: process.env.JWT_SECRET || "bookverse-development-secret-change-me", requireAuth, requireAdmin, requireUser };
