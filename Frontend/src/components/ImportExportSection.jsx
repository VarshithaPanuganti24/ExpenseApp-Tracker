import { useState } from "react";
import api from "../api";

const ImportExportSection = () => {
  const [format, setFormat] = useState("csv");
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  // const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";
  //    const token = localStorage.getItem("token");
  // ========== EXPORT ==========
  const handleExport = async () => {
      try {
      const res = await api.get(`/expenses/export?format=${format}`, {
        responseType: "blob", // important for file downloads
      });

      const blob = new Blob([res.data]);
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `expenses.${format}`;
      a.click();
      window.URL.revokeObjectURL(url);
      setMessage(`✅ Exported ${format.toUpperCase()} successfully`);
    } catch (error) {
      console.error(error);
      setMessage("❌ Export failed");
    }
  };

  // ========== IMPORT ==========
  const handleImport = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await api.post("/expenses/import", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(
        `✅ ${res.data.message}. Imported: ${res.data.imported}, Skipped: ${res.data.skipped}`
      );
    } catch (error) {
      console.error("Import error:", error);
      setMessage(`❌ ${error.response?.data?.message || "Import failed"}`);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 mt-8">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
        Import / Export Expenses
      </h2>

      <div className="flex flex-wrap items-center gap-4">
        {/* Export Section */}
        <div className="flex items-center gap-2">
          <select
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm"
          >
            <option value="csv">CSV</option>
            <option value="json">JSON</option>
            <option value="xlsx">XLSX</option>
          </select>

          <button
            onClick={handleExport}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Export
          </button>
        </div>

        {/* Import Section */}
        <form onSubmit={handleImport} className="flex items-center gap-2">
          <input
            type="file"
            accept=".csv,.json,.xlsx"
            onChange={(e) => setFile(e.target.files[0])}
            className="text-sm border rounded-lg file:mr-3 file:py-2 file:px-4 file:border-0 file:bg-green-600 file:text-white file:rounded-lg hover:file:bg-green-700"
          />

          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Import
          </button>
        </form>
      </div>

      {/* Message */}
      {message && (
        <p className="mt-4 text-sm text-gray-700 dark:text-gray-300">{message}</p>
      )}
    </div>
  );
};

export default ImportExportSection;
