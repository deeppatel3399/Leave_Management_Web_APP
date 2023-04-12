import React, { useEffect, useState } from 'react';
import '../App.css';
import { NavLink } from 'react-router-dom';
import {MdSpaceDashboard} from 'react-icons/md';

const Navbar = () => {

  const[clickVal,setClickVal] = useState(false);
  const[profileMenuVal,setProfileMenuVal] = useState(true);

  const[activeBtn,setActiveBtn] = useState('/');

  const role = window.localStorage.getItem("role");

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
      setActiveBtn(window.location.pathname);
      setProfileMenuVal(window.location.pathname);

      if(clickVal===false)
      {
        document.getElementById('menu').style.display = "none";
      }
      else
      {
        document.getElementById('menu').style.display = "block";
      }

      document.addEventListener('mouseup', function(e) {
        var container = document.getElementById('profilemenu');
        if (!container.contains(e.target)) {
            container.style.display = 'none';
        }
    });



    },[]);
  
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
              :role==="M"?
              <li className='pl-3 py-3'>
                <NavLink to="/dash" className="flex"><MdSpaceDashboard size={25}/>Dashboard</NavLink>
                <NavLink to="/managerleave" className="flex"><MdSpaceDashboard size={25}/>Leave Request</NavLink>
              </li>
              :role==="SA"?
              <>
              <li className='pl-3 py-3'><NavLink to="/admindash" className="flex"><MdSpaceDashboard size={25}/>Dashboard</NavLink></li><li className='pl-3 py-3'><NavLink to="/allreq">Requests</NavLink></li>
              </>:null
              }

              <li className='pl-3 py-3'><NavLink to="/holidaylist">Holiday List</NavLink></li>
            </ul>          
          </div>

          <div className='max-lg:hidden flex justify-center items-center'>
            {role==="E"||role==="M"||role==="SA"?
              <div className='flex flex-col relative'>

                <button className="navlinkstyle" onClick={profilebtn}><i className="fa-solid fa-user usericon bg-white rounded-full w-8 h-8 hover:bg-primary"></i>
                </button>

                <div className='profilemenu absolute top-10 z-10 -left-3 w-52 bg-primary-dark p-5 rounded' id='profilemenu' hidden={profileMenuVal}>
                  <ul className='flex flex-col justify-center w-52'>
                    <li className='pb-3'><button className='navlinkstyle' onClick={logoutbtn}>Log Out</button></li>
                    <li className='pb-3'><NavLink className="navlinkstyle" to='/newpassword'>Change Password</NavLink></li>
                    {role==="E"||role==="M"?
                    <li className='pb-3'><NavLink className='navlinkstyle' to="/leavestatus">Leave Status</NavLink></li>
                    :null
                    }
                  </ul>
                </div>

              </div>

              :
              <NavLink  className={`navlinkstyle ${activeBtn==="/"?"bg-primary rounded":""}`} to="/"  onClick={()=>{setActiveBtn("/")}}>Home</NavLink>}
              
                {role==="E"?
                <NavLink className={`navlinkstyle ${activeBtn==="/leavereq"?"bg-primary rounded":""}`} to="/leavereq"  onClick={()=>{setActiveBtn("/leavereq")}}>Leave Request</NavLink>
                :role==="M"?
                <>
                <NavLink  className={`navlinkstyle flex ${activeBtn==="/dash"?"bg-primary rounded":""}`} to="/dash"  onClick={()=>{setActiveBtn("/dash")}}><MdSpaceDashboard size={25}/>Dashboard</NavLink>
                <NavLink  className={`navlinkstyle flex ${activeBtn==="/leavereq"?"bg-primary rounded":""}`} to="/leavereq"  onClick={()=>{setActiveBtn("/leavereq")}}>Leave Request</NavLink>
                </>
                :role==="SA"?
                <>
                
                <button type="button" className="relative inline-flex items-center text-center">
                  <NavLink  className={`navlinkstyle flex ${activeBtn==="/admindash"?"bg-primary rounded":""}`} to="/admindash"  onClick={()=>{setActiveBtn("/admindash")}}><MdSpaceDashboard size={25}/>Dashboard</NavLink>
                  <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full right-4 -top-2 dark:border-gray-900">4</div>
                </button>
                <NavLink  onClick={()=>{setActiveBtn("/allreq")}} className={`navlinkstyle ${activeBtn==="/allreq"?"bg-primary rounded":""}`} to="/allreq">Requests</NavLink>
                </>

                :null}
               
                <NavLink  onClick={()=>{setActiveBtn("/holidaylist")}} className={`navlinkstyle ${activeBtn==="/holidaylist"?"bg-primary rounded":""}`} to="/holidaylist">Holiday List</NavLink>
          </div>


      </div>
    </>
    );
};

export default Navbar;