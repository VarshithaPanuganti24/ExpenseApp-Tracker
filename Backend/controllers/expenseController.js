import Expense from "../models/Expense.js";

// GET all expenses
export const getExpenses = async (req, res) => {
  try {
   const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
// GET expense by ID
export const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOne({ _id: id, userId: req.user._id });

    if (!expense) {
      return res.status(404).json({ error: "Expense not found" });
    }

    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// Add a new expense
export const addExpense = async (req, res) => {
  try {
    const { amount, category, date, description } = req.body;

    // Create and save expense
    const expense = new Expense({
       userId: req.user._id,
      amount,
      category,
      date, // Mongo will parse ISO string into a Date automatically
      description,
    });

    const savedExpense = await expense.save();

    // Return full saved document
    res.status(201).json(savedExpense);
  } catch (err) {
    console.error("Error adding expense:", err);
     res.status(500).json({ error: "Server error" });
    //res.status(500).json({ message: "Failed to add expense", error: err.message });
  }
};


// UPDATE expense
export const updateExpense = async (req, res) => {
  try {
    const updated = await Expense.findByIdAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "Expense not found or not authorized"  });
  }
};

// DELETE expense
export const deleteExpense = async (req, res) => {
   try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,  // ensure user owns this expense
    });

    if (!deleted) {
      return res.status(404).json({ error: "Expense not found or not authorized" });
    }

    res.json({ message: "Expense deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// SUMMARY
export const getExpenseSummary = async (req, res) => {
  const { from, to } = req.query;

  try {
    const summary = await Expense.aggregate([
      {
        $match: {
          userId: req.user._id, // only current user's expenses
          date: {
            $gte: new Date(from),
            $lte: new Date(to),
          },
        },
      },
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
      { $sort: { total: -1 } } // optional: sort by highest spending
    ]);

    res.json(summary);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

