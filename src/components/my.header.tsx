"use client";
import * as React from "react";

const MyHeader = () => {
  return (
    <header className="bg-white shadow-sm text-black">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">NextMerce</h1>
        <input
          placeholder="Search products..."
          className="border rounded-xl px-4 py-2 w-1/2"
        />
        <div className="flex gap-4 text-sm">
          <button>Login</button>
          <button className="bg-black text-white px-4 py-2 rounded-xl">
            Cart
          </button>
        </div>
      </div>

      {/* Navbar */}
      <nav className="border-t">
        <div className="max-w-7xl mx-auto px-4 py-2 flex gap-6 text-sm">
          <span className="font-medium">Home</span>
          <span>Shop</span>
          <span>Contact</span>
          <span>Blog</span>
        </div>
      </nav>
    </header>
  );
};

export default MyHeader;
