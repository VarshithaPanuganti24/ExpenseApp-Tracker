import Expense from "../models/Expense.js";
import csv from "csv-parser";
import { Parser as Json2CsvParser } from "json2csv";
import XLSX from "xlsx";
import fs from "fs";
import path from "path";

export const exportExpenses = async (req, res) => {
    try {
        console.log("📦 Export route called");

        if (!req.user) {
            console.log(" No user found on req.user");
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = req.user.id;;
        console.log("Export for userId:", userId);
        
        
        const expenses = await Expense.find({ userId });
        
        console.log("Expenses found:", expenses);

        if (!expenses.length) {
            return res.status(404).json({ message: "No expenses to export" });
        }
        const format = req.query.format || "json";
        const exportData = expenses.map(exp => ({
            amount: exp.amount,
            category: exp.category,
            date: exp.date instanceof Date ? exp.date.toISOString() : exp.date,
            description: exp.description,
        }));

        // Handle JSON
        if (format === "json") {
            res.setHeader("Content-Type", "application/json");
            return res.send(JSON.stringify(exportData, null, 2));
        }

        // Handle CSV
        if (format === "csv") {
            const header = "Amount,Category,Date,Description\n";
            const rows = exportData
                .map(e => `${e.amount},${e.category},${e.date},${e.description}`)
                .join("\n");
            res.setHeader("Content-Type", "text/csv");
            res.setHeader("Content-Disposition", "attachment; filename=expenses.csv");
            return res.send(header + rows);
        }

        // Handle XLSX
        if (format === "xlsx") {
            const worksheet = XLSX.utils.json_to_sheet(exportData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, "Expenses");

            const buffer = XLSX.write(workbook, {
                bookType: "xlsx",
                type: "buffer",
            });

            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.setHeader(
                "Content-Disposition",
                "attachment; filename=expenses.xlsx"
            );
            console.log("✅ XLSX export prepared");
            return res.end(buffer);
        }

        res.status(400).json({ message: "Invalid format" });
    } catch (err) {
        console.error("❌ Export error:", err);
        res.status(500).json({ message: "XLSX  export error" });
    }
};



// ========= IMPORT =========
export const importExpenses = async (req, res) => {
    const file = req.file;
    if (!file) return res.status(400).json({ message: "No file uploaded" });

    const fileExt = path.extname(file.originalname).toLowerCase();
    const imported = [];
    const skipped = [];
    const errors = [];

    try {
        let records = [];

        // ✅ Parse CSV
        if (fileExt === ".csv") {
            const data = fs.readFileSync(file.path, "utf8");
            const lines = data.split("\n");
            const headers = lines[0].split(",").map((h) => h.trim());
            for (let i = 1; i < lines.length; i++) {
                const values = lines[i].split(",");
                if (values.length === headers.length) {
                    const record = {};
                    headers.forEach((h, idx) => (record[h] = values[idx]?.trim()));
                    records.push(record);
                }
            }
        }

        // ✅ Parse JSON
        else if (fileExt === ".json") {
            const jsonData = fs.readFileSync(file.path, "utf8");
            records = JSON.parse(jsonData);
        }

        // ✅ Parse XLSX
        else if (fileExt === ".xlsx") {
            const workbook = XLSX.readFile(file.path);
            const sheetName = workbook.SheetNames[0];
            const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
            records = sheet;
        } else {
            return res.status(400).json({ message: "Invalid file type" });
        }

        // ✅ Validate and insert
        for (let [index, record] of records.entries()) {
            const { amount, category, date, description } = record;

            if (
                !amount ||
                isNaN(amount) ||
                amount <= 0 ||
                !date ||
                isNaN(new Date(date)) ||
                !category
            ) {
                skipped.push(record);
                errors.push(`Invalid record at row ${index + 2}`);
                continue;
            }

            imported.push(record);
        }

        // Insert valid records into DB
        if (imported.length > 0) {
            await Expense.insertMany(imported);
        }

        res.json({
            message: "Import completed successfully",
            imported: imported.length,
            skipped: skipped.length,
            errors,
        });
    } catch (error) {
        console.error("Import error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    } finally {
        fs.unlinkSync(file.path); // delete temp file
    }
};
