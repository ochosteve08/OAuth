import { json } from "express";
import UserModel from "../model/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

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

    const match = bcryptjs.compareSync(password, user.password);
    if (!match) {
      return next(errorHandler(401, "wrong credentials"));
    }
    const sanitizedUser = { ...validUser._doc };
    delete sanitizedUser.password;
    return res.status(200).json({ user: sanitizedUser });
  } catch (error) {
    next(error);
  }
};
