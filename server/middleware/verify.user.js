import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookie.jwt;

  if (!token) {
    return next(errorHandler(401, "user not logged in"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "invalid token"));
    req.user = user;
    next();
  });
};
