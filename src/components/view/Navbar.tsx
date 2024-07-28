import React from "react";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between h-20 bg-white border-b border-slate-100 px-10">
      <div>
        <span className="text-2xl font-semibold">Bank Kata</span>
      </div>
      <div className="flex items-center space-x-2">
        <div className="rounded-full border border-gray-400 w-8 h-8 flex items-center justify-center">
          <i className="ri-user-3-line text-base text-gray-400"></i>
        </div>
        <span className="text-sm font-semibold">Olajide Ibukunoluwa</span>
      </div>
    </nav>
  );
};

export default Navbar;
