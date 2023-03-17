import React, { useEffect, useState } from 'react';
import '../../App.css';
import axios from 'axios';

const ResetPass = () => {

  const[email,setEmail] = useState("");
  const[newPassword,setNewPassword] = useState("");
  const[confNewPassword,setConfNewPassword] = useState("");
  const[disval,setDisVal] = useState(true);
  const[newPassErr,setNewPassErr] = useState("");
  const[confNewPassErr,setConfNewPassErr] = useState("");

  const newpassblur = ()=>
  {
     if(newPassword==="")
     {
         setNewPassErr("Enter New Password");
     }
     else
     {
         if(newPassword.match(passCheck))
         {
             setNewPassErr("");
         }
         else
         {
             setNewPassErr("Minimum eight characters At least one letter One number One special character");
         }
     }
 
  };
  const confnewpassblur = ()=>
  {
     if(confNewPassword==="")
     {
         setConfNewPassErr("Enter Confirm Password");
     }
     else
     {
         if(confNewPassword!==newPassword)
         {
          setConfNewPassErr("Password Not match");
         }
         else
         {
          setConfNewPassErr("");
         }
     }

 
  };
  const ResetPassbtn = ()=>{
    if(newPassword==="")
    {
       setNewPassErr("Enter Password");
    }
    if(confNewPassword==="")
    {
     setConfNewPassErr("Enter Confirm Password");
    }
    axios.post("/resetpassword",{
        email,
        newPassword
    }).then((data)=>{

        if(data.data.status===200)
        {
            alert("Password Update");
            window.location.href = "/";
            window.localStorage.clear();
        }
        else
        {
            alert("Invalid Current Password");
        }
    })


  };
   
  const passCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

   useEffect(()=>{

    setEmail(window.localStorage.getItem("email"));

    if(newPassword==="")
    {
        setDisVal(true);
    }
    else if(newPassword.match(passCheck))
    {
        setDisVal(false);
        setNewPassErr("");
    }
    else
    {
       setDisVal(true);
    }

    if(confNewPassword==="")
    {
        setDisVal(true);
    }
    else if(newPassword===confNewPassword)
    {
        setDisVal(false);
        setConfNewPassErr("");
    }
    else
    {
       setDisVal(true);
    }
   },[newPassword,confNewPassword,newPassErr,confNewPassErr,disval,passCheck]);


  return (
    <>
      <div className='ResetPassmaincontainer'>

        <div className='ResetPasscardcontainer'>

            <div className='ResetPasscardheading'>Reset Password</div>

            <div className='ResetPasscardstyle'>

            <div className='text-center mb-5'>

                <p className='text-center'><i className="fa-solid fa-user usericon"></i></p>

            </div>

            <div className='ResetPassinputsection'>

            <p className='inputboxetitle mt-5 flex justify-start'>New Password<span className='reuiredfield'>*</span></p>
            <input className='ResetPassinputsstyle' name='password' id='password' value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} onBlur={newpassblur} type="password" placeholder='Enter New Password'/>
            <span className='ResetPassinputerr'>{newPassErr}</span>
        
            <p className='inputboxetitle flex justify-start mt-5'>Confirm New Password<span className='reuiredfield'>*</span></p>
            <input className='ResetPassinputsstyle' name='ResetPassword' id='confpassword' value={confNewPassword} onChange={(e)=>{setConfNewPassword(e.target.value)}} onBlur={confnewpassblur} type="password" placeholder='Re-Enter New Password'/>
            <span className='ResetPassinputerr'>{confNewPassErr}</span>

            </div>

            </div>

            <div className='text-center'>

                <button onClick={ResetPassbtn} disabled={disval} className='ResetPassbtnstyle'>Reset Password</button>

            </div>

        </div>

        </div>
    </>
  );
};

export default ResetPass;