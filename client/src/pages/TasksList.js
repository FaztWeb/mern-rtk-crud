import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TaskCard } from "../components/taskCard";
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

      {responseStatus === "pending" ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-4 gap-3">
          {tasks.map((task) => (
            <TaskCard task={task} key={task._id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default TasksList;
