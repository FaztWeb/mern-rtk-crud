import axios from "axios";

export const getTask = async (id) =>
  await axios.get(`/api/tasks/${id}`);
