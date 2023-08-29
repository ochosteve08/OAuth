import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("cookies:", req.cookies);

  console.log("verify-token:", token);

  if (!token) {
    return next(errorHandler(403, "Authorization token required"));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return next(errorHandler(403, "forbidden"));
    req.user = user;
    next();
  });
};
