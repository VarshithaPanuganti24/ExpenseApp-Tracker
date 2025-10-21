import { useState ,useEffect} from "react";
import api from "../api";

export default function Balance({ expenses, income, setIncome }) {
  // numeric income
  const [isEditing, setIsEditing] = useState(false); // toggle edit mode
  

  const numericIncome = Number(income) || 0;
  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.amount), 0);
  const balance = numericIncome - totalExpenses;

  const handleSave = () => {
    setIsEditing(false);
  };

  // useEffect(() => {
  //   setLocalIncome(income);
  // }, [income]);
  // // const numericIncome = Number(income) || 0;
  // const totalExpenses = expenses.reduce(
  //   (sum, exp) => sum + Number(exp.amount || 0),
  //   0
  // );
  // const balance = localIncome - totalExpenses;

  // const handleSave = async () => {
  //   try {
  //     await api.put("/income", { amount: localIncome });
  //     setIncome(localIncome); // update parent state
  //     setIsEditing(false);
  //   } catch (err) {
  //     console.error("Failed to update income", err);
  //     alert("Failed to save income");
  //   }
  // };

  return (
    <div>
      {/* Income Section */}
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="block text-sm font-semibold">Income</span>
          {isEditing ? (
            <input
              type="number"
              className="mt-1 p-1 border rounded w-28"
              placeholder="$0.00"
              value={numericIncome}
              onChange={(e) => setIncome(Number(e.target.value))}
            />
          ) : (
            <span className="text-lg font-semibold">${numericIncome}</span>
          )}
        </div>

        {isEditing ? (
          <button
            onClick={handleSave}
            className="px-2 py-1 text-sm bg-green-500 text-white rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-2 py-1 text-sm bg-blue-500 text-white rounded"
          >
            Edit
          </button>
        )}
      </div>

      {/* Balance Display */}
      <div className="flex justify-between text-lg font-semibold">
        <span>Balance:</span>
        <span className={balance < 0 ? "text-red-500" : "text-green-600"}>
          ${balance}
        </span>
      </div>
    </div>
  );
}
