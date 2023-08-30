import express from "express";
import {updateUser, deleteUser } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/verify.user.js";

const router = express.Router();


// router.use(verifyToken);
router.patch("/:id",verifyToken, updateUser);
router.delete("/:id",verifyToken, deleteUser);

export default router;
