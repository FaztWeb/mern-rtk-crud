import "./App.css";
import TaskForm from "./pages/TaskForm";
import TasksList from "./pages/TasksList";
import { Link, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App bg-neutral-900 h-screen text-white">
      <div className="container mx-auto">
        <header className="flex justify-between items-center p-7">
          <Link to="/">
            <h1 className="text-3xl font-bold">MERN RTK CRUD</h1>
          </Link>
          <Link to="/new-task" className="bg-blue-500 px-2 py-1">
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
