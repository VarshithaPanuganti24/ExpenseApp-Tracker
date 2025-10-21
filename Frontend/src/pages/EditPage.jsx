import ExpenseForm from "../components/ExpenseForm";

import { useParams, useNavigate } from "react-router-dom";


export default function EditPage({ expenses, onAddExpense, onUpdateExpense }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const expenseToEdit = id
    ? expenses.find((exp) => exp._id === id)
    : null;

  const handleSubmit = async (expense) => {
    if (id) {
      await onUpdateExpense({ ...expense, _id: id});
    } else {
      await onAddExpense(expense);
    }
    navigate("/home"); // go back home after save
  };

  return (
    <div className="p-4 max-w-md mx-auto min-h-screen bg-gray-50">
      <h1 className="text-xl font-bold">
        {id ? "Update Expense" : "Add Expense"}
      </h1>
      <ExpenseForm
        onSubmitExpense={handleSubmit}
        initialData={expenseToEdit}
      />
    </div>
  );
}

// export default function EditPage({ onAddExpense }) {
  
//   return (
//     <div className="p-4 max-w-md mx-auto min-h-screen bg-gray-50">
//       <h1 className="text-xl font-bold">Add / Update Expense</h1>
//       <ExpenseForm onAddExpense={onAddExpense} />
//     </div>
//   );
// }
