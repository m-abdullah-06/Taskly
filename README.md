# ✅ Taskly

A clean, feature-rich todo app built with **React** and **Tailwind CSS**. Tasks persist across sessions via localStorage — no backend required.


---

## Features

- **Add tasks** — type and press Enter or click ADD +
- **Priority levels** — tag each task as Low, Medium, or High
- **Due dates** — set a due date per task with overdue highlighting
- **Drag to reorder** — rearrange tasks with a drag handle
- **Inline editing** — double-click any task to edit it in place
- **Filter tabs** — view All, Active, or Completed tasks with counts
- **Clear completed** — bulk-remove finished tasks in one click
- **Persistent storage** — everything saves to localStorage automatically

---

## Tech Stack

- [React](https://react.dev/) — UI and state management
- [Tailwind CSS](https://tailwindcss.com/) — styling
- `localStorage` — client-side persistence (no backend)

---

## Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
git clone https://github.com/your-username/taskly.git
cd taskly
npm install
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## Project Structure

```
src/
├── components/
│   ├── Todo.jsx        # Main app shell, state, and logic
│   └── Todoitems.jsx   # Individual task row component
├── App.jsx
└── main.jsx
```

---

## Keyboard Shortcuts

| Action | Shortcut |
|---|---|
| Add task | `Enter` |
| Save edit | `Enter` |
| Cancel edit | `Escape` |

---

## localStorage Schema

Each task is stored as part of a JSON array under the key `todoList`:

```json
[
  {
    "id": 1718000000000,
    "text": "Buy groceries",
    "isCompleted": false,
    "priority": "high",
    "dueDate": "2025-06-20",
    "createdAt": 1718000000000
  }
]
```

---

