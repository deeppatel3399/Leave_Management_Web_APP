import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LeaveList from './Components/Pages/LeaveList';
import LeaveReq from './Components/Pages/LeaveReq';
import Register from './Components/Pages/Register';
import ConfirmPass from './Components/Pages/ConfirmPass';
import ForgotPass from './Components/Pages/ForgotPass';
import LeaveStatus from './Components/Pages/LeaveStatus';
import ManagerDash from './Components/Pages/ManagerDash';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider,Route,createRoutesFromElements} from 'react-router-dom';
import axios from 'axios';
import ResetPass from './Components/Pages/ResetPass';

const isLogIn = window.localStorage.getItem("loginval");
const isManagerLogIn = window.localStorage.getItem("managerloginval");

const isEmail = window.localStorage.getItem("emailval");

axios.defaults.baseURL = "http://localhost:3001/";

// function for routing different paths
const router = createBrowserRouter(createRoutesFromElements(
<Route>
 <Route path='/' element={isLogIn?<LeaveReq/> : isManagerLogIn?<ManagerDash/> : <App/>}/>
 <Route path='/leavereq' element={isLogIn?<LeaveReq/>:<App/>}/>
 <Route path='/holidaylist' element={<LeaveList/>}/>
 <Route path='/register' element={<Register/>}/>
 <Route path='/newpassword' element={isLogIn?<ConfirmPass/>:<App/>}/>
 <Route path='/forgotpassword' element={<ForgotPass/>}/>
 <Route path='/resetpassword' element={isEmail?<ResetPass/>:<ForgotPass/>}/>
 <Route path='/leavestatus' element={isLogIn?<LeaveStatus/>:<App/>}/>
 <Route path='/dash' element={isManagerLogIn?<ManagerDash/>:<App/>}/>
</Route>
));
// function for routing different paths


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);


reportWebVitals();
