import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../../App.css';

const Login = () => {

 const[email,setEmail] = useState("");
 const[password,setPassword] = useState("");
 const[disval,setDisVal] = useState(true);

 const[emailErr,setEmailErr] = useState("");
 const[passErr,setPassErr] = useState("");

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
 const loginbtn = () =>
 {
    if(email==="")
    {
       setEmailErr("Enter Email-Id");
    }
    if(password==="")
    {
       setPassErr("Enter Password");
    }

    axios.post("http://localhost:3001/login",{
        email,
        password
     })
     .then((data)=>{
      console.log(data.data);
      if(data.data.status===200)
      {
          window.localStorage.setItem("token",data.data.token);
          window.localStorage.setItem("loginval",true);
          window.location.href = "./leavereq";
      }
      if(data.data.status===404)
      {
          alert("Invalid Credentials");
      }
     })

    // fetch("http://localhost:3001/login",{
    //     method:"POST",
    //     crossDomain: true,
    //     headers:{
    //         "Content-Type":"application/json",
    //         Accept:"application/json",
    //         "Access-Control-Allow-Origin":"*",
    //     },
    //     body:JSON.stringify({
    //         email,
    //         password
    //     })
    //    }).then((res)=>res.json())
    //    .then((data)=>{
    //     console.log(data);
    //     if(data.status===200)
    //     {
    //         window.localStorage.setItem("token",data.token);
    //         window.location.href = "./leavereq";
    //     }
    //     if(data.status===404)
    //     {
    //         alert("Invalid Credentials");
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
 },[email,password,checkEmail,passCheck,emailErr,passErr])


  return (
    <>
    <div className='loginmaincontainer'>

      <div className='logincardcontainer'>

           <div className='logincardheading'>Login</div>

           <div className='logincardstyle'>

             <div className='text-center mb-5'>

               <p className='text-center'><i className="fa-solid fa-user usericon"></i></p>
               <NavLink className="linktoregister" to='/register'> Have an account?</NavLink>

             </div>

             <div className='logininputsection'>
            
             <p className='inputboxetitle flex justify-start'>Email-Id<span className='reuiredfield'>*</span></p>
            <input className='logininputsstyle' name='email' id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} onBlur={emailblur} type="email" placeholder='E-mail Id'/>
             <span className='logininputerr'>{emailErr}</span>
        
             <p className='inputboxetitle flex justify-start mt-5'>Password<span className='reuiredfield'>*</span></p>
             <input className='logininputsstyle' name='password' id='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} onBlur={passblur} type="password" placeholder='Password'/>
             <span className='logininputerr'>{passErr}</span>

             </div>

             <div className='cardfootersection'>
                <span><input className='mr-2 h-4' type='checkbox'/><NavLink className="cardfooternavigate">Remember Me</NavLink></span>
                <NavLink className="cardfooternavigate" to="/forgot">Forgot Password</NavLink>
             </div>

           </div>
 
           <div className='text-center'>

              <button onClick={loginbtn} disabled={disval} className='loginbtnstyle'>Get Started<i className="ml-3 fa-solid fa-arrow-right"></i></button>

           </div>

      </div>

    </div>
    </>
  );
};

export default Login;