import React, { useEffect, useState } from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';

const Navbar = () => {

  const[clickVal,setClickVal] = useState(false);
  const[profileMenuVal,setProfileMenuVal] = useState(true);

  const role = window.localStorage.getItem("role");

  // var role==="E"=false;
  // var role==="M"=false;
  // var role==="SA"=false;


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
    
    const logoutbtn = ()=>{
        window.localStorage.clear();
        window.location.href = '/';
    };

    const profilebtn = ()=>{
      if(profileMenuVal===true)
      {
        document.getElementById("profilemenu").style.display = "none";
        setProfileMenuVal(false);
      }
      else
      {
        document.getElementById("profilemenu").style.display = "block";
        setProfileMenuVal(true);
      }
    }

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
              <i className="fa-sharp fa-solid fa-bars text-lg text-white hover:text-primary"></i>
            </button><br/>

            <ul id="menu" className='w-28 rounded bg-primary-dark text-white font-bold h-34 absolute top-10 right-0'>
              {
              role==="E"||role==="M"||role==="SA"?
              <>              
              <li className='pl-3 py-3'><NavLink to="/newpassword">Change Password</NavLink></li>
              <li className='pl-3 py-3'><button onClick={logoutbtn}>Log Out</button></li>
              </>
              :<li className='pl-3 py-3'><NavLink to="/">Home</NavLink></li>
              }

              {
              role==="E"?<li className='pl-3 py-3'><NavLink to="/leavereq">Leave Request</NavLink></li>
              :role==="M"?<li className='pl-3 py-3'><NavLink to="/dash">Dashboard</NavLink></li>
              :role==="SA"?
              <>
              <li className='pl-3 py-3'><NavLink to="/admindash">Dashboard</NavLink></li><li className='pl-3 py-3'><NavLink to="/allreq">Requests</NavLink></li>
              </>:null
              }

              <li className='pl-3 py-3'><NavLink to="/holidaylist">Holiday List</NavLink></li>
            </ul>          
          </div>

          <div className='max-lg:hidden flex justify-between'>
            {role==="E"||role==="M"||role==="SA"?
              <div className='flex flex-col relative z-10'>
                <button className='navlinkstyle' onClick={profilebtn}><i className="fa-solid fa-user usericon bg-white rounded-full w-8 h-8"></i></button>

                <div className='profilemenu absolute top-10 -left-3 w-32 bg-primary-dark p-5 rounded' id='profilemenu' hidden={profileMenuVal}>
                  <ul>
                    <li className='w-32 pb-3'><button className='navlinkstyle' onClick={logoutbtn}>Log Out</button></li>
                    <li className='w-32 pb-3'><NavLink className="navlinkstyle" to='/newpassword'>Change Password</NavLink></li>
                    {role==="E"?
                    <li className='w-32 pb-3'><NavLink className='navlinkstyle' to="/leavestatus">Leave Status</NavLink></li>
                    :null
                    }
                  </ul>
                </div>
              </div>
              :<NavLink className='navlinkstyle' to="/">Home</NavLink>}
              
                {role==="E"?
                <NavLink className='navlinkstyle' to="/leavereq">Leave Request</NavLink>
                :role==="M"?
                <NavLink className='navlinkstyle' to="/dash">Dashboard</NavLink>
                :role==="SA"?
                <>
                <NavLink className='navlinkstyle' to="/admindash">Dashboard</NavLink>
                <NavLink className='navlinkstyle' to="/allreq">Requests</NavLink>
                </>
                :null}
               
                <NavLink className='navlinkstyle' to="/holidaylist">Holiday List</NavLink>
          </div>
      </div>
    </>
    );
};

export default Navbar;