import express from "express";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

dotenv.config();


app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;