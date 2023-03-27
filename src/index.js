import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LeaveList from './Components/Pages/Common/LeaveList';
import LeaveReq from './Components/Pages/Employee/LeaveReq';
import Register from './Components/Pages/Common/Register';
import ConfirmPass from './Components/Pages/Common/ConfirmPass';
import ForgotPass from './Components/Pages/Common/ForgotPass';
import LeaveStatus from './Components/Pages/Employee/LeaveStatus';
import ManagerDash from './Components/Pages/Manager/ManagerDash';
import AdminDash from './Components/Pages/Admin/AdminDash';
import AdminReq from './Components/Pages/Admin/AdminReq';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider,Route,createRoutesFromElements} from 'react-router-dom';
import axios from 'axios';
import ResetPass from './Components/Pages/Common/ResetPass';


const role = window.localStorage.getItem("role");

const isEmail = window.localStorage.getItem("emailval");

axios.defaults.baseURL = "http://localhost:3001/";

const employeerouters = createBrowserRouter(createRoutesFromElements(
  <Route>
        <Route path='/' element={<LeaveReq/>}/>
        <Route path='/leavereq' element={<LeaveReq/>}/>
        <Route path='/leavestatus' element={<LeaveStatus/>}/>
        <Route path='/newpassword' element={<ConfirmPass/>}/>
        <Route path='/holidaylist' element={<LeaveList/>}/>
  </Route>
));

const managerrouters = createBrowserRouter(createRoutesFromElements(
  <Route>
        <Route path='/' element={<ManagerDash/>}/>
        <Route path='/dash' element={<ManagerDash/>}/>
        <Route path='/newpassword' element={<ConfirmPass/>}/>
        <Route path='/holidaylist' element={<LeaveList/>}/>
   </Route>
));

const adminrouters = createBrowserRouter(createRoutesFromElements(
  <Route>
      <Route path='/' element={<AdminDash/>}/>
      <Route path='/admindash' element={<AdminDash/>}/>
      <Route path='/allreq' element={<AdminReq/>}/>
      <Route path='/newpassword' element={<ConfirmPass/>}/>
      <Route path='/holidaylist' element={<LeaveList/>}/>
   </Route>
));

const commonrouters = createBrowserRouter(createRoutesFromElements(
  <Route>
        <Route path='/' element={<App/>}/>
        <Route path='/holidaylist' element={<LeaveList/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/forgotpassword' element={<ForgotPass/>}/>
        <Route path='/resetpassword' element={<ForgotPass/>}/>
        <Route path='/newpassword' element={<App/>}/>
        <Route path='/leavereq' element={<App/>}/>
        <Route path='/leavestatus' element={<App/>}/>
        <Route path='/dash' element={<App/>}/>
        <Route path='/admindash' element={<App/>}/>
        <Route path='/allreq' element={<App/>}/>
   </Route>
));

const emailrouter = createBrowserRouter(createRoutesFromElements(
  <Route path='/resetpassword' element={<ResetPass/>}/>
));

// function for routing different paths
// const router = createBrowserRouter(createRoutesFromElements(
// <Route>
//   {
//   role==="E"?
//     <> 
//       <Route path='/' element={<LeaveReq/>}/>
//       <Route path='/leavereq' element={<LeaveReq/>}/>
//       <Route path='/leavestatus' element={<LeaveStatus/>}/>
//       <Route path='/newpassword' element={<ConfirmPass/>}/>
//     </>
//   :role==="M"?
//   <Route>
//       <Route path='/' element={<ManagerDash/>}/>
//       <Route path='/dash' element={<ManagerDash/>}/>
//       <Route path='/newpassword' element={<ConfirmPass/>}/>
//   </Route>
//   :role==="SA"?
//   <Route>
//       <Route path='/' element={<AdminDash/>}/>
//       <Route path='/admindash' element={<AdminDash/>}/>
//       <Route path='/allreq' element={<AdminReq/>}/>
//       <Route path='/newpassword' element={<ConfirmPass/>}/>
//   </Route>
//   :isEmail?
//   <Route path='/resetpassword' element={<ResetPass/>}/>
//   :
//   <Route>
//       <Route path='/' element={<App/>}/>
//       <Route path='/register' element={<Register/>}/>
//       <Route path='/holidaylist' element={<LeaveList/>}/>
//       <Route path='/forgotpassword' element={<ForgotPass/>}/>
//       <Route path='/resetpassword' element={<ForgotPass/>}/>
//       <Route path='/newpassword' element={<App/>}/>
//   </Route>
//   }
//  </Route>
// ));
// function for routing different paths

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={role==="E"?employeerouters:role==="M"?managerrouters:role==="SA"?adminrouters:isEmail?emailrouter:commonrouters}/>
  </React.StrictMode>
);


reportWebVitals();
