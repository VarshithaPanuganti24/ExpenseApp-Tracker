
import Income from "../models/Income.js";

// GET income
export const getIncome = async (req, res) => {
  try {
    let income = await Income.findOne();
    if (!income) {
      income = await Income.create({ amount: 0 });
    }
    res.json(income);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

// PUT update income
export const updateIncome = async (req, res) => {
  try {
    const { amount } = req.body;
    let income = await Income.findOne();
    if (!income) {
      income = await Income.create({ amount });
    } else {
      income.amount = amount;
      await income.save();
    }
    res.json(income);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
