import express from "express";
import supplier from "../controllers/supplier.js";
const router = express.Router();

//http://localhost:3001/api/book/registerBook
router.post("/registerSupplier", supplier.registerSupplier);
router.get("/listSupplier", supplier.listSupplier);
router.put("/updateSupplier", supplier.updateSupplier);
router.delete("/deleteSupplier/:_id", supplier.deleteSupplier);

export default router;
