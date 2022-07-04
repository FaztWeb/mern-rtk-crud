import { useDispatch } from "react-redux";
import { deleteTask } from "../features/tasks/tasksSlice";
import { useNavigate } from "react-router-dom";

export function TaskCard({ task }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/tasks/${id}`);
  };

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  return (
    <div className="bg-zinc-800 rounded-md text-white p-4">
      <header className="flex justify-between">
        <h3>{task.title}</h3>
        <div className="flex gap-x-2">
          <button
            onClick={() => handleDelete(task._id)}
            className="bg-red-500 px-2 py-1 text-sm"
          >
            delete
          </button>
          <button
            onClick={() => handleEdit(task._id)}
            className="bg-slate-300 text-black px-2 py-1 text-sm"
          >
            edit
          </button>
        </div>
      </header>
      <p className="text-slate-400">{task.description}</p>
    </div>
  );
}
