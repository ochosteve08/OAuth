import express from "express";
import { Signup } from "../controller/auth.controller.js";
import { SignIn } from "../controller/auth.controller.js";
import { Google } from "../controller/auth.controller.js";
import { signout } from "../controller/auth.controller.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/signin", SignIn);
router.post("/google", Google);
router.post("/signout", signout);

export default router;
