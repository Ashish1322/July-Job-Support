import Navbar from "./components/common/Navbar";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import PatientDashboard from "./components/patients/PatientDashboard";
import { Route, Routes } from "react-router-dom";
import PatientProtectedWrapper from "./components/auth/PatientProtectedWrapper";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { HISContext } from "./HISContext";
import { useState } from "react";
import DoctorsDashboard from "./components/doctors/DoctorsDashboard";
import DoctorProtectedWrapper from "./components/auth/DoctorProtectedWrapper";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
function App() {
  const [option, setOption] = useState("updateprofile");
  const { user } = useSelector((state) => state.authReducers);

  const [patients, setPatients] = useState([]);
  const fetchAllPatients = () => {
    fetch("http://localhost:8000/doctor/all-patients", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPatients(data.patients);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };

  const filterPatients = (query) => {
    fetch(`http://localhost:8000/doctor/search-patients?query=${query}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: user?.token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPatients(data.patients);
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <div>
      <HISContext.Provider
        value={{
          option,
          setOption,
          fetchAllPatients,
          patients,
          filterPatients,
        }}
      >
        <Navbar />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/patient-dashboard"
            element={
              <PatientProtectedWrapper>
                <PatientDashboard />
              </PatientProtectedWrapper>
            }
          />
          <Route
            path="/doctor-dashboard"
            element={
              <DoctorProtectedWrapper>
                <DoctorsDashboard />
              </DoctorProtectedWrapper>
            }
          />
        </Routes>
      </HISContext.Provider>
    </div>
  );
}

export default App;
