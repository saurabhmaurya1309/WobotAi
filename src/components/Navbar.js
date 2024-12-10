import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 to-blue-700 text-white py-4 px-8 flex justify-between items-center shadow-lg">
      <NavLink to="/" className="text-2xl font-bold hover:text-gray-200">
        Recipe Book
      </NavLink>
      <div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "text-gray-200 underline font-medium mr-4"
              : "hover:underline hover:text-gray-200 mr-4"
          }
        >
          Home
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
