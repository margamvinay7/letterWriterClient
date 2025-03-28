import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="max-w-screen p-4 bg-white text-black shadow-md flex flex-row justify-between items-center border-b border-gray-200 rounded-t-lg">
      {/* 🔹 App Title */}
      <h2 className="text-2xl font-semibold">Letter Editor</h2>

      {/* 🔹 Navigation Links */}
      <div className="flex gap-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-lg font-medium hover:text-blue-600 ${
              isActive ? "border-b-2 border-blue-600" : ""
            }`
          }
        >
          📄 Letters
        </NavLink>

        <NavLink
          to="/letter"
          className={({ isActive }) =>
            `text-lg font-medium hover:text-blue-600 ${
              isActive ? "border-b-2 border-blue-600" : ""
            }`
          }
        >
          📝 Create Letter
        </NavLink>
      </div>

      {/* 🔹 User Info & Logout */}
      <div className="flex items-center gap-x-4">
        <img
          src={user?.photoURL}
          alt="User"
          className="w-10 h-10 rounded-full"
        />
        <h3>
          Welcome,{" "}
          <span className="text-xl font-semibold">{user?.displayName}</span>
        </h3>
        <h2
          className="text-2xl font-semibold cursor-pointer text-red-500 hover:text-red-600"
          onClick={() => logout(navigate)}
        >
          LogOut
        </h2>
      </div>
    </div>
  );
};

export default Navbar;
