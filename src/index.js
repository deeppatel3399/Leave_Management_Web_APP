import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LeaveList from './Components/Pages/LeaveList';
import LeaveReq from './Components/Pages/LeaveReq';
import Register from './Components/Pages/Register';
import ConfirmPass from './Components/Pages/ConfirmPass';
import ForgotPass from './Components/Pages/ForgotPass';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider,Route,createRoutesFromElements} from 'react-router-dom';

const isLogIn = window.localStorage.getItem("loginval");

const isEmail = window.localStorage.getItem("emailval");

// function for routing different paths
const router = createBrowserRouter(createRoutesFromElements(
<Route>
 <Route path='/' element={isLogIn?<LeaveReq/> : <App/>}/>
 <Route path='/leavereq' element={isLogIn?<LeaveReq/>:<App/>}/>
 <Route path='/holidaylist' element={<LeaveList/>}/>
 <Route path='/register' element={<Register/>}/>
 <Route path='/newpassword' element={isEmail?<ConfirmPass/>:<ForgotPass/>}/>
 <Route path='/forgotpassword' element={<ForgotPass/>}/>
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
