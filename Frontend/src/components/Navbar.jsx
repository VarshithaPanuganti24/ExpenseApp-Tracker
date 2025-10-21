import { Link, useNavigate } from "react-router-dom";

export default function Navbar({ token, setToken }) {
  const navigate = useNavigate();
  //const token = localStorage.getItem("token"); // ✅ check if user logged in

  const handleLogout = () => {
    setToken(null) // ✅ clear token
    localStorage.removeItem("token");
    navigate("/login"); // ✅ redirect to login
  };

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <div className="font-bold">Expense App</div>
      <div className="space-x-4">
        {!token ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
          </>
        ) : (
          <>
            <Link to="/home">Home</Link>
            <Link to="/edit">Add Expense</Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}




// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useAuth();

//   return (
//     <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
//       <div className="font-bold">Expense App</div>
//       <div className="space-x-4">
//         {!user ? (
//           <>
//             <Link to="/">Login</Link>
//             <Link to="/signup">Sign Up</Link>
//           </>
//         ) : (
//           <>
//             <Link to="/home">Home</Link>
//             <Link to="/edit/:id?">Add Expense</Link>
            

//             <button onClick={logout} className="bg-red-500 px-3 py-1 rounded">
//               Logout
//             </button>
//           </>
//         )}
//       </div>
//     </nav>
//   );
// }



// // src/components/Navbar.jsx
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// export default function Navbar() {
//   const { user, logout } = useAuth();

//   return (
//     <nav className="flex justify-between items-center p-4 shadow bg-white">
//       <Link to="/" className="text-blue-600 font-bold text-lg">
//         Expense Tracker
//       </Link>
//       <div className="space-x-4">
//         {!user ? (
//           <>
//             <Link to="/login" className="hover:underline">Login</Link>
//             <Link to="/signup" className="hover:underline">Sign Up</Link>
//           </>
//         ) : (
//           <button
//             onClick={logout}
//             className="text-red-500 hover:underline"
//           >
//             Logout
//           </button>
//         )}
//       </div>
//     </nav>
//   );
// }







