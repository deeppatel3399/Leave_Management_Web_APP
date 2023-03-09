import React from 'react';
import { useState,useEffect } from 'react';
import axios from 'axios';
import '../../App.css';
import Navbar from '../Navbar';
import Footer from '../Footer';

const LeaveReq = () => {

const[firstDate,setFirstDate] = useState('');
const[lastDate,setLastDate] = useState();
const[days,setDays] = useState(0);

const[reason,setReason] = useState("select");
const[fromDateValid,setFromDateValid] = useState("");
const[toDateValid,setToDateValid] = useState("");
const[reasonValid,setReasonValid] = useState("");
const[disVal,setDisVal] = useState(true);

const[userDataFName,setUserDataFName] = useState("");
const[userDataLName,setUserDataLName] = useState("");


const blurfromdate = () =>
{
    var ind = new Date(firstDate).getDay();
    if(!firstDate)
    {
     setFromDateValid("From Date Required");
     document.getElementById("validdatetwo").disabled = true;
    }
    else if(ind===0 || ind===6)
    {
     setFromDateValid("Weekends not allowed");
    }
    else
    {
     setFromDateValid("");
     document.getElementById("validdatetwo").disabled = false;
    }
} 
const blurtodate = () =>
{
    var ind = new Date(lastDate).getDay();

    if(!lastDate)
    {
        setToDateValid("To Date Required");
    }
    else if(ind===0 || ind===6)
    {
     setToDateValid("Weekends not allowed");
    }
    else
    {
        setToDateValid("");
    }
} 
const blurreasonleave = () =>
{
    if(reason==="select")
    {
        setReasonValid("Please select Category of leave");
    }
    else
    {
        setReasonValid("");
    }
}      
const clear = () =>
{
    setReason('');
    setDays('');
    document.getElementById("validdateone").value = '';
    document.getElementById("validdatetwo").value = '';
    document.getElementById("note").value = '';
    setFromDateValid("");
    setToDateValid("");
    setReasonValid("");
    document.getElementById("validdatetwo").disabled = false;
    setDisVal(true);
};
const submit = () =>
{
   if(!firstDate)
   {
    setFromDateValid("From Date Required");
   }
   if(!lastDate)
   {
    setToDateValid("To Date Required");
   }
   if(firstDate && lastDate)
   {
    alert("Leave Request Sent Successfully");
   }
};

var today = new Date().toISOString().split('T')[0];

useEffect(()=>{

const fetchdata = ()=>{

    axios.post("http://localhost:3001/userdata",{
        token:window.localStorage.getItem("token")
     })
     .then((data)=>{
      console.log(data.data);
      setUserDataFName(data.data.data.fname);
      setUserDataLName(data.data.data.lname);
      if(data.data.status===498)
      {
        window.localStorage.clear();
        window.location.href = '/';
      }
     })

    // fetch("http://localhost:3001/userdata",{
    //     method:"POST",
    //     crossDomain: true,
    //     headers:{
    //         "Content-Type":"application/json",
    //         Accept:"application/json",
    //         "Access-Control-Allow-Origin":"*",
    //     },
    //     body:JSON.stringify({
    //         token:window.localStorage.getItem("token")
    //     })
    //    }).then((res)=>res.json())
    //    .then((data)=>{
    //     console.log(data);
    //     setUserDataFName(data.data.fname);
    //     setUserDataLName(data.data.lname);
    //    })

};

fetchdata();

const disfun = () =>
{
    if(firstDate && lastDate)
    {
    setDisVal(false);
    }
    if(reason==="select")
    {
    setDisVal(true);
    }
};   
disfun();

var date1 = new Date(firstDate);
var date2 = new Date(lastDate);
var diffTime = date2.getTime() - date1.getTime(); 
var diffDay;

if(date1===date2)
{
    diffDay = 1;
}
else
{
    diffDay = diffTime/(1000*3600*24)+1;
}

let countholiday = 0;

for(let i=0;i<diffDay;i++)
{
  const currDate = new Date(date1.getTime()+1000*3600*24*i);

  if(currDate.getDay()===0 || currDate.getDay()===6)
  {
    countholiday++;
  }
}
setDays(diffDay-countholiday);
},[firstDate,lastDate,reason]);

  return (
    <>
    <Navbar/>
      <div className='maincontainer' >

        <p className='headingtxt'><i className="fa-solid fa-calendar iconstyle"></i>
        Request Time Off</p>
        <p className='headingtxt'>Welcome {userDataFName+" "+userDataLName}</p>
        <hr/>

        <div className='inputboxes'>
            <div className='basis-1/2'>
                <p className='inputboxetitle'>From<span className='reuiredfield'>*</span></p>
                <input id='validdateone' onKeyDown={(e) => e.preventDefault()} min={today} type="date" onChange={(e)=>setFirstDate(e.target.value)} className='inputboxstyle' onBlur={blurfromdate}/>
                <br/>
                <span className='validmsg'>{fromDateValid}</span>
            </div>
            <div className='basis-1/2'>
                <p className='inputboxetitle'>To<span className='reuiredfield'>*</span></p>
                <input id='validdatetwo' onKeyDown={(e) => e.preventDefault()} min={firstDate} type="date" onChange={(e)=>setLastDate(e.target.value)} className='inputboxstyle' onBlur={blurtodate}/>
                <br/>
                <span className='validmsg'>{toDateValid}</span>
            </div>
        </div>

        <div className='mt-5 pl-5'>
            <p className='inputboxetitle'>Time Off Category<span className='reuiredfield'>*</span></p>
            <select onBlur={blurreasonleave} className='selectboxstyle' id='reasonsdropdown' value={reason} onChange={(e)=>setReason(e.target.value)}>
                <option value="select" defaultValue>select</option>
                <option value="holiday">Holiday</option>
                <option value="paternity">Paternity Leave</option>
                <option value="covid">COVID-19 Leave</option>
                <option value="maternity">Maternity Leave</option>
            </select>
            <br/>
            <span className='validmsg'>{reasonValid}</span>
        </div>

        <div className='mt-5 pl-5'>
            <p className='inputboxetitle'>Days<span className='reuiredfield'>*</span></p>
            <div className='daysdiv'>{days? days : 0}</div>
        </div>

        <div className='mt-5 pl-5'>
            <p className='inputboxetitle'>Note</p>
            <textarea className='notestyle' id='note'></textarea>
        </div>

      </div>

      <div className='btnsection'>
             <button className='submitbtnstyle' id='sbmtbtn' onClick={submit} disabled={disVal}><i className="fa-sharp fa-solid fa-paper-plane mr-2"></i>Send Request</button>
             <button className='cancelbtnstyle' onClick={clear}>Cancel</button>
      </div>
      <Footer/>

    </>
  );
};

export default LeaveReq ;