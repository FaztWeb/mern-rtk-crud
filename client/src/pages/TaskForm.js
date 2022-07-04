import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../features/tasks/tasksSlice";
import { useNavigate } from "react-router-dom";

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask(task));
    navigate("/");
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-sm mx-auto">
      <form onSubmit={handleSubmit} className="bg-zinc-800 p-10">
        <label htmlFor="title" className="block">
          Title:
        </label>
        <input
          type="text"
          placeholder="Task name"
          name="title"
          onChange={handleChange}
          className="p-2 w-full text-black bg-zinc-400 placeholder:text-neutral-600"
          autoFocus
        />

        <label htmlFor="description" className="block">
          Description:
        </label>
        <textarea
          name="description"
          rows="3"
          placeholder="Write a Description"
          onChange={handleChange}
          className="p-2 w-full text-black bg-zinc-400 placeholder:text-neutral-600"
        ></textarea>

        <button className="block bg-indigo-500 px-2 py-1 w-full">Save</button>
      </form>
    </div>
  );
}

export default TaskForm;
