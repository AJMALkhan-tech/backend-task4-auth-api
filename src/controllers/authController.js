const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const { insertUser, findUserByEmail, findUserById } = require("../models/userModel");
const { AppError } = require("../middleware/errorHandler");
const { jwtSecret, jwtExpiresIn } = require("../config/config");

// POST /api/auth/register
const register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
      throw new AppError("name, email and password are required", 400);
    }
    if (!validator.isEmail(email)) {
      throw new AppError("Invalid email format", 400);
    }
    if (password.length < 6) {
      throw new AppError("Password must be at least 6 characters", 400);
    }

    const existing = await findUserByEmail(email);
    if (existing) throw new AppError("Email already registered", 409);

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await insertUser({ name, email, hashedPassword, role });

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new AppError("email and password are required", 400);
    }

    const user = await findUserByEmail(email);
    if (!user) throw new AppError("Invalid email or password", 401);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new AppError("Invalid email or password", 401);

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      jwtSecret,
      { expiresIn: jwtExpiresIn }
    );

    res.status(200).json({
      success: true,
      token,
      data: { id: user.id, name: user.name, email: user.email, role: user.role },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/auth/profile
const getProfile = async (req, res, next) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) throw new AppError("User not found", 404);

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, getProfile };