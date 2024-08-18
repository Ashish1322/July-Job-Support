import React, { useEffect, useRef, useState } from "react";
import { BASE_URL } from "../../config.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Chart from "chart.js/auto";

export default function AdminDashboard() {
  const { user } = useSelector((state) => state.authReducers);

  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [deparmtentName, setDepartmentName] = useState("");
  const addDepartment = () => {
    fetch(`${BASE_URL}/admin/create-department`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.token,
      },
      body: JSON.stringify({ name: deparmtentName }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Department Created");
          fetchAddTheDepartments();
          setDepartmentName("");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };
  const fetchAddTheDepartments = () => {
    fetch(`${BASE_URL}/admin/departments`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDepartments(data.departments);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [gender, setGender] = useState("male");

  const addDoctor = () => {
    fetch(`${BASE_URL}/admin/create-doctor`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.token,
      },
      body: JSON.stringify({
        name,
        email,
        gender,
        department_id: departmentId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success("Doctor Account Created");
          fetchAddTheDoctors();
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const fetchAddTheDoctors = () => {
    fetch(`${BASE_URL}/admin/doctors`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setDoctors(data.doctors);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const resetPasswordApiCall = (accountId) => {
    fetch(`${BASE_URL}/admin/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.token,
      },
      body: JSON.stringify({
        accountId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const resetPassword = (accountId) => {
    let action = confirm("Are you sure you wanted to reset the password!");
    if (action == true) {
      resetPasswordApiCall(accountId);
    }
  };

  useEffect(() => {
    fetchAddTheDepartments();
    fetchAddTheDoctors();
  }, []);

  // Chart.Js implimentation
  const barChartRef = useRef(null);
  const pieChartRef = useRef(null);

  // Chart data
  const [barChartDeparment, setBarChartDeparment] = useState([]);
  const [barChartCounts, setBarChartCounts] = useState([]);

  const drawBarChart = () => {
    const ctx = barChartRef.current.getContext("2d");

    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: barChartDeparment,
        datasets: [
          {
            label: "Departments",
            data: barChartCounts,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    return myChart;
  };

  const [pieChartDeparment, setPieChartDeparment] = useState([]);
  const [pieChartCounts, setPitChartCounts] = useState([]);

  const drawPieChart = () => {
    const ctx = pieChartRef.current.getContext("2d");

    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: pieChartDeparment,
        datasets: [
          {
            label: "Bookings",
            data: pieChartCounts,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: true,
            text: "Booking by Departments",
          },
        },
      },
    });

    return myChart;
  };

  useEffect(() => {
    let myChart = drawBarChart();
    return () => {
      myChart.destroy();
    };
  }, [barChartDeparment, barChartCounts]);

  useEffect(() => {
    let myChart = drawPieChart();
    return () => {
      myChart.destroy();
    };
  }, [pieChartDeparment, pieChartCounts]);

  const fetchDoctorsInEachDepartment = () => {
    fetch(`${BASE_URL}/admin/doctors-in-department`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setBarChartDeparment(data.deparments);
          setBarChartCounts(data.counts);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const fetchBookingsInEachDepartment = () => {
    fetch(`${BASE_URL}/admin/bookings-in-department`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPieChartDeparment(data.deparments);
          setPitChartCounts(data.counts);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  useEffect(() => {
    fetchDoctorsInEachDepartment();
    fetchBookingsInEachDepartment();
  }, []);

  return (
    <div>
      <h3 className="text-center mt-2">Admin Dashboard</h3>
      <div className="row container my-3">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <canvas ref={barChartRef} />
        </div>
        <div className="col-sm-6">
          <canvas ref={pieChartRef} />
        </div>
      </div>
      <div className="row container">
        <div className="col-sm-6 mb-3 mb-sm-0">
          <div className="card" style={{ border: "1px solid #d5d5d5" }}>
            <div className="card-body">
              <h5 className="card-title">Add Department</h5>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addDepartment();
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <div className="col col-6">
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    required
                    placeholder="Enter Department Name"
                    onChange={(e) => setDepartmentName(e.currentTarget.value)}
                    value={deparmtentName}
                  />
                </div>

                <button className="btn btn-primary mx-2">Add Department</button>
              </form>
            </div>
            <hr />
            <div className="card-body">
              <h5 className="card-title">Add Doctor</h5>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  addDoctor();
                }}
              >
                <div class="row">
                  <div className="mb-3 col col-6">
                    <label htmlFor="exampleInputEmail1" className="form-label">
                      Full Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      required
                      value={name}
                      onChange={(e) => setName(e.currentTarget.value)}
                    />
                  </div>
                  <div className="mb-3 col col-6">
                    <label
                      htmlFor="exampleInputPassword1"
                      className="form-label"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputPassword1"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.currentTarget.value)}
                    />
                  </div>
                </div>
                <div class="row">
                  <div className="mb-3 col col-6">
                    <label className="form-label">Gender</label>
                    <select
                      className="form-select"
                      aria-label="Default select example"
                      required
                      value={gender}
                      onChange={(e) => setGender(e.currentTarget.value)}
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="others">Others</option>
                    </select>
                  </div>
                  <div className="mb-3 col col-6">
                    <label className="form-label">Department</label>
                    <select
                      required
                      className="form-select"
                      aria-label="Default select example"
                      value={departmentId}
                      onChange={(e) => setDepartmentId(e.currentTarget.value)}
                    >
                      {departments.map((item, index) => {
                        return (
                          <option key={index} value={item._id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary">
                  Add Doctor
                </button>
              </form>
            </div>
          </div>
        </div>
        <div
          className="col-sm-6"
          style={{ maxHeight: "400px", overflow: "scroll" }}
        >
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Department</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{item?.name}</th>
                    <td>{item?.email}</td>
                    <td>{item?.deparmentId?.name}</td>
                    <td>
                      <button
                        onClick={() => resetPassword(item._id)}
                        class="btn btn-primary btn-sm"
                      >
                        Reset Password
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
