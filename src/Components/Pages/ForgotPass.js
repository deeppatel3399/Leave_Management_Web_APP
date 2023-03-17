import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import "../../App.css";

const ForgotPass = () => {

    const[email,setEmail] = useState("");
    const[emailErr,setEmailErr] = useState("");
    const[disval,setDisVal] = useState(true);

    const checkEmail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    const emailblur = ()=>
    {
        if(email==="")
        {
            setEmailErr("Enter Email Id");
            setDisVal(true);
        }
        else
        {
            if(email.match(checkEmail))
            {
                setEmailErr("");
                setDisVal(false);
            }
            else
            {
                setEmailErr("Invalid Email");
                setDisVal(true);
            }
        }
    };
    const nextbtn = ()=>{
        if(email==="")
        {
           setEmailErr("Enter Email-Id");
           setDisVal(true);
        }
        else
        {
            setDisVal(false);
        }

        axios.post("/forgotpassword",{
            email
        }).then((data)=>{
            if(data.data.status===200)
            {
                window.location.href = "/resetpassword";
                window.localStorage.setItem("email",email);
                window.localStorage.setItem("emailval",true);
            }
            else
            {
                alert("Invalid Email-Id");
                window.localStorage.clear();
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
    

    },[email,emailErr,checkEmail])


  return (
    <>
      <div className='forgotpassmaincontainer'>

        <div className='forgotpasscardcontainer'>

            <div className='forgotpasscardheading'>Forgot Password</div>

            <div className='forgotpasscardstyle'>

            <div className='text-center mb-5'>

                <p className='text-center'><i className="fa-solid fa-user usericon"></i></p>
                <NavLink className="linktoregister" to='/'><i className="fa-solid fa-backward mr-5"></i>Go Back To Login Page</NavLink>

            </div>

            <div className='forgotpassinputsection'>
            
            <p className='inputboxetitle flex justify-start'>Email-Id<span className='reuiredfield'>*</span></p>
            <input className='forgotpassinputsstyle' name='email' id='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} onBlur={emailblur} type="email" placeholder='Enter Existing Email-Id'/>
            <span className='forgotpassinputerr'>{emailErr}</span>
        
            </div>

            </div>

            <div className='text-center'>

                <button onClick={nextbtn} disabled={disval} className='nextbtnstyle'>Next<i className="ml-5 fa-solid fa-forward"></i></button>

            </div>

        </div>

    </div>
      
    </>
  );
};

export default ForgotPass;