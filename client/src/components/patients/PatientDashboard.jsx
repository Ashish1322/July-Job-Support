import React, { useContext, useState } from "react";
import UpdateProfile from "../common/UpdateProfile/UpdateProfile";
import DoctorsTab from "./DoctorsTab";

export default function PatientDashboard() {
  return (
    <div>
      <div className="row">
        <div
          className="col-4 d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
          style={{ width: 280, height: "92vh", margin: 0, padding: 0 }}
        >
          <a className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
            <span className="fs-4">Patient Dashboard</span>
          </a>
          <hr />
          <ul className="nav nav-pills flex-column mb-auto">
            <li>
              <a className="nav-link text-white" aria-current="page">
                Appointments
              </a>
            </li>
            <li>
              <a className="nav-link text-white">Doctors</a>
            </li>
            <li>
              <a className="nav-link text-white">Chats</a>
            </li>
            <li>
              <a className="nav-link text-white" href="#">
                Profile
              </a>
            </li>
          </ul>
          <hr />
        </div>
        <div className="col" style={{ margin: 0, padding: 0 }}>
          <DoctorsTab />
        </div>
      </div>
    </div>
  );
}
