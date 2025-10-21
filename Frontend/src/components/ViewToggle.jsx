export default function ViewToggle({ viewBy, setViewBy }) {
  return (
    <div className="flex gap-2 my-4">
      <button
        className={`px-4 py-2 rounded ${viewBy === "date" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setViewBy("date")}
      >
        Date
      </button>
      <button
        className={`px-4 py-2 rounded ${viewBy === "category" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setViewBy("category")}
      >
        Categories
      </button>
    </div>
  );
}
