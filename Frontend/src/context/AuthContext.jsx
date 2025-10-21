import { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Backend API base URL
  const API_URL = "http://localhost:5000/api/auth";

  // Signup
  const signup = async (email, password) => {
    const res = await axios.post(`${API_URL}/signup`, { email, password });
    localStorage.setItem("token", res.data.token); // store JWT
    setUser(res.data); // save user
  };

  // Login
  const login = async (email, password) => {
    const res = await axios.post(`${API_URL}/login`, { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);










// // context/AuthContext.jsx
// import { createContext, useContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export function AuthProvider({ children }) {
//   const [user, setUser] = useState(null);

//   // Load user from localStorage on refresh
//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) {
//       setUser(JSON.parse(savedUser));
//     }
//   }, []);

//   const signup = (email, password) => {
//     // check if already exists
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const exists = users.find((u) => u.email === email);
//     if (exists) throw new Error("User already exists");

//     // save new user
//     const newUser = { email, password };
//     users.push(newUser);
//     localStorage.setItem("users", JSON.stringify(users));
//     localStorage.setItem("user", JSON.stringify(newUser));
//     setUser(newUser);
//   };

//   const login = (email, password) => {
//     const users = JSON.parse(localStorage.getItem("users")) || [];
//     const found = users.find(
//       (u) => u.email === email && u.password === password
//     );
//     if (!found) throw new Error("Invalid credentials");
//     localStorage.setItem("user", JSON.stringify(found));
//     setUser(found);
//   };

//   const logout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ user, signup, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

// export function useAuth() {
//   return useContext(AuthContext);
// }




