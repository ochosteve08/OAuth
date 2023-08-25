import { json } from "express";
import UserModel from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const Signup = async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = await UserModel.create({ username, email, password: hashPassword });
    res.json(newUser);
  } catch (err) {
    console.log({ message: err.message });
    res.status(500).json({ message: err.message });
  }
};
