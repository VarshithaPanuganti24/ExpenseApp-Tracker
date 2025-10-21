import { useNavigate } from "react-router-dom";


export default function ExpenseList({ expenses, onDeleteExpense,viewBy }) {
  const navigate = useNavigate();

  // Sort expenses by date (latest first)
  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date) - new Date(a.date))
    //.slice(0, 20); // only take the first 10 items

   // Group expenses by category
  const getCategorySummary = (expenses) => {
    const summary = {};
    expenses.forEach((exp) => {
      if (summary[exp.category]) {
        summary[exp.category] += exp.amount;
      } else {
        summary[exp.category] = exp.amount;
      }
    });
    return summary;
  };
  return (
    <div className="mt-1">
      {viewBy === "date" ? (
        <>
      <h2 className="font-semibold mb-2">Expenses</h2>
      {sortedExpenses.length === 0 ? (
        <p className="text-gray-500">No expenses yet</p>
      ) : (
        <ul className="space-y-1">
          {sortedExpenses.map((exp) => (
            <li
              key={exp._id}
              className="flex justify-between items-center border p-2 rounded"
            >
              <div className="flex flex-col">
                <span className="font-medium">
                  {exp.category} - ${exp.amount}
                </span>
                <span className="text-sm text-gray-500">
                  {exp.description || "No description"}
                </span>
                <span className="text-xs text-gray-400">
                  {new Date(exp.date).toLocaleDateString()}
                </span>
              </div>

              <div className="flex gap-2">
                <button
                  className="text-blue-500"
                  onClick={() => navigate(`/edit/${exp._id}`)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => onDeleteExpense(exp._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
      </>
      ):(
      <>
        <h2 className="font-semibold mb-2">Expenses by Category</h2>
          {expenses.length === 0 ? (
            <p className="text-gray-500">No expenses yet</p>
          ) : (
            <ul className="space-y-2">
              {Object.entries(getCategorySummary(expenses)).map(
                ([category, total]) => (
                  <li
                    key={category}
                    className="flex justify-between items-center border p-2 rounded"
                  >
                    <span className="font-medium">{category}</span>
                    <span className="text-gray-700">${total.toFixed(2)}</span>
                  </li>
                )
              )}
            </ul>
          )}

      </>
    )}

    </div>
  );
}
