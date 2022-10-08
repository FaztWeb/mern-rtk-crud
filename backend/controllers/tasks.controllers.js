import Task from "../models/Task.js";
import Joi from "joi";

export const getTasksHandler = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

export const createTaskHandler = async (req, res) => {
  try {
    const schema = Joi.object({
      title: Joi.string().min(3).max(300).required(),
      description: Joi.string().min(3).max(300).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const task = new Task(req.body);

    await task.save();

    return res.status(201).json(task);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

export const deleteTaskHandler = async (req, res) => {
  const deletedTask = await Task.findByIdAndDelete(req.params.id);
  if (!deletedTask) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.sendStatus(204);
}

export const updateTaskHandler = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(3).max(300),
    description: Joi.string().min(3).max(300),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  return res.json(task);
}