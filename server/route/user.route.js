import express from "express";
import { CreateUser } from "../controller/user.controller.js";

const router = express.Router();

router.get("/",CreateUser);

export default router;
