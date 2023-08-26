import express from "express";
import { Signup } from "../controller/auth.controller.js";
import { SignIn } from "../controller/auth.controller.js";

const router = express.Router();

router.post('/signup', Signup)

router.post("/signin", SignIn);


export default router
