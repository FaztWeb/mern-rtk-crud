import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, updateTask } from "../features/tasks/tasksSlice";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { getTask } from "../api/tasks";

function TaskForm() {
  const [task, setTask] = useState({
    title: "",
    description: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { responseStatus, responseMessage } = useSelector(
    (state) => state.tasks
  );

  const params = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (params.id) {
      dispatch(
        updateTask({
          _id: params.id,
          title: task.title,
          description: task.description,
        })
      );
    } else {
      dispatch(createTask(task));
    }

    return navigate("/");
  };

  useEffect(() => {
    if (params.id) {
      console.log(params.id);
      const loadTask = async () => {
        try {
          const response = await getTask(params.id);
          setTask(response.data);
        } catch (error) {
          console.error(error);
        }
      };
      loadTask();
    }
  }, [params.id]);

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="max-w-sm mx-auto">
      {/* {responseStatus === "success" && <Navigate to="/" />}
      {responseStatus === "rejected" && <p>{responseMessage}</p>} */}
      <form onSubmit={handleSubmit} className="bg-zinc-800 p-10">
        <label htmlFor="title" className="block text-sm font-medium py-1">
          Title
        </label>
        <input
          type="text"
          placeholder="Task name"
          name="title"
          onChange={handleChange}
          className="p-2 w-full text-white bg-zinc-700 placeholder:text-neutral-400 rounded-md"
          autoFocus
          value={task.title}
        />

        <label htmlFor="description" className="block text-sm font-medium py-1">
          Description:
        </label>
        <textarea
          name="description"
          rows="3"
          placeholder="Write a Description"
          onChange={handleChange}
          className="p-2 w-full text-white bg-zinc-700 placeholder:text-neutral-400 rounded-md"
          value={task.description}
        ></textarea>

        <button className="block bg-indigo-500 px-2 py-1 w-full">Save</button>
      </form>
    </div>
  );
}

export default TaskForm;
