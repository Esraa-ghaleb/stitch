import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { env } from "../config/env.js";

export async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ success: false, message: "Authentication required" });
    }

    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({ success: false, message: "User not found" });
    }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

export async function optionalAuth(req, _res, next) {
  try {
    const token = req.cookies?.token;
    if (token) {
      const decoded = jwt.verify(token, env.jwtSecret);
      const user = await User.findById(decoded.id);
      if (user) req.user = user;
    }
  } catch {
    // ignore invalid token
  }
  next();
}
