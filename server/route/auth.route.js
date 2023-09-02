import express from "express";
import { Signup } from "../controller/auth.controller.js";
import { SignIn } from "../controller/auth.controller.js";
import { Google } from "../controller/auth.controller.js";
import { signout } from "../controller/auth.controller.js";
import { logResponseCookies } from "../middleware/LogResCookies.js";
import { loginLimiter } from "../middleware/loginLimiter.js";

const router = express.Router();

router.post("/signup", Signup);
router.post("/signin",loginLimiter, logResponseCookies, SignIn);
router.post("/google", Google);
router.post("/signout", logResponseCookies, signout);

export default router;
