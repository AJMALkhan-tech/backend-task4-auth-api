const express = require("express");
const router = express.Router();
const { register, login, getProfile } = require("../controllers/authController");
const { authenticate } = require("../middleware/auth");
const authLimiter = require("../middleware/rateLimiter");

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.get("/profile", authenticate, getProfile);

module.exports = router;