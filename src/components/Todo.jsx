import React, { useRef, useState } from "react";
import taskChecklistImage from "../assets/task-checklist.png";
import Todoitems from "./todoitems";

const Todo = () => {
  const [todoList, setTodoList] = useState([]);

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    console.log(inputText);
  };

  return (
    <div className="bg-white place-self-center w-11/12 max-w-md flex flex-col p-7 min-h-137.5 rounded-xl">
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8" src={taskChecklistImage} alt="" />
        <h1 className="text-3xl font-bold">Taskly</h1>
      </div>
      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="bg-transparent border-0 outline-none flex-1 h-14 pl-6 pr-2 placeholder:text-gray-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="border-none rounded-full bg-amber-600 w-32 h-14 text-white text-lg font-semibold cursor-pointer"
        >
          ADD +
        </button>
      </div>
      <div>
        <Todoitems text="Task 1" />
        <Todoitems text="Task 2" />
      </div>
    </div>
  );
};

export default Todo;
