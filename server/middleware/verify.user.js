// import { errorHandler } from "../utils/error.js";
// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   const token = req.cookies.access_token;
//   console.log("cookies:", req.cookies);

//   console.log("verify-token:", token);

//   if (!token) {
//     return next(errorHandler(403, "Authorization token required"));
//   }
//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return next(errorHandler(403, "forbidden"));
//     req.user = user;
//     next();
//   });
// };
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";
import { jwtSecret } from "../utils/jwtSecret.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  console.log("token from verify:", token)

  if (!token) return next(errorHandler(401, "You are not authenticated!"));

  jwt.verify(token,jwtSecret, (err, user) => {
    if (err) return next(errorHandler(403, "Token is not valid!"));

    req.user = user;
    next();
  });
};