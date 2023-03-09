import React, { useEffect, useState } from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  const[clickVal,setClickVal] = useState(false);

    const btnValFun = ()=>{
      if(clickVal===false)
      {
        setClickVal(true);
      }
      else
      {
        document.getElementById('menu').style.display = "block";
        setClickVal(false);
      }
    };

    useEffect(()=>{
      if(clickVal===false)
      {
        document.getElementById('menu').style.display = "none";
      }
      else
      {
        document.getElementById('menu').style.display = "block";
      }
    });
  
  
  return (
    <>
      <div className='navbarcontainer'>
          <div>
            <NavLink to="/"><p className='leftnav'>Leave Management System</p></NavLink>
          </div>

          <div className='lg:hidden relative'>

            <button value={clickVal} onClick={btnValFun}>
              <i className="fa-sharp fa-solid fa-bars text-2xl text-white hover:text-primary"></i>
            </button><br/>

            <ul id="menu" className='w-28 rounded bg-primary-dark text-white font-bold h-34 absolute top-10 right-0'>
              <li className='pl-3 py-3'>Home</li>
              <li className='pl-3 py-3'>Leave Request</li>
              <li className='pl-3 py-3'>Holidays</li>
            </ul>          
          </div>

          <div className='max-lg:hidden'>
                <NavLink className='navlinkstyle' to="/">Home</NavLink>
                <NavLink className='navlinkstyle' to="/leavereq">Leave Request</NavLink>
                <NavLink className='navlinkstyle' to="/holidaylist">Holiday List</NavLink>
          </div>
      </div>
    </>
    );
};

export default Navbar;