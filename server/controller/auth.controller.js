import { json } from "express"
import UserModel from "../model/user.model.js"

export const Signup = async (req, res)=>{
   try{ console.log(req.body)
    const {username, email, password} = req.body
   const newUser = await  UserModel.create({username, email, password})
  res.json(newUser)
}
catch (err) {
    console.log({message: err.message})
    res.status(500).json({message: err.message})
}
}