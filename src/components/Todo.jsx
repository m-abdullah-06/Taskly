import React, { useCallback, useEffect, useRef, useState } from "react";
import Todoitems from "./Todoitems.jsx";

const Todo = () => {
  const [todoList, setTodoList] = useState(() => {
    const stored = localStorage.getItem("todoList");
    return stored ? JSON.parse(stored) : [];
  });
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("medium");
  const [dueDate, setDueDate] = useState("");
  const [dragOverId, setDragOverId] = useState(null);
  const inputRef = useRef();

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  const add = useCallback(() => {
    const inputText = inputRef.current.value.trim();
    if (!inputText) return;
    const newTodo = {
      id: Date.now(),
      text: inputText,
      isCompleted: false,
      priority,
      dueDate: dueDate || null,
      createdAt: Date.now(),
    };
    setTodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = "";
    setDueDate("");
    setPriority("medium");
  }, [priority, dueDate]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter") add();
    },
    [add],
  );

  const remove = useCallback((id) => {
    setTodoList((prev) => prev.filter((todo) => todo.id !== id));
  }, []);

  const toggleComplete = useCallback((id) => {
    setTodoList((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  }, []);

  const editText = useCallback((id, newText) => {
    setTodoList((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo)),
    );
  }, []);

  const clearCompleted = useCallback(() => {
    setTodoList((prev) => prev.filter((todo) => !todo.isCompleted));
  }, []);

  // Drag-and-drop handlers
  const handleDragStart = useCallback((e, id) => {
    e.dataTransfer.setData("dragId", id);
  }, []);

  const handleDragOver = useCallback((e, id) => {
    e.preventDefault();
    setDragOverId(id);
  }, []);

  const handleDrop = useCallback((e, targetId) => {
    e.preventDefault();
    const dragId = Number(e.dataTransfer.getData("dragId"));
    setTodoList((prev) => {
      const list = [...prev];
      const fromIndex = list.findIndex((t) => t.id === dragId);
      const toIndex = list.findIndex((t) => t.id === targetId);
      if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex)
        return list;
      const [moved] = list.splice(fromIndex, 1);
      list.splice(toIndex, 0, moved);
      return list;
    });
    setDragOverId(null);
  }, []);

  const handleDragEnd = useCallback(() => setDragOverId(null), []);

  const filteredList = todoList.filter((todo) => {
    if (filter === "completed") return todo.isCompleted;
    if (filter === "active") return !todo.isCompleted;
    return true;
  });

  const counts = {
    all: todoList.length,
    active: todoList.filter((t) => !t.isCompleted).length,
    completed: todoList.filter((t) => t.isCompleted).length,
  };

  const PRIORITY_COLORS = {
    high: "text-rose-400",
    medium: "text-amber-400",
    low: "text-emerald-400",
  };

  return (
    <div className="bg-gradient-to-br from-[#2a2d3a] to-[#1f2230] border border-white/5 shadow-2xl rounded-2xl p-7 place-self-center w-11/12 max-w-md flex flex-col min-h-[550px] animate-fadeInUp">
      {/* Header */}
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

      {/* Subtitle with active count */}
      <div className="flex items-center justify-between mt-5">
        <p className="text-white/60 text-lg">Today's Tasks</p>
        {counts.active > 0 && (
          <span className="text-xs bg-blue-500/20 text-blue-300 px-2.5 py-1 rounded-full font-medium">
            {counts.active} remaining
          </span>
        )}
      </div>

      {/* Input area */}
      <div className="flex flex-col gap-2 my-5">
        <div className="flex items-center rounded-full bg-white/5">
          <input
            ref={inputRef}
            onKeyDown={handleKeyDown}
            className="bg-transparent placeholder:text-white/40 text-white px-4 py-2 rounded-full outline-none focus:ring-2 focus:ring-blue-500/50 w-full h-14"
            type="text"
            placeholder="Add your task (Enter to add)"
          />
          <button
            onClick={add}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-semibold px-5 py-2 rounded-full transition shadow-lg w-32 h-14 cursor-pointer flex-shrink-0"
          >
            ADD +
          </button>
        </div>

        {/* Priority & due date row */}
        <div className="flex gap-2 px-1">
          {/* Priority selector */}
          <div className="flex gap-1">
            {["low", "medium", "high"].map((p) => (
              <button
                key={p}
                onClick={() => setPriority(p)}
                className={`text-xs px-3 py-1 rounded-full font-medium border transition capitalize cursor-pointer ${
                  priority === p
                    ? `border-current bg-white/10 ${PRIORITY_COLORS[p]}`
                    : "border-white/10 text-white/30 hover:text-white/50"
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Due date picker */}
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="ml-auto text-xs bg-white/5 text-white/50 border border-white/10 rounded-full px-3 py-1 outline-none focus:ring-1 focus:ring-blue-500/50 cursor-pointer"
          />
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex justify-center gap-2 mb-4">
        {["all", "active", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full font-semibold text-sm capitalize transition cursor-pointer relative ${
              filter === f
                ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-md"
                : "bg-white/5 text-white/40 hover:text-white/60"
            }`}
          >
            {f}
            {counts[f] > 0 && (
              <span
                className={`ml-1.5 text-xs font-bold ${
                  filter === f ? "text-white/70" : "text-white/30"
                }`}
              >
                {counts[f]}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Todo list */}
      <div className="overflow-y-auto flex-1 max-h-96">
        {filteredList.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 gap-3 text-white/20">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-10 h-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <p className="text-sm">
              {filter === "completed"
                ? "No completed tasks yet"
                : filter === "active"
                  ? "Nothing left to do!"
                  : "Add your first task above"}
            </p>
          </div>
        ) : (
          filteredList.map((todo) => (
            <Todoitems
              key={todo.id}
              todo={todo}
              remove={() => remove(todo.id)}
              toggleComplete={() => toggleComplete(todo.id)}
              editText={(newText) => editText(todo.id, newText)}
              isDragOver={dragOverId === todo.id}
              onDragStart={(e) => handleDragStart(e, todo.id)}
              onDragOver={(e) => handleDragOver(e, todo.id)}
              onDrop={(e) => handleDrop(e, todo.id)}
              onDragEnd={handleDragEnd}
            />
          ))
        )}
      </div>

      {/* Footer: clear completed */}
      {counts.completed > 0 && (
        <button
          onClick={clearCompleted}
          className="mt-4 text-xs text-white/25 hover:text-rose-400 transition cursor-pointer text-right"
        >
          Clear {counts.completed} completed
        </button>
      )}
    </div>
  );
};

export default Todo;
