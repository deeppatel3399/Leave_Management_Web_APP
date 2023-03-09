import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import '../../App.css';

const Register = () => {

  const[email,setEmail] = useState("");
  const[password,setPassword] = useState("");
  const[fName,setFName] = useState("");
  const[lName,setLName] = useState("");
  const[confPassword,setConfPassword] = useState("");
  const[disval,setDisVal] = useState(true);
 
  const[emailErr,setEmailErr] = useState("");
  const[passErr,setPassErr] = useState("");
  const[fNameErr,setFNameErr] = useState("");
  const[lNameErr,setLNameErr] = useState("");
  const[confPassErr,setConfPassErr] = useState("");
 
  const checkEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const passCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  
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
     if(fName==="" || lName==="")
     {
        setDisVal(true);
     }

     axios.post("http://localhost:3001/register",{
        fname:fName,
        lname:lName,
        email:email,
        password:password
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
     })

        //    fetch("http://localhost:3001/register",{
        //     method:"POST",
        //     crossDomain: true,
        //     headers:{
        //         "Content-Type":"application/json",
        //         Accept:"application/json",
        //         "Access-Control-Allow-Origin":"*",
        //     },
        //     body:JSON.stringify({
        //         fname:fName,
        //         lname:lName,
        //         email:email,
        //         password:password
        //     })
        //    }).then((res)=>res.json())
        //    .then((data)=>{
        //     console.log(data);
        //     if(data.status===208)
        //     {
        //         alert("User Already Exist...!");
        //     }
        //     if(data.status===201)
        //     {
        //         window.location.href = "./"
        //         alert("Register Successfully...!");
        //     }
        //    })
    
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
 
  },[email,password,checkEmail,passCheck,confPassword,fName,lName,fNameErr,lNameErr])


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