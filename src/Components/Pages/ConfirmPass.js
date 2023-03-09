import React, { useEffect, useState } from 'react';
import '../../App.css';
import { NavLink } from 'react-router-dom';

const ConfirmPass = () => {

  const[password,setPassword] = useState("");
  const[confPassword,setConfPassword] = useState("");
  const[disval,setDisVal] = useState(true);
  const[passErr,setPassErr] = useState("");
  const[confPassErr,setConfPassErr] = useState("");

  const passblur = ()=>
  {
     if(password==="")
     {
         setPassErr("Enter New Password");
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
 
  };
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

 
  };
  const confirmpassbtn = ()=>{
    if(password==="")
    {
       setPassErr("Enter Password");
    }
    if(confPassword==="")
    {
     setConfPassErr("Enter Confirm Password");
    }
  };
   
  const passCheck = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

   useEffect(()=>{

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


   },[password,confPassword,passErr,confPassErr,disval]);


  return (
    <>
          <div className='confirmpassmaincontainer'>

<div className='confirmpasscardcontainer'>

     <div className='confirmpasscardheading'>Update Password</div>

     <div className='confirmpasscardstyle'>

       <div className='text-center mb-5'>

         <p className='text-center'><i className="fa-solid fa-user usericon"></i></p>
         <NavLink className="linktoregister" to='/'><i class="fa-solid fa-backward mr-5"></i>Go Back To Login Page</NavLink>

       </div>

       <div className='confirmpassinputsection'>
      
       <p className='inputboxetitle flex justify-start'>Password<span className='reuiredfield'>*</span></p>
      <input className='confirmpassinputsstyle' name='password' id='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} onBlur={passblur} type="password" placeholder='Enter New Password'/>
       <span className='confirmpassinputerr'>{passErr}</span>
  
       <p className='inputboxetitle flex justify-start mt-5'>Confirm Password<span className='reuiredfield'>*</span></p>
       <input className='confirmpassinputsstyle' name='confirmpassword' id='confpassword' value={confPassword} onChange={(e)=>{setConfPassword(e.target.value)}} onBlur={confpassblur} type="password" placeholder='Re-Enter New Password'/>
       <span className='confirmpassinputerr'>{confPassErr}</span>

       </div>

     </div>

     <div className='text-center'>

        <button onClick={confirmpassbtn} disabled={disval} className='confirmpassbtnstyle'>Update Password<i class="fa-solid fa-envelope ml-5"></i></button>

     </div>

</div>

</div>
    </>
  );
};

export default ConfirmPass;