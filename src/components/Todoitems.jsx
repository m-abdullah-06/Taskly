import React from "react";
import Check from "../assets/check-circle.png";
import Delete from "../assets/trash.png";

const Todoitems = ({ text }) => {
  return (
    <div className="flex items-center my-3 gap-2">
      <div className="flex flex-1 items-center cursor-pointer">
        <img className="w-7" src={Check} alt="" />
        <p className="text-slate-700 ml-4 text-[17px]">{text}</p>
      </div>
      <img className="w-5 cursor-pointer" src={Delete} alt="" />
    </div>
  );
};

export default Todoitems;
