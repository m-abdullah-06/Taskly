import React from "react";
import Check from "../assets/check-circle.png";
import Delete from "../assets/trash.png";
import Cross from "../assets/cross-circle.png";

const Todoitems = ({ text, remove, toggleComplete, isCompleted }) => {
  return (
    <div className="flex items-center my-3 gap-2">
      <div className="flex flex-1 items-center cursor-pointer">
        <img
          onClick={toggleComplete}
          className="w-7"
          src={isCompleted ? Check : Cross}
          alt=""
        />
        <p
          className={`text-slate-700 ml-4 text-[18px] ${isCompleted ? "line-through" : ""}`}
        >
          {text}
        </p>
      </div>
      <img
        onClick={remove}
        className="w-5 cursor-pointer"
        src={Delete}
        alt=""
      />
    </div>
  );
};

export default Todoitems;
