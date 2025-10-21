import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="p-4 max-w-md mx-auto">
        <Outlet /> {/* renders the current page */}
      </main>
    </div>
  );
}
