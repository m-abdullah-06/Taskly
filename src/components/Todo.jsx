import React, { useEffect, useRef, useState } from "react";
import Todoitems from "./todoitems";

const Todo = () => {
  const [todoList, setTodoList] = useState(
    localStorage.getItem("todoList")
      ? JSON.parse(localStorage.getItem("todoList"))
      : [],
  );
  const [filter, setFilter] = useState("all");

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();
    const newTodo = {
      id: new Date().getTime(),
      text: inputText,
      isCompleted: false,
    };

    if (inputText !== "") {
      setTodoList([...todoList, newTodo]);
      inputRef.current.value = "";
    }
  };

  const remove = (id) => {
    const newTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(newTodoList);
  };

  const toggleComplete = (id) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });
    setTodoList(newTodoList);
  };

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todoList"));
    if (storedTodos) {
      setTodoList(storedTodos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const filteredList = todoList.filter((todo) => {
    if (filter === "all") return true;
    if (filter === "completed") return todo.isCompleted;
    return !todo.isCompleted; // active
  });

  return (
    <div
      className="bg-gradient-to-br from-[#2a2d3a] to-[#1f2230]
  border border-white/5
  shadow-2xl
  rounded-2xl
  p-7 place-self-center w-11/12 max-w-md flex flex-col min-h-137.5 animate-fadeInUp"
    >
      <div className="flex items-center mt-7 gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-6 h-6 text-blue-400 drop-shadow-[0_0_6px_rgba(96,165,250,0.6)]"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="M9 12l2 2 4-4" />
        </svg>

        <h1 className="text-white/90 text-3xl font-semibold">Taskly</h1>
      </div>
      <p className="text-white/60 text-lg mt-5">Today's Tasks</p>
      <div className="flex items-center my-7 rounded-full bg-white/5">
        <input
          ref={inputRef}
          className="bg-white/5
  placeholder:text-white/40
  text-white
  px-4 py-2
  rounded-full
  outline-none
  focus:ring-2 focus:ring-blue-500/50
  w-full h-14"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className=" bg-gradient-to-r from-blue-500 to-indigo-500
  hover:from-blue-400 hover:to-indigo-400
  text-white font-semibold
  px-5 py-2
  rounded-full
  transition
  shadow-lg w-32 h-14 cursor-pointer"
        >
          ADD +
        </button>
      </div>
      <div className="flex justify-center gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-full font-semibold ${filter === "all" ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white" : "bg-white/5 text-white/40"} cursor-pointer`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("active")}
          className={`px-4 py-2 rounded-full font-semibold ${filter === "active" ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white" : "bg-white/5 text-white/40"} cursor-pointer`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`px-4 py-2 rounded-full font-semibold ${filter === "completed" ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white" : "bg-white/5 text-white/40"} cursor-pointer`}
        >
          Completed
        </button>
      </div>
      <div className="overflow-y-auto max-h-96">
        {filteredList.map((todo) => (
          <Todoitems
            key={todo.id}
            text={todo.text}
            remove={() => remove(todo.id)}
            toggleComplete={() => toggleComplete(todo.id)}
            isCompleted={todo.isCompleted}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
