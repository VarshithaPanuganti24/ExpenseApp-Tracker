import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import "./App.css";
import HomePage from "./pages/HomePage";
import EditPage from "./pages/EditPage";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import api from "./api";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [income, setIncome] = useState(0);
  const [viewBy, setViewBy] = useState("date");
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  
  // 🔹 Keep localStorage in sync with token
  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  // 🔹 Fetch both expenses + income when token changes
  useEffect(() => {
    if (!token) {
      setExpenses([]);
      setIncome(0);
      setLoading(false);
      return; // not logged in
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const [expRes, incRes] = await Promise.all([
          api.get("/expenses", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/income", { headers: { Authorization: `Bearer ${token}` } }),
        ]);
        setExpenses(expRes.data || []);
        setIncome(incRes.data.amount || 0);
      } catch (err) {
        console.error("Error fetching data:", err);
        setExpenses([]);
        setIncome(0);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleUpdateIncome = async (newIncome) => {
    try {
      const res = await api.put(
        "/income",
        { amount: newIncome },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIncome(res.data.amount);
    } catch (err) {
      console.error("Failed to update income:", err);
    }
  };

  // Delete expense from backend
  const handleDeleteExpense = async (id) => {
    try {
      await api.delete(`/expenses/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // Update local state after deletion
      setExpenses(expenses.filter((exp) => exp._id !== id));
    } catch (err) {
      console.error("Failed to delete expense:", err);
      alert("Error deleting expense");
    }
  };
  // Add new expense to backend
  const handleAddExpense = async (expense) => {
    try {
      const res = await api.post("/expenses", expense, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses((prev) => [res.data, ...prev]);
    } catch (err) {
      console.error("Failed to add expense:", err);
    }
  };

  // Update expense in backend
  const handleUpdateExpense = async (expense) => {
    try {
      const res = await api.put(`/expenses/${expense._id}`, expense, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExpenses((prev) =>
        prev.map((exp) => (exp._id === res.data._id ? res.data : exp))
      );
    } catch (err) {
      console.error("Failed to update expense:", err);
    }
  };
  if (loading) return <div className="overlay">Loading...</div>;
  return (
    <Router>
      <Navbar token={token} setToken={setToken} />
      <Routes>
        {/* Default "/" goes to Login page */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/home" /> : <Login setToken={setToken} />
          }
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/signup" element={<Signup setToken={setToken} />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute token={token}>
              {" "}
              <HomePage
                expenses={expenses}
                setExpenses={setExpenses}
                income={income}
                setIncome={handleUpdateIncome}
                onDeleteExpense={handleDeleteExpense}
                viewBy={viewBy}
                setViewBy={setViewBy}
              />{" "}
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id?"
          element={
            <ProtectedRoute token={token}>
              {" "}
              <EditPage
                expenses={expenses}
                onAddExpense={handleAddExpense}
                onUpdateExpense={handleUpdateExpense}
              />{" "}
            </ProtectedRoute>
          }
        />
        /* id? means optional → can be used for both Add and Update */
      </Routes>
    </Router>
  );
}

export default App;
