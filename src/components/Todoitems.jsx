import React, { useCallback, useRef, useState } from "react";

const PRIORITY_STYLES = {
  high: {
    border: "border-l-rose-500",
    dot: "bg-rose-400",
    label: "text-rose-400",
  },
  medium: {
    border: "border-l-amber-500",
    dot: "bg-amber-400",
    label: "text-amber-400",
  },
  low: {
    border: "border-l-emerald-500",
    dot: "bg-emerald-400",
    label: "text-emerald-400",
  },
};

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-");
  return new Date(y, m - 1, d);
};

const isOverdue = (dateStr) => {
  const date = formatDate(dateStr);
  if (!date) return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

const formatDisplay = (dateStr) => {
  const date = formatDate(dateStr);
  if (!date) return null;
  return date.toLocaleDateString(undefined, { month: "short", day: "numeric" });
};

const Todoitems = ({
  todo,
  remove,
  toggleComplete,
  editText,
  isDragOver,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}) => {
  const { text, isCompleted, priority = "medium", dueDate } = todo;
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(text);
  const inputRef = useRef();
  const style = PRIORITY_STYLES[priority] || PRIORITY_STYLES.medium;
  const overdue = !isCompleted && isOverdue(dueDate);

  const startEdit = useCallback(() => {
    setIsEditing(true);
    setEditValue(text);
    setTimeout(() => inputRef.current?.focus(), 0);
  }, [text]);

  const commitEdit = useCallback(() => {
    const trimmed = editValue.trim();
    if (trimmed && trimmed !== text) editText(trimmed);
    setIsEditing(false);
  }, [editValue, text, editText]);

  const handleEditKey = useCallback(
    (e) => {
      if (e.key === "Enter") commitEdit();
      if (e.key === "Escape") {
        setEditValue(text);
        setIsEditing(false);
      }
    },
    [commitEdit, text],
  );

  return (
    <div
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      className={`flex items-center my-2 gap-2 justify-between
        bg-white/5 hover:bg-white/10 transition-all
        rounded-xl px-3 py-3
        border-l-2 ${style.border}
        ${isDragOver ? "ring-1 ring-blue-400/50 scale-[1.01]" : ""}
      `}
    >
      {/* Drag handle */}
      <div
        className="flex-shrink-0 cursor-grab active:cursor-grabbing text-white/15 hover:text-white/40 transition px-1"
        title="Drag to reorder"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="9" cy="6" r="1" fill="currentColor" />
          <circle cx="15" cy="6" r="1" fill="currentColor" />
          <circle cx="9" cy="12" r="1" fill="currentColor" />
          <circle cx="15" cy="12" r="1" fill="currentColor" />
          <circle cx="9" cy="18" r="1" fill="currentColor" />
          <circle cx="15" cy="18" r="1" fill="currentColor" />
        </svg>
      </div>

      {/* Complete toggle */}
      <button onClick={toggleComplete} className="flex-shrink-0 p-1">
        {isCompleted ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 text-emerald-400 hover:text-emerald-300 transition"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <div
            className={`w-5 h-5 rounded-full border-2 border-white/20 hover:border-white/50 transition flex items-center justify-center`}
          />
        )}
      </button>

      {/* Text / edit area */}
      <div
        className="flex flex-col flex-1 min-w-0"
        onDoubleClick={!isEditing ? startEdit : undefined}
      >
        {isEditing ? (
          <input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={handleEditKey}
            className="bg-white/10 text-white rounded-lg px-2 py-0.5 outline-none focus:ring-1 focus:ring-blue-400/60 text-[15px] w-full"
          />
        ) : (
          <p
            className={`text-[15px] break-words leading-snug ${
              isCompleted ? "line-through text-white/30" : "text-white/90"
            }`}
            title="Double-click to edit"
          >
            {text}
          </p>
        )}

        {/* Due date badge */}
        {dueDate && (
          <span
            className={`text-xs mt-1 font-medium ${
              overdue
                ? "text-rose-400"
                : isCompleted
                  ? "text-white/20"
                  : "text-white/35"
            }`}
          >
            {overdue ? "⚠ Overdue · " : "📅 "}
            {formatDisplay(dueDate)}
          </span>
        )}
      </div>

      {/* Priority dot */}
      <div
        className={`flex-shrink-0 w-2 h-2 rounded-full ${style.dot} opacity-70`}
        title={`${priority} priority`}
      />

      {/* Delete */}
      <button
        onClick={remove}
        className="flex-shrink-0 p-1"
        title="Delete task"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4 text-white/20 hover:text-rose-400 transition cursor-pointer"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
};

export default Todoitems;
