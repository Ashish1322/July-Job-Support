import express from "express";
const router = express.Router();

// controllers
import { createDepartment, createDoctorAccount } from "../controllers/admin.js";

router.post("/create-doctor", createDoctorAccount);
router.post("/create-department", createDepartment);
export default router;
