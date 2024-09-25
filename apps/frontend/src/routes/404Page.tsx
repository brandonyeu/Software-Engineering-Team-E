import React from "react";
import { Link } from "react-router-dom";
function BadRoutePage() {
  return (
    <div className="flex flex-col h-screen justify-center items-center font-bold">
      <div>404 Error</div>
      <div>This Page Doesn't Exist</div>
      <div className="mt-6">
        <Link
          to="/Gravity-Ball-Game-page"
          className="py-4 px-8 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-600 transition duration-300"
        >
          Click to Play Gravity-Ball Game
        </Link>
      </div>
    </div>
  );
}
export default BadRoutePage;
