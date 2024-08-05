import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// Import routes
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";
import doctorRoutes from "./routes/doctor.js";
import patientRoutes from "./routes/patient.js";

import {
  isAdmin,
  isDoctor,
  isLoggedIn,
  isPatient,
} from "./middlewares/auth.js";

const PORT = 8000;
const app = express();

// configure env
dotenv.config();

// configure middlewared
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
  })
);

// configure routes
app.use("/auth", authRoutes);
app.use("/admin", isLoggedIn, isAdmin, adminRoutes);
app.use("/doctor", isLoggedIn, isDoctor, doctorRoutes);
app.use("/patient", isLoggedIn, isPatient, patientRoutes);

// connect to database
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    // start app
    app.listen(PORT, () => console.log("App started on PORT ", PORT));
  })
  .catch((err) => {
    console.log("Failed to connect to databse");
    process.exit();
  });
