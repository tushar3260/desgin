import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import userRoutes from "./routes/userRoutes.js"
import eventRoutes from './routes/eventRoutes.js';
import organizerroutes from './routes/organiserRoutes.js';
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));
app.use(helmet());






app.use("/api/users", userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/organizers', organizerroutes);


app.get("/", (req, res) => {
  res.send("App is running 🚀");
});

export default app;
