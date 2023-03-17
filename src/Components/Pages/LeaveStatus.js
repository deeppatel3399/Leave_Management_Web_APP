import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../Navbar';
import Footer from '../Footer';

const LeaveStatus = () => {

const[leaveData,setLeaveData] = useState([]);

useEffect(()=>{

    axios.post("/leavestatus",{
        token:window.localStorage.getItem("token")
    })
    .then((data)=>{
    if(data.data.status===200)
    {
       setLeaveData(data.data.data);
    }
    })

});

  return (
    <>
    <Navbar/>
    <div className='leavestatusmaincontainer'>

        <p className='lsheadingtext text-center text-3xl text-primary-dark font-bold mt-5'>Leave Request Status</p>

        <div className='lstabelstyle'>
        <table className="tablestyle mx-20 my-10">
        <thead>
          <tr className='border-2 border-black'>
            <th className="tableheading" >Sr.No</th>
            <th className="tableheading" >From Date</th>
            <th className="tableheading" >To Date</th>
            <th className="tableheading" >Category</th>
            <th className="tableheading" >Total Days</th>
            <th className="tableheading" >Note</th>
            <th className="tableheading" >Status</th>
            <th className="tableheading" >Manager Comment</th>
          </tr>
        </thead>
        <tbody>
          {leaveData.map((val,ind)=>(
                <tr key={ind} className="border h-9 border-black">
                <td className="tablecoldata" >{ind+1}</td>
                <td className="tablecoldata" >{new Date(val.fromDate).toLocaleDateString("in-en")}</td>
                <td className="tablecoldata" >{new Date(val.toDate).toLocaleDateString("in-en")}</td>
                <td className="tablecoldata" >{val.typeOfLeave}</td>
                <td className="tablecoldata" >{val.days}</td>
                <td className="tablecoldata" >{val.note}</td>
                <td className="tablecoldata" >{val.status}</td>
                <td className="tablecoldata" >{val.managerNote}</td>
                </tr>
          ))}
        </tbody>
        </table>
        </div>

    </div>
    <Footer/>
    </>
  );
};

export default LeaveStatus;