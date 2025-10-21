import { Link } from "react-router-dom";

export default function AddExpenseButton() {
  return (
    
    <Link
      to="/edit"
      className="inline-block bg-blue-500 text-white px-4 py-2 top-right rounded mt-4"
    >
      + Add Expense
    </Link>
  );
}
