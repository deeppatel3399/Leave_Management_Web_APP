import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../../App.css";
import Navbar from "../../Navbar";
import Footer from "../../Footer";

const LeaveReq = () => {
  const [firstDate, setFirstDate] = useState("");
  const [lastDate, setLastDate] = useState();
  const [employId, setEmployId] = useState("");
  const [note, setNote] = useState("");
  const[days,setDays] =  useState(0);
  const[remainingLeave,setRemainigLeave] = useState("");

  const [reason, setReason] = useState("select");
  const [fromDateValid, setFromDateValid] = useState("");
  const [toDateValid, setToDateValid] = useState("");
  const [reasonValid, setReasonValid] = useState("");
  const [disVal, setDisVal] = useState(true);

  const [userDataFName, setUserDataFName] = useState("");
  const [userDataLName, setUserDataLName] = useState("");

  const [halfDayVal,setHalfDayVal] = useState(false);

  const blurfromdate = () => {
    var ind = new Date(firstDate).getDay();
    if (!firstDate) {
      setFromDateValid("From Date Required");
    } else if (ind === 0 || ind === 6) {
      setFromDateValid("Weekends not allowed");
    } else {
      setFromDateValid("");
    }
  };
  const blurtodate = () => {
    var ind = new Date(lastDate).getDay();

    if (!lastDate) {
      setToDateValid("To Date Required");
    } else if (ind === 0 || ind === 6) {
      setToDateValid("Weekends not allowed");
    } else {
      setToDateValid("");
    }
  };
  const blurreasonleave = () => {
    if (reason === "select") {
      setReasonValid("Please select Category of leave");
    } else {
      setReasonValid("");
    }
  };
  const submit = () => {
    if (!firstDate) {
      setFromDateValid("From Date Required");
    }
    if (!lastDate) {
      setToDateValid("To Date Required");
    }
    axios
      .post("user/leavereq", {
        employId,
        fromDate: firstDate,
        toDate: lastDate,
        typeOfLeave: reason,
        days,
        note,
      })
      .then((data) => {
        if(data.data.status === 200) {
          alert("Leave Request Apply Successfully");
          clear();
        }
        if(data.data.status===409)
        {
          alert("Leave Already Applied");
          clear();
        }
      });
  };
  const de = ()=>
    {
      var date1 = new Date(firstDate);
      var date2 = new Date(lastDate);
      var diffTime = date2.getTime() - date1.getTime();
      if (date1 === date2) 
      {
        setDays(1);
      } 
      else 
      {
        var diffDay = diffTime / (1000 * 3600 * 24) + 1;
      
        let countholiday = 0;
  
        for (let i = 0; i < diffDay; i++) 
        {
          const currDate = new Date(date1.getTime() + 1000 * 3600 * 24 * i);
    
          if (currDate.getDay() === 0 || currDate.getDay() === 6) {
            countholiday++;
          }
        }
        diffDay = diffDay-countholiday;
        setDays(diffDay);
        console.log(days);
       }
  };
  const clear = () => {
    setReason("select");
    setFirstDate("");
    setLastDate("");
    document.getElementById("validdateone").value = "";
    document.getElementById("validdatetwo").value = "";
    document.getElementById("note").value = "";
    setFromDateValid("");
    setToDateValid("");
    setReasonValid("");
    setDisVal(true);
  };
  var today = new Date().toISOString().split("T")[0];

   useEffect(() => {

    de();

    const fetchdata = () => {
      axios
        .post("user/userdata", {
          token: window.localStorage.getItem("token"),
        })
        .then((data) => {
          setUserDataFName(data.data.data.fname);
          setUserDataLName(data.data.data.lname);
          setEmployId(data.data.data._id);
          setRemainigLeave(data.data.data.remainingLeaveDays);

          if (data.data.status === 498) {
            window.localStorage.clear();
            window.location.href = "/";
          } else {
            window.localStorage.setItem("role",data.data.data.role);
            console.log(window.localStorage.getItem("role"));
          }
        });
    };
    fetchdata();

    const disfun = () => {
      if (firstDate && lastDate) {
        setDisVal(false);
      }
      if (reason === "select") {
        setDisVal(true);
      }
    };
    disfun();

    if(halfDayVal)
    {
      if(firstDate)
      {
        setLastDate(firstDate);
        setDays(0.5);
      }
    }
  }, [firstDate, lastDate,reason,halfDayVal]);


  return (
    <>
      <Navbar />
      <div className="maincontainer">
        <p className="headingtxt">
          <i className="fa-solid fa-calendar iconstyle"></i>
          Request Time Off
        </p>
        <p className="headingtxt">
          Welcome {userDataFName + " " + userDataLName}
        </p>
        <p className="leaveText">
          Remaining Leaves {remainingLeave}
        </p>
        <hr />

        <div className="ml-5 mt-5 flex flex-row items-center">
          <input type="checkbox" className="w-10 h-5" onChange={()=>{setHalfDayVal(!halfDayVal)}}/><span className="text-md text-primary-dark font-bold">Is your leave for Half Day?</span>
        </div>

        <div className="inputboxes">
          <div className="basis-1/2">
            <p className="inputboxetitle">
              From<span className="reuiredfield">*</span>
            </p>
            <input
              id="validdateone"
              onKeyDown={(e) => e.preventDefault()}
              min={today}
              max={lastDate}
              type="date"
              onChange={(e) => {setFirstDate(e.target.value)}}
              className="inputboxstyle"
              onBlur={blurfromdate}
            />
            <br />
            <span className="validmsg">{fromDateValid}</span>
          </div>
          <div className="basis-1/2">
            <p className="inputboxetitle">
              To<span className="reuiredfield">*</span>
            </p>
            <input
              disabled={halfDayVal?true:false}
              id="validdatetwo"
              onKeyDown={(e) => e.preventDefault()}
              min={firstDate}
              // max={}
              type="date"
              onChange={(e) => setLastDate(e.target.value)}
              className="inputboxstyle"
              onBlur={blurtodate}
              value={lastDate}
            />
            <br />
            <span className="validmsg">{toDateValid}</span>
          </div>
        </div>

        <div className="mt-5 pl-5">
          <p className="inputboxetitle">
            Time Off Category<span className="reuiredfield">*</span>
          </p>
          <select
            onBlur={blurreasonleave}
            className="selectboxstyle"
            id="reasonsdropdown"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          >
            <option value="select" defaultValue>
              select
            </option>
            <option value="Holiday">Holiday</option>
            <option value="Paternity">Paternity Leave</option>
            <option value="covid-19">COVID-19 Leave</option>
            <option value="Maternity">Maternity Leave</option>
          </select>
          <br />
          <span className="validmsg">{reasonValid}</span>
        </div>

        <div className="mt-5 pl-5">
          <p className="inputboxetitle">
            Days<span className="reuiredfield">*</span>
          </p>
          <div className="daysdiv">{days?days:0}</div>
        </div>

        <div className="mt-5 pl-5">
          <p className="inputboxetitle">Note</p>
          <textarea
            className="notestyle"
            onChange={(e) => setNote(e.target.value)}
            id="note"
          ></textarea>
        </div>
      </div>

      <div className="btnsection">
        <button
          className="submitbtnstyle"
          id="sbmtbtn"
          onClick={submit}
          disabled={disVal}
        >
          <i className="fa-sharp fa-solid fa-paper-plane mr-2"></i>Send Request
        </button>
        <button className="cancelbtnstyle" onClick={clear}>
          Cancel
        </button>
      </div>
      <Footer />
    </>
  );
};

export default LeaveReq;
