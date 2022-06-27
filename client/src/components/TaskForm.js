import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "../features/tasks/tasksSlice";

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask(task));
  };

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        placeholder="Task name"
        name="title"
        onChange={handleChange}
      />

      <label htmlFor="description">Description:</label>
      <textarea
        name="description"
        rows="3"
        placeholder="Write a Description"
        onChange={handleChange}
      ></textarea>

      <button>Save</button>
    </form>
  );
}

export default TaskForm;
