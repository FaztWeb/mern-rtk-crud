import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../features/tasks/tasksSlice";

function TasksList() {
  const { tasks, responseStatus, responseMessage } = useSelector(
    (state) => state.tasks
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  return (
    <div>
      {/* {responseStatus === "success" && <p>{responseMessage}</p>} */}
      {responseStatus === "rejected" && <p>{responseMessage}</p>}

      <h1>Tasks</h1>

      {responseStatus === "pending" ? (
        <p>Loading...</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id}>
            {task.title}
            <p>{task.description}</p>

            <button>edit</button>
            <button>delete</button>
          </div>
        ))
      )}
    </div>
  );
}

export default TasksList;
