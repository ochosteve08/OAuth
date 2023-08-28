import express from "express";
import { test, updateUser } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/verify.user.js";

const router = express.Router();

router.get("/",test);
router.patch("/:id",verifyToken, updateUser);

export default router;
