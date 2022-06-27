import { Router } from "express";
import {
  createTaskHandler,
  deleteTaskHandler,
  getTasksHandler,
  updateTaskHandler,
} from "../controllers/tasks.controllers.js";

const router = Router();

router.get("/tasks", getTasksHandler);
router.post("/tasks", createTaskHandler);
router.delete("/tasks/:id", deleteTaskHandler);
router.put("/tasks/:id", updateTaskHandler);

export default router;
