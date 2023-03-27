import React, { useEffect, useState } from 'react';
import '../../../App.css';
import data from '../../../api/leaveapi.json';
import Navbar from '../../Navbar';
import Footer from '../../Footer';

const LeaveList = () => {

  const[leavData,setLeaveData] =  useState([]);

  useEffect(()=>{
    setLeaveData(data.LEAVE_DATA);
  },[]);

  return (
    <>
    <Navbar/>
    <div className='listmaincontainer'>
      <p className='listheading'>Holiday List</p>
      <hr/>
      <div className='tablecontainer'>
          <table className="tablestyle">
        <thead>
          <tr className='border-2 border-black'>
            <th className="tableheading" >Month</th>
            <th className="tableheading" >Date</th>
            <th className="tableheading" >Day</th>
            <th className="tableheading" >Festival/National Holiday</th>
            <th className="tableheading" >No.of Days</th>
          </tr>
        </thead>
        <tbody>
          {leavData.map((val,key)=>(
                <tr key={key} className="border h-9 border-black">
                <td className="" >{val.month}</td>
                <td className="tablecoldata" >{val.date}</td>
                <td className="tablecoldata" >{val.day}</td>
                <td className="tablecoldata" >{val.type}</td>
                <td className="tablecoldata" >{val.no_of_days}</td>
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

export default LeaveList;