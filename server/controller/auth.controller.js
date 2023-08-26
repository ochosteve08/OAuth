import { json } from "express";
import UserModel from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const Signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashPassword,
    });
    res.json(newUser);
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

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const { password: hashPassword, ...rest } = validUser._doc;

    res
      .cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        maxAge: 30 * 60 * 1000,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
