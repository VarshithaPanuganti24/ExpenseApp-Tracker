// routes/income.js
import express from "express";
import { getIncome, updateIncome } from "../controllers/incomeController.js";

const router = express.Router();

router.get("/", getIncome);
router.put("/", updateIncome);

export default router;
