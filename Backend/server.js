import dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import expenseRoutes from "./routes/expenses.js";
import categoryRoutes from "./routes/categories.js";
import incomeRoutes from "./routes/income.js";
import authRoutes from "./routes/auth.js"
import importExportRoutes from "./routes/importExportRoutes.js"

//dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

// Routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/auth", authRoutes);
// Import/Export routes
app.use("/api/expenses", importExportRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log("🚀 Server running on port 5000"));
  })
  .catch(err => console.error(err));

  