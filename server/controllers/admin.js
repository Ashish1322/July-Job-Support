import User from "../models/User.js";
import Department from "../models/Department.js";
import { v4 as uuidv4 } from "uuid";
import { sendJsonResponse } from "../utils/general.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
const createDoctorAccount = async (req, res) => {
  try {
    const { name, email, gender, department_id } = req.body;

    // check if email already exist
    const oldUser = await User.findOne({ email: email });
    if (oldUser) {
      return sendJsonResponse(400, false, "Email already in use", res);
    }

    // check if the department id is valid or not
    const department = await Department.findById(department_id);
    if (!department) {
      return sendJsonResponse(400, false, "Department Id is Wrong!", res);
    }

    // autgenerate a password
    let password = uuidv4();
    // hash password
    bcrypt.hash(password, 10, async function (err, hash) {
      // create account
      const newUser = new User({
        email,
        password: hash,
        gender,
        name,
        emailVerified: true,
        deparmentId: department_id,
        role: "doctor",
      });
      await newUser.save();

      // send email to doctor about his login id and password
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "a.m2001nov@gmail.com",
          pass: process.env.EMAIL_PASS,
        },
      });

      var mailOptions = {
        from: "a.m2001nov@gmail.com",
        to: email,
        subject: "Welcom to HIS!. Doctor account is created for you.",
        text: `Hi ${name}, a new doctor account is created for you by the admin\n. User
        the following credentials to login\n
        Email: ${email}\n
        Password: ${password}\n
        
        You can change the password after login!\n
        Thanks!`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      return sendJsonResponse(200, true, "Acount Created Successfully", res);
    });
  } catch (err) {
    return sendJsonResponse(500, false, err.message, res);
  }
};
const createDepartment = async (req, res) => {
  const { name } = req.body;
  const old = await Department.findOne({ name: name });
  if (old) {
    return sendJsonResponse(400, false, "Department already exist", res);
  }

  const newdp = new Department({
    name: name,
  });
  await newdp.save();
  return res
    .status(200)
    .json({ success: true, message: "department created", newdp });
};
export { createDoctorAccount, createDepartment };
