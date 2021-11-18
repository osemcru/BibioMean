import express from "express";
import addmin from "../controllers/admin.js";
import auth from "../middlewares/auth.js";
import admin from "../middlewares/admin.js";
const router = express.Router();

//http://localhost:3001/api/book/registerBook
router.post("/registerAdmin", addmin.registerAdmin);


export default router;