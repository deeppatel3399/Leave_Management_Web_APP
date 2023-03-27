import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Navbar from '../../Navbar';
import Footer from '../../Footer';
import '../../../App.css';

const Register = () => {

  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[fName,setFName] = useState("");
  const[lName,setLName] = useState("");
  const[role,setRole] = useState("select");
  const[confPassword,setConfPassword] = useState("");
  const[managerId,setManagerId] = useState("");
  const[managerName,setManagerName] = useState("");
  const[disval,setDisVal] = useState(true);
 
  const[emailErr,setEmailErr] = useState("");
  const[passErr,setPassErr] = useState("");
  const[fNameErr,setFNameErr] = useState("");
  const[lNameErr,setLNameErr] = useState("");
  const[confPassErr,setConfPassErr] = useState("");
  const[managerIdErr,setManagerIdErr] = useState("");
  const[roleErr,setRoleErr] = useState("");
  
  const checkEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  const manageridcheck = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{1,10}$/;
  
  const emailblur = ()=>
  {
     if(email==="")
     {
         setEmailErr("Enter Email Id");
     }
     else
     {
         if(email.match(checkEmail))
         {
             setEmailErr("");
         }
         else
         {
             setEmailErr("Invalid Email");
         }
     }
 
  }
  const passblur = ()=>
  {
     if(password==="")
     {
         setPassErr("Enter Password");
     }
     else
     {
         if(password.match(passCheck))
         {
             setPassErr("");
         }
         else
         {
             setPassErr("Minimum eight characters At least one letter One number One special character");
         }
     }
 
  }
  const fnameblur = ()=>
  {
     if(fName==="")
     {
         setFNameErr("Enter FirstName");
     } 
  }
  const lnameblur = ()=>
  {
     if(lName==="")
     {
         setLNameErr("Enter Last Name");
     }
  }
  const confpassblur = ()=>
  {
     if(confPassword==="")
     {
         setConfPassErr("Enter Confirm Password");
     }
     else
     {
         if(confPassword!==password)
         {
          setConfPassErr("Password Not match");
         }
         else
         {
          setConfPassErr("");
         }
     }

 
  }
  const manageridblur = () =>
  {
      if(managerId==="")
      {
        setManagerIdErr("Enter Manager Id");
      }
      else
      {
        if(managerId.match(manageridcheck))
        {
            setManagerIdErr("");
        }
        else if(managerId.length>10)
        {
            setManagerIdErr("Max 10 characater Allow");
        }
        else
        {
            setManagerIdErr("Id must have one character,one number and not include any special character");
        }
      }
  }
  const registerbtn = () =>
  {
     if(email==="")
     {
        setEmailErr("Enter Email-Id");
     }
     if(password==="")
     {
        setPassErr("Enter Password");
     }
     if(confPassword==="")
     {
      setConfPassErr("Enter Confirm Password");
     }
     if(fName==="" || lName==="" || managerId==="")
     {
        setDisVal(true);
     }
     axios.post("/register",{
        fname:fName,
        lname:lName,
        email:email,
        password:password,
        role,
        managerId,
        managerName
     })
     .then((data)=>{
      console.log(data.data);
      if(data.data.status===208)
      {
          alert("User Already Exist...!");
      }
      if(data.data.status===201)
      {
          window.location.href = "./"
          alert("Register Successfully...!");
      }
      if(data.data.status===404)
      {
        alert("Wrong ManagerId");
      }
     })  
  };
  
  useEffect(()=>{
    if(email==="")
    {
        setDisVal(true);
    }
    else if(email.match(checkEmail))
    {
        setDisVal(false);
        setEmailErr("");
    }
    else
    {
       setDisVal(true);
    }

    if(password==="")
    {
        setDisVal(true);
    }
    else if(password.match(passCheck))
    {
        setDisVal(false);
        setPassErr("");
    }
    else
    {
       setDisVal(true);
    }
    if(role==="select")
    {
        setDisVal(true);
    }
    else
    {
        setRoleErr("");
        setDisVal(false);
    }

    if(confPassword==="")
    {
        setDisVal(true);
    }
    else if(password===confPassword)
    {
        setDisVal(false);
        setConfPassErr("");
    }
    else
    {
       setDisVal(true);
    }
    if(fName!=="")
    {
        setFNameErr("");
    }
    if(lName!=="")
    {
        setLNameErr("");
    }
    if(managerId==="")
    {
        setDisVal(true);
    }
    else
    {
        if(!managerId.match(manageridcheck))
        {
            setManagerIdErr("Id must have one character,one number,max 10 character allow and not include any special character");
            setDisVal(true);
        }
        else
        {
            setManagerIdErr("");
            setDisVal(false);
        }
    }
  },[email,password,checkEmail,passCheck,confPassword,fName,lName,fNameErr,lNameErr,managerId,managerIdErr,manageridcheck,role])

  console.log(role);

  return (
    <>
    <Navbar/>
    <div className='registermaincontainer'>
      <div className='registercardcontainer'>

           <div className='regcardheading'>Register</div>

           <div className='regcardstyle'>

             <div className='text-center mb-5'>
               <p className='text-center'><i className="usericon fa-solid fa-user"></i></p>
               <NavLink className="linktologin" to='/'> Already have an account?</NavLink>
             </div>

             <div className='reginputsection'>

             <input className='reginputsstyle' name='firstname' id='fname' value={fName} onChange={(e)=>{setFName(e.target.value)}} onBlur={fnameblur} type="text" placeholder='First Name'/>
             <span className='reginputerr'>{fNameErr}</span>

             <input className='mt-5 reginputsstyle' name='lastname' id='lname' value={lName} onChange={(e)=>{setLName(e.target.value)}} onBlur={lnameblur} type="text" placeholder='Last Name'/>
             <span className='reginputerr'>{lNameErr}</span>   
            
            <input className='mt-5 reginputsstyle' name='email' id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} onBlur={emailblur} type="email" placeholder='E-mail Id'/>
             <span className='reginputerr'>{emailErr}</span>

             <input className='mt-5 reginputsstyle' name='password' id='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} onBlur={passblur} type="password" placeholder='Password'/>
             <span className='reginputerr'>{passErr}</span>

             <input className='mt-5 reginputsstyle' name='confirmpassword' id='confpassword' value={confPassword} onChange={(e)=>{setConfPassword(e.target.value)}} onBlur={confpassblur} type="password" placeholder='Confirm Password'/>
             <span className='reginputerr'>{confPassErr}</span>

             <div className='mt-5'>
                <p className='text-base font-semibold text-primary-dark flex justify-start'>Select Your Role</p>
             <select value={role} onChange={(e)=>setRole(e.target.value)} className="text-center flex justify-start w-40 h-8 rounded">
                <option defaultValue="select">select</option>
                <option value="E">Employ</option>
                <option value="M">Manager</option>
             </select>
             <span className='reginputerr'>{roleErr}</span>
             </div>
 
             {
                role ==="E" ? (
                    <>
                    <input className='mt-5 reginputsstyle' name='manager_id' id='manager_id' value={managerId} onChange={(e)=>{setManagerId(e.target.value)}} onBlur={manageridblur} type="text" placeholder='Enter Your Manager Id'/>
             <span className='reginputerr'>{managerIdErr}</span>
             <input className='mt-5 reginputsstyle' name='manager_name' id='managerName' value={managerName} onChange={(e)=>{setManagerName(e.target.value)}} type="text" placeholder='Enter Your Manager Name'/>
             </>
                ):
                <>
                <input className='mt-5 reginputsstyle' name='manager_id' id='manager_id' value={managerId} onChange={(e)=>{setManagerId(e.target.value)}} onBlur={manageridblur} type="text" placeholder='Enter Your Id'/>
                </>
             }
             
             </div>

           </div>
 
           <div className='text-center'>
              <button onClick={registerbtn} disabled={disval} className='regbtnstyle'>Register<i className="ml-3 fa-solid fa-arrow-right"></i></button>
           </div>

      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Register;