import "./App.css";
import TaskForm from "./pages/TaskForm";
import TasksList from "./pages/TasksList";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App bg-neutral-900 h-screen text-white">
      <div className="container mx-auto px-20 min-h-screen">
        <header className="flex justify-between items-center py-10">
          <Link to="/">
            <h1 className="text-3xl font-bold">MERN RTK CRUD</h1>
          </Link>
          <Link to="/new-task" className="bg-indigo-500 rounded-sm text-sm px-2 py-1">
            New Task
          </Link>
        </header>

        <Routes>
          <Route path="/" element={<TasksList />} />
          <Route path="/new-task" element={<TaskForm />} />
          <Route path="/tasks/:id" element={<TaskForm />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
