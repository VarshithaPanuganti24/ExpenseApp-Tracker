import express from "express";
import { 
  getExpenses, getExpenseById,addExpense, updateExpense, deleteExpense, getExpenseSummary 
} from "../controllers/expenseController.js";
import { protect } from "../middleware/authMiddleware.js";  

const router = express.Router();
router.use(protect);

router.get("/", getExpenses);
router.get("/:id", getExpenseById); 
router.post("/", addExpense);
router.put("/:id", updateExpense);
router.delete("/:id", deleteExpense);
router.get("/summary", getExpenseSummary);

export default router;
