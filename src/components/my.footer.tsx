"use client";
import * as React from "react";

const MyFooter = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 text-sm text-gray-500 flex justify-between bg-green-600">
      <p>© 2026 NextMerce</p>
      <div className="flex gap-4">
        <span>Privacy</span>
        <span>Terms</span>
        <span>
          © {new Date().getFullYear()} Shop Tech. All rights reserved.
        </span>
      </div>
    </div>
  );
};

export default MyFooter;
