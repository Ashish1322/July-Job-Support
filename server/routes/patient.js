import express from "express";
const router = express.Router();

// controllers
import {
  fetchAllDoctors,
  fetchAllDepartments,
  filterDoctorsByDeparmentOrName,
} from "../controllers/patient.js";

router.get("/all-doctors", fetchAllDoctors);
router.get("/all-departments", fetchAllDepartments);
router.get(
  "/filter-doctors/:name/:departmentId",
  filterDoctorsByDeparmentOrName
);
export default router;
