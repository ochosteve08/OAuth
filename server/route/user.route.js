import express from "express";
import { test, updateUser, deleteUser } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/verify.user.js";

const router = express.Router();

router.get("/", test);
router.use(verifyToken);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
