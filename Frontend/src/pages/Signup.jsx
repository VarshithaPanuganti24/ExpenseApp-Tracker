import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
 import api from "../api";

export default function SignUp({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  //const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  //const { signup } = useAuth();
 

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    //setSuccess("");

// Password validation: min 8 chars, letters + numbers
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters long and include letters and numbers"
      );
      return;
    }
    try {
      const res = await api.post("/auth/signup", {
        email,
        password,
      });

      // ✅ Update token state in App (auto-login after signup)
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);

      // ✅ Redirect to home (or you can redirect to login if you prefer)
      navigate("/home");
    }catch(err){
      setError(err.response?.data?.message || "Signup failed");
    }
   
  };  

// Password validation: min 8 chars, at least 1 letter and 1 number
//     const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

//     if (!email) {
//       setError("Email is required");
//       return;
//     }

//     if (!passwordRegex.test(password)) {
//       setError(
//         "Password must be at least 8 characters long and include letters and numbers"
//       );
//       return;
//     }

//     // TODO: Send data to backend for registration
//     setSuccess("Account created successfully!");
//     setEmail("");
//     setPassword("");
//   };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      {/* {success && <p className="text-green-500 mb-2">{success}</p>} */}
      <form onSubmit={handleSignUp} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}




// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
// //   const [confirm, setConfirm] = useState("");
//   const { signup } = useAuth();
//   const navigate = useNavigate();
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password !== confirm) {
//       setError("Passwords do not match");
//       return;
//     }
//     try {
//       signup(email, password);
//       navigate("/login");
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md p-6 rounded-lg w-80 space-y-4"
//       >
//         <h2 className="text-xl font-bold text-center">Sign Up</h2>
//         {error && <p className="text-red-500 text-sm">{error}</p>}
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password (min 8 chars)"
//           minLength="8"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirm}
//           onChange={(e) => setConfirm(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />
//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }







// // src/pages/Signup.jsx
// import { useState } from "react";
// import { useAuth } from "../context/AuthContext";
// import { useNavigate } from "react-router-dom";

// export default function Signup() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState("");
//   const { login } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validation
//     if (!username.trim()) {
//       setError("Username is required");
//       return;
//     }
//     if (password.length < 6) {
//       setError("Password must be at least 6 characters long");
//       return;
//     }
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     // Clear error
//     setError("");

//     // Normally you’d send this data to a backend (API call)
//     // For now we just auto-login user after signup
//     login(username);

//     // Redirect to homepage
//     navigate("/home");
//   };

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white shadow-md p-6 rounded-lg w-80 space-y-4"
//       >
//         <h2 className="text-xl font-bold text-center">Sign Up</h2>

//         {error && (
//           <p className="text-red-500 text-sm text-center">{error}</p>
//         )}

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password (min 6 chars)"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Confirm Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           className="w-full p-2 border rounded"
//           required
//         />

//         <button
//           type="submit"
//           className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
//         >
//           Sign Up
//         </button>
//       </form>
//     </div>
//   );
// }
