import { useState, useEffect } from "react";
import axios from "axios";
import api from "../api";

export default function ExpenseForm({ onSubmitExpense, initialData }) {
  const [amount, setAmount] = useState(initialData?.amount || "");
  const [category, setCategory] = useState(initialData?.category || "");
  const [date, setDate] = useState(
    initialData?.date
      ? new Date(initialData.date).toISOString().split("T")[0]
      : ""
  );
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [categories, setCategories] = useState([]);

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await api.get("/categories");
        setCategories(res.data.map((cat) => cat.name));
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !category || !date) return;
    const parsedAmount = parseFloat(amount);
    const parsedDate = new Date(date);

    if (isNaN(parsedAmount)) {
      alert("Amount must be a valid number");
      return;
    }

    if (isNaN(parsedDate.getTime())) {
      alert("Date is invalid");
      return;
    }
    // Correctly named object
    const expenseData = {
      amount: parsedAmount,
      category,
      date: parsedDate.toISOString(),
      description,
    };
    try {
      // ✅ Instead of calling axios here, call parent handler
      await onSubmitExpense({
        ...expenseData,
        _id: initialData?._id, // send _id if updating
      });

      // Reset form if adding new
      if (!initialData?._id) {
        setAmount("");
        setCategory("");
        setDate("");
        setDescription("");
      }
    } catch (err) {
      console.error("Error saving expense:", err);
      alert("Failed to save expense");
    }

  };

  //   try {
  //     let res;
  //     if (initialData?._id) {
  //       // Update existing expense
  //       res = await axios.put(
  //         `http://localhost:5000/api/expenses/${initialData._id}`,
  //         expenseData
  //       );
  //     } else {
  //       // Add new expense
  //       res = await axios.post(
  //         "http://localhost:5000/api/expenses",
  //         expenseData
  //       );
  //     }

  //     // Call parent callback with returned expense
  //     onSubmitExpense(res.data);

  //     // Reset form if adding new
  //     if (!initialData?._id) {
  //       setAmount("");
  //       setCategory("");
  //       setDate("");
  //       setDescription("");
  //     }
  //   } catch (err) {
  //     console.error("Error saving expense:", err);
  //     alert("Failed to save expense");
  //   }
  // };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
      <input
        type="number"
        placeholder="Amount"
        className="border p-2"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select
        className="border p-2"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <input
        type="date"
        className="border p-2"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      <textarea
        placeholder="Description"
        className="border p-2"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <button className="bg-green-500 text-white px-4 py-2 rounded">
        {initialData ? "Update Expense" : "Add Expense"}
      </button>
    </form>
  );
}

// import { useState, useEffect } from "react";
// import axios from "axios";
// export default function ExpenseForm({ onSubmitExpense, initialData }) {
//   const [amount, setAmount] = useState(initialData?.amount || "");
//   const [category, setCategory] = useState(initialData?.category || "");
//   const [date, setDate] = useState(initialData?.date || "");
//   const [description, setDescription] = useState(
//     initialData?.description || ""
//   );
//   const [categories, setCategories] = useState([]);

//   // Fetch categories from backend
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/categories");
//         setCategories(res.data.map((cat) => cat.name));
//       } catch (err) {
//         console.error("Error fetching categories:", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // useEffect(() => {
//   //   setCategories(["Food", "Transport", "Shopping", "Bills", "Other"]);
//   // }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!amount || !category || !date) return;

//     const expense = {
//       //id: initialData?.id || Date.now(),
//       amount: parseFloat(amount),
//       category,
//       date,
//       description,
//     };
//     try {
//       let res;
//       if (initialData?._id) {
//         // Update existing expense
//         res =  axios.put(
//           `http://localhost:5000/api/expenses/${initialData._id}`,
//           expenseData
//         );
//       } else {
//         // Add new expense
//         res =  axios.post("http://localhost:5000/api/expenses", expenseData);
//       }

//       // Call parent callback with returned expense
//       onSubmitExpense(res.data);

//       // Reset form if adding new
//       if (!initialData?._id) {
//         setAmount("");
//         setCategory("");
//         setDate("");
//         setDescription("");
//       }
//     } catch (err) {
//       console.error("Error saving expense:", err);
//       alert("Failed to save expense");
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-4">
//       <input
//         type="number"
//         placeholder="Amount"
//         className="border p-2"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />

//       <select
//         className="border p-2"
//         value={category}
//         onChange={(e) => setCategory(e.target.value)}
//       >
//         <option value="">Select Category</option>
//         {categories.map((cat) => (
//           <option key={cat} value={cat}>
//             {cat}
//           </option>
//         ))}
//       </select>

//       <input
//         type="date"
//         className="border p-2"
//         value={date}
//         onChange={(e) => setDate(e.target.value)}
//       />

//       <textarea
//         placeholder="Description"
//         className="border p-2"
//         value={description}
//         onChange={(e) => setDescription(e.target.value)}
//       ></textarea>

//       <button className="bg-green-500 text-white px-4 py-2 rounded">
//         {initialData ? "Update Expense" : "Add Expense"}
//       </button>
//     </form>
//   );
// }
