import User from "../models/User.js";
import { signToken, setTokenCookie, clearTokenCookie } from "../utils/jwt.js";

export async function register(req, res, next) {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({ name, email, password });
    const token = signToken(user._id);
    setTokenCookie(res, token);

    res.status(201).json({
      success: true,
      message: "Registration successful",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = signToken(user._id);
    setTokenCookie(res, token);

    res.json({
      success: true,
      message: "Login successful",
      data: { user: user.toJSON() },
    });
  } catch (error) {
    next(error);
  }
}

export function logout(_req, res) {
  clearTokenCookie(res);
  res.json({ success: true, message: "Logged out successfully" });
}

export async function getMe(req, res) {
  res.json({ success: true, data: { user: req.user } });
}
