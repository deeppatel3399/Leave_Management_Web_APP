import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import LeaveList from './Components/Pages/LeaveList';
import LeaveReq from './Components/Pages/LeaveReq';
import Register from './Components/Pages/Register';
import ForgotPass from './Components/Pages/ForgotPass';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider,Route,createRoutesFromElements} from 'react-router-dom';


// function for routing different paths
const router = createBrowserRouter(createRoutesFromElements(
<Route>
 <Route path='/' element={<App/>}/>
 <Route path='/leavereq' element={<LeaveReq/>}/>
 <Route path='/holidaylist' element={<LeaveList/>}/>
 <Route path='/register' element={<Register/>}/>
 <Route path='/forgot' element={<ForgotPass/>}/>
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
