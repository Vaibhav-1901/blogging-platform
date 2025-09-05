import React from "react";

function Footer() {
  return (
    <footer className="bg-[#0d0111] text-gray-400 py-6 mt-10 border-t relative bottom-0 border-blue-950">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between px-6">
        
      
        <h2 className="text-lg font-semibold text-purple-400">
          WordSphere
        </h2>

      
        <p className="text-sm mt-2 md:mt-0">
          © {new Date().getFullYear()} WordSphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
