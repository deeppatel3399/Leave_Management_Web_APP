// import React from 'react';
// import Home from './Components/Pages/Common/Home';
// // import { AppContext } from './AppContext';
// // import { useContext } from 'react';

// const App = () => {

//   // const { globalState } = useContext(AppContext);

//   // const theme = window.localStorage.getItem("themeName");

//   return (
//      <Home/>
//   );
// };

// export default App;

import React, { useEffect } from "react";
import "./index.css";
import LeaveList from "./Components/Pages/Common/LeaveList";
import LeaveReq from "./Components/Pages/Employee/LeaveReq";
import Register from "./Components/Pages/Common/Register";
import ConfirmPass from "./Components/Pages/Common/ConfirmPass";
import ForgotPass from "./Components/Pages/Common/ForgotPass";
import LeaveStatus from "./Components/Pages/Employee/LeaveStatus";
import ManagerDash from "./Components/Pages/Manager/ManagerDash";
import AdminDash from "./Components/Pages/Admin/AdminDash";
import AdminReq from "./Components/Pages/Admin/AdminReq";
import PieChart from "./Components/Pages/Manager/PieChart";
import OrgTree from "./Components/Pages/Admin/OrgTree";
import BarChart from "./Components/Pages/Admin/BarChart";
import { Route, Routes } from "react-router-dom";
import axios from "axios";
import ResetPass from "./Components/Pages/Common/ResetPass";
import Home from "./Components/Pages/Common/Home";
import { AppContext } from "./AppContext";
import { useContext } from "react";

const App = () => {
  const { globalState, updateGlobalState } = useContext(AppContext);

  window.localStorage.getItem("themeName") ||
    window.localStorage.setItem("themeName", globalState.themeName);
  useEffect(() => {
    updateGlobalState({ themeName: window.localStorage.getItem("themeName") });
  }, []);

  const role = window.localStorage.getItem("role");

  const isEmail = window.localStorage.getItem("emailval");

  axios.defaults.baseURL = "http://localhost:3001/";

  const employeerouters = (
    <Routes>
      <Route path="/" element={<LeaveReq />} />
      <Route path="/leavereq" element={<LeaveReq />} />
      <Route path="/leavestatus" element={<LeaveStatus />} />
      <Route path="/newpassword" element={<ConfirmPass />} />
      <Route path="/holidaylist" element={<LeaveList />} />
    </Routes>
  );

  const managerrouters = (
    <Routes>
      <Route path="/" element={<ManagerDash />} />
      <Route path="/dash" element={<ManagerDash />} />
      <Route path="/newpassword" element={<ConfirmPass />} />
      <Route path="/holidaylist" element={<LeaveList />} />
      <Route path="/leavereq" element={<LeaveReq />} />
      <Route path="/leavestatus" element={<LeaveStatus />} />
      <Route path="/piechart" element={<PieChart />} />
    </Routes>
  );

  const adminrouters = (
    <Routes>
      <Route path="/" element={<AdminDash />} />
      <Route path="/admindash" element={<AdminDash />} />
      <Route path="/allreq" element={<AdminReq />} />
      <Route path="/newpassword" element={<ConfirmPass />} />
      <Route path="/holidaylist" element={<LeaveList />} />
      <Route path="/barchart" element={<BarChart />} />
      <Route path="/orgtree" element={<OrgTree />} />
    </Routes>
  );

  const commonrouters = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/holidaylist" element={<LeaveList />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPass />} />
      <Route path="/resetpassword" element={<ForgotPass />} />
      <Route path="/newpassword" element={<Home />} />
      <Route path="/leavereq" element={<Home />} />
      <Route path="/leavestatus" element={<Home />} />
      <Route path="/dash" element={<Home />} />
      <Route path="/admindash" element={<Home />} />
      <Route path="/allreq" element={<Home />} />
    </Routes>
  );

  const emailrouter = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/holidaylist" element={<LeaveList />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgotpassword" element={<ForgotPass />} />
      <Route path="/resetpassword" element={<ResetPass />} />
      <Route path="/newpassword" element={<Home />} />
      <Route path="/leavereq" element={<Home />} />
      <Route path="/leavestatus" element={<Home />} />
      <Route path="/dash" element={<Home />} />
      <Route path="/admindash" element={<Home />} />
      <Route path="/allreq" element={<Home />} />
    </Routes>
  );

  return (
    <div className={`${globalState.themeName}`}>
      {role === "E"
        ? employeerouters
        : role === "M"
        ? managerrouters
        : role === "SA"
        ? adminrouters
        : isEmail
        ? emailrouter
        : commonrouters}
    </div>
  );
};

export default App;
