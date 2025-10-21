import express from "express";
import multer from "multer";
import {
    exportExpenses,
    importExpenses,
} from "../controllers/importExportController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Multer setup for file upload
const upload = multer({ dest: "uploads/" });

// Export route
router.get("/export",protect, exportExpenses);

// Import route
router.post("/import",protect, upload.single("file"), importExpenses);

export default router;
