import express from "express";
import { test } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/verify.user.js";

const router = express.Router();

router.get("/",test);
router.put("/update/:id",verifyToken);

export default router;
