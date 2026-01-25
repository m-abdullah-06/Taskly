import React from "react";
import Check from "../assets/check-circle.png";
import Delete from "../assets/trash.png";
import Cross from "../assets/cross-circle.png";

const Todoitems = ({ text, remove, toggleComplete, isCompleted }) => {
  return (
    <div
      className="flex items-center my-3 gap-2 flex items-center justify-between
  bg-white/5
  hover:bg-white/10
  transition
  rounded-xl
  px-4 py-3"
    >
      <div className="flex flex-1 items-center cursor-pointer">
        <button onClick={toggleComplete} className="p-1">
          {isCompleted ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-emerald-400 hover:text-emerald-300 transition"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6 text-rose-700 hover:text-rose-400 transition"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </button>

        <p
          className={`text-white/90 ml-4 text-[18px] break-words ${isCompleted ? "line-through" : ""}`}
        >
          {text}
        </p>
      </div>
      <button onClick={remove}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5 h-5 text-white/30 hover:text-rose-400 transition cursor-pointer"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};

export default Todoitems;
