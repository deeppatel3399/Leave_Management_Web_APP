import React, { useEffect, useState } from 'react';
import '../../../App.css';
import axios from 'axios';

const ConfirmPass = () => {

  const[email,setEmail] = useState("");
  const[newPassword,setNewPassword] = useState("");
  const[confNewPassword,setConfNewPassword] = useState("");
  const[currentPassword,setCurrentPassword] = useState("");
  const[disval,setDisVal] = useState(true);
  const[newPassErr,setNewPassErr] = useState("");
  const[confNewPassErr,setConfNewPassErr] = useState("");
  const[currentPassErr,setCurrentPassErr] = useState("");

  const newpassblur = ()=>
  {
     if(newPassword==="")
     {
         setNewPassErr("Enter New Password");
     }
     else if(currentPassword===newPassword)
     {
         setNewPassErr("Current and New Password must be unique");
         setDisVal(true);
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
     else if(currentPassword===confNewPassword)
     {
         setConfNewPassErr("Current and New Password must be unique");
         setDisVal(true);
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
  const currentpassblur = ()=>
  {
     if(currentPassword==="")
     {
         setCurrentPassErr("Enter Current Password");
         setDisVal(true);
     }
     else
     {
         if(currentPassword.match(passCheck))
         {
             setCurrentPassErr("");
         }
         else
         {
             setCurrentPassErr("Invalid Password");
             setDisVal(true);
         }
     }
  };
  const confirmpassbtn = ()=>{
    if(newPassword==="")
    {
       setNewPassErr("Enter Password");
    }
    if(confNewPassword==="")
    {
     setConfNewPassErr("Enter Confirm Password");
    }
    if(currentPassword==="")
    {
        setCurrentPassErr("Enter Current Password");
    }

    axios.post("/updatepassword",{
        currentPassword,
        newPassword,
        token:window.localStorage.getItem("token")
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
    else if(currentPassword===newPassword)
    {
        setNewPassErr("Current and New Password must be unique");
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
    else if(currentPassword===confNewPassword)
    {
        setConfNewPassErr("Current and New Password must be unique");
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
    if(currentPassword==="")
    {
        setDisVal(true);
    }
    else if(currentPassword.match(passCheck))
    {
        setCurrentPassErr("");
    }
    else
    {
        setDisVal(true);
    }

   },[newPassword,confNewPassword,newPassErr,confNewPassErr,disval,passCheck,currentPassword,currentPassErr]);


  return (
    <>
      <div className='confirmpassmaincontainer'>

        <div className='confirmpasscardcontainer'>

            <div className='confirmpasscardheading'>Update Password</div>

            <div className='confirmpasscardstyle'>

            <div className='text-center mb-5'>

                <p className='text-center'><i className="fa-solid fa-user usericon"></i></p>

            </div>

            <div className='confirmpassinputsection'>

            <p className='inputboxetitle flex justify-start'>Current Password<span className='reuiredfield'>*</span></p>
            <input className='confirmpassinputsstyle' name='currentpassword' id='currentpassword' value={currentPassword} onChange={(e)=>{setCurrentPassword(e.target.value)}} onBlur={currentpassblur} type="password" placeholder='Enter Your Current Password'/>
            <span className='confirmpassinputerr'>{currentPassErr}</span>
            
            <p className='inputboxetitle mt-5 flex justify-start'>New Password<span className='reuiredfield'>*</span></p>
            <input className='confirmpassinputsstyle' name='password' id='password' value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}} onBlur={newpassblur} type="password" placeholder='Enter New Password'/>
            <span className='confirmpassinputerr'>{newPassErr}</span>
        
            <p className='inputboxetitle flex justify-start mt-5'>Confirm New Password<span className='reuiredfield'>*</span></p>
            <input className='confirmpassinputsstyle' name='confirmpassword' id='confpassword' value={confNewPassword} onChange={(e)=>{setConfNewPassword(e.target.value)}} onBlur={confnewpassblur} type="password" placeholder='Re-Enter New Password'/>
            <span className='confirmpassinputerr'>{confNewPassErr}</span>

            </div>

            </div>

            <div className='text-center'>

                <button onClick={confirmpassbtn} disabled={disval} className='confirmpassbtnstyle'>Update Password</button>

            </div>

        </div>

        </div>
    </>
  );
};

export default ConfirmPass;