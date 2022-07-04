import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:4000";

const initialState = {
  tasks: [],
  responseStatus: "",
  responseMessage: "",
};

export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (task, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/api/tasks`, task);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const getTasks = createAsyncThunk("tasks/getTasks", async () => {
  try {
    const response = await axios.get(`${baseURL}/api/tasks`);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});

export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  async (task, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${baseURL}/api/tasks/${task.id}`, task);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      await axios.delete(`${baseURL}/api/tasks/${taskId}`);
      return taskId;
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: {
    [createTask.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [createTask.fulfilled]: (state, action) => {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        responseStatus: "success",
        responseMessage: "Task created successfully",
      };
    },
    [createTask.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    [getTasks.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [getTasks.fulfilled]: (state, action) => {
      return {
        ...state,
        tasks: action.payload,
        responseStatus: "success",
      };
    },
    [getTasks.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    [deleteTask.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [deleteTask.fulfilled]: (state, action) => {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.payload),
        responseStatus: "success",
        responseMessage: "Task deleted successfully",
      };
    },
    [deleteTask.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
    [updateTask.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      };
    },
    [updateTask.fulfilled]: (state, action) => {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload._id ? action.payload : task
        ),
        responseStatus: "success",
        responseMessage: "Task updated successfully",
      };
    },
    [updateTask.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      };
    },
  },
});

export default tasksSlice.reducer;
