import User from "../models/User.js";
import Department from "../models/Department.js";
import { sendJsonResponse } from "../utils/general.js";
const fetchAllDoctors = async (req, res) => {
  let doctors = await User.find({ role: "doctor" })
    .select("name email profilePic about address deparmentId")
    .populate("deparmentId");
  return res.status(200).json({ success: true, doctors });
};

const fetchAllDepartments = async (req, res) => {
  let departments = await Department.find();
  return res.status(200).json({ success: true, departments });
};

const filterDoctorsByDeparmentOrName = async (req, res) => {
  try {
    const { name, departmentId } = req.params;

    if (name.length > 0 && departmentId != "all") {
      let results = await User.find({
        role: "doctor",
        name: name,
        departmentId: departmentId,
      });
      return res.status(200).json({ success: true, doctors: results });
    } else if (departmentId == "all") {
      let results = await User.find({ role: "doctor", name: name });
      return res.status(200).json({ success: true, doctors: results });
    } else if (name.length == 0) {
      let results = await User.find({
        role: "doctor",
        departmentId: departmentId,
      });
      return res.status(200).json({ success: true, doctors: results });
    }
    return res.status(200).json({ success: true, doctors: [] });
  } catch (err) {
    return sendJsonResponse(500, false, err.message, res);
  }
};

export { fetchAllDoctors, fetchAllDepartments, filterDoctorsByDeparmentOrName };
