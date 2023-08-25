import { json } from "express";
import UserModel from "../model/user.model.js";
import bcryptjs from "bcryptjs";

export const Signup = async (req, res, next) => {
  try {
   
    const { username, email, password } = req.body;
    const hashPassword = bcryptjs.hashSync(password, 10);
    const newUser = await UserModel.create({ username, email, password: hashPassword });
    res.json(newUser);
  } catch (error) {
     
    next(error);
  }
};



export const SignIn = (req, res,next) =>{
  try{}
      catch(error) {
        next(error);

}}

