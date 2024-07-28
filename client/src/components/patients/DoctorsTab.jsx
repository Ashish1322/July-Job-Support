import React, { useEffect, useState } from "react";
import UserCard from "../common/UserCard/UserCard";

import {
  getAllDepartmentsAction,
  filterDoctors,
  getAllDoctorsAction,
} from "../../redux/slices/patientSlice";
import { useDispatch, useSelector } from "react-redux";

export default function DoctorsTab() {
  const { doctors, departments, loading, error } = useSelector(
    (state) => state.patientReducer
  );
  const { user } = useSelector((state) => state.authReducers);

  const dispatch = useDispatch();

  // fetch all the doctors and departments whenenver anyone is coming in the website
  useEffect(() => {
    dispatch(getAllDoctorsAction({ token: user.token }));
    dispatch(getAllDepartmentsAction({ token: user.token }));
  }, []);

  // two state to stro the form data
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("all");

  const handleFilter = (e) => {
    e.preventDefault();
    console.log(name, department);
    dispatch(filterDoctors({ name, department, token: user.token }));
  };
  return (
    <div className="mt-4 container">
      <div className="row">
        <div className="col-md-12">
          <h2>Doctors</h2>
        </div>
      </div>
      <form onSubmit={handleFilter}>
        <div className="row">
          <div className="col-md-4">
            <div className="form-group">
              <label>Search by Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                type="text"
                className="form-control"
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <label>Filter by Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.currentTarget.value)}
                className="form-control"
              >
                <option value="all">All Departments</option>
                {departments.map((item, index) => (
                  <option key={index} value={item._id}>
                    {item.name}
                  </option>
                ))}

                {/* Add more departments here */}
              </select>
            </div>
          </div>
          <div className="col-md-4">
            <div className="form-group">
              <button class="btn btn-primary mt-3">Apply Filter</button>
            </div>
          </div>
        </div>
      </form>
      <hr />
      <div className="row">
        {doctors.length == 0 && (
          <p className="text-center">No doctors found !</p>
        )}
        {doctors.map((item, index) => (
          <div key={index} className="col col-4">
            <UserCard
              bio={item.about}
              name={item.name}
              email={item.email}
              address={item?.address}
              pic={item.profilePic}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
