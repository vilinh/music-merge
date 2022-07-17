import express from "express";
import { deleteUser, getUser, getUsers, updateUser } from "../controllers/user.js";


const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

export default router;