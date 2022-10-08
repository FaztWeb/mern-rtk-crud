import express from "express";
import cors from "cors";

import tasksRoutes from "./routes/tasks.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api", tasksRoutes);

export default app;
