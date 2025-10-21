import Balance from "../components/Balance";
import ExpenseList from "../components/ExpenseList";
import AddExpenseButton from "../components/AddExpenseButton";
import ViewToggle from "../components/ViewToggle";
import ImportExportSection from "../components/ImportExportSection";

export default function HomePage({
  expenses,
  onDeleteExpense,
  income,
  setIncome,
  viewBy,
  setViewBy,
}) {
  return (
    <div className="p-4 max-w-md mx-auto min-h-screen bg-gray-50">
      <h1 className="text-xl font-bold text-center mb-4">Expense Tracker</h1>

      <div className="flex items-center justify-between mb-10">
        <h1 className="text-lg font-bold">Hello User </h1>
        <AddExpenseButton />
      </div>
      {/* Balance Section */}
      <div className="mb-2 p-2 bg-white rounded-lg shadow">
        <Balance expenses={expenses} income={income} setIncome={setIncome} />
      </div>
      <ViewToggle viewBy={viewBy} setViewBy={setViewBy} />
      <ImportExportSection />
      {/* Expense List Section */}
      <div className="mb-2 p-2 bg-white rounded-lg shadow">
        <ExpenseList
          expenses={expenses}
          viewBy={viewBy}
          onDeleteExpense={onDeleteExpense}
        />
      </div>
    </div>
  );
}
