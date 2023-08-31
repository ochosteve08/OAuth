import UserModel from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import { jwtSecret } from "../utils/jwtSecret.js";

export const Signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashPassword,
    });
    const { password: Password, ...rest } = newUser._doc;
    res.json(rest);
  } catch (error) {
    next(error);
  }
};

export const SignIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await UserModel.findOne({ email });
    if (!validUser) {
      return next(errorHandler(401, "user not found"));
    }

    const match = bcryptjs.compareSync(password, validUser.password);
    if (!match) {
      return next(errorHandler(401, "wrong credentials"));
    }
    const token = jwt.sign({ id: validUser._id }, jwtSecret);

    const { password: hashPassword, ...rest } = validUser._doc;

    res.cookie("access_token", token, {
      httpOnly: true,
      // path: "/",
      // domain: "localhost",
      // SameSite: "Lax",
      domain: "o-auth-puce.vercel.app",
      SameSite: "None",
      secure: true,
      maxAge: 30 * 60 * 1000,
    });
    return res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const Google = async (req, res, next) => {
  try {
    const { name, email, photo } = req.body;

    const User = await UserModel.findOne({ email });
    if (User) {
      const token = jwt.sign({ id: User._id }, jwtSecret);
      const { password: hashPassword, ...rest } = User._doc;
      res
        .cookie("access_token", token, {
          httpOnly: true,
          // path: "/",
          // domain: "localhost",
          // SameSite: "lax",
          domain: "o-auth-puce.vercel.app",
          SameSite: "none",
          secure: true,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = await UserModel.create({
        username:
          name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 10000).toString(),
        email,
        password: hashPassword,
        profilePicture: photo,
      });

      const token = jwt.sign({ id: newUser._id }, jwtSecret);
      const { password: removePassword, ...rest } = newUser._doc;

      res.cookie("access_token", token, {
        httpOnly: true,
        expiresIn: "30m",
      });

      return res.status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const signout = (req, res, next) => {
  const cookies = req.cookies;

  //user is already signed out
  if (!cookies?.access_token) {
    return res.status(200).json({
      success: false,
      message: "Already signed out",
    });
  }

  res.clearCookie("access_token");

  return res.status(200).json({
    success: true,
    message: "Signout successful",
  });
};
