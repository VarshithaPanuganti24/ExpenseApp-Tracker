import mongoose from "mongoose";

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true, min: 0 },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  description: { type: String }
}, { timestamps: true });

 const Expense = mongoose.model("Expense", ExpenseSchema);
export default Expense;
