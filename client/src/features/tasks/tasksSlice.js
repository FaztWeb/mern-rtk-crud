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

export const getTasks = createAsyncThunk(
  "tasks/getTasks",
  async () => {
    try {
      const response = await axios.get(`${baseURL}/api/tasks`);
      return response.data;
    } catch (error) {
      return error.response.data.message;
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
      }
    },
    [createTask.fulfilled]: (state, action) => {
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
        responseStatus: "success",
        responseMessage: "Task created successfully",
      }
    },
    [createTask.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      }
    },
    [getTasks.pending]: (state, action) => {
      return {
        ...state,
        responseStatus: "pending",
      }
    },
    [getTasks.fulfilled]: (state, action) => {
      return {
        ...state,
        tasks: action.payload,
        responseStatus: "success",
      }
    },
    [getTasks.rejected]: (state, action) => {
      return {
        ...state,
        responseStatus: "rejected",
        responseMessage: action.payload,
      }
    }
  },
});

export default tasksSlice.reducer;
