import React, { useEffect, useState ,useCallback,Image } from 'react';
import axios from 'axios';
import Navbar from '../../Navbar';
import nodata from '../../../Images/nodata.png';
import {MdPendingActions} from 'react-icons/md';
import {FcDeleteDatabase} from 'react-icons/fc';

const LeaveStatus = () => {

const[leaveData,setLeaveData] = useState([]);

const [isLoading,setIsLoading] = useState(true);

const cancelLeave = useCallback((leaveId)=>
{
  if(window.confirm("Are You Sure?"))
  {
    axios.post("leave/cancelleave",{
      leaveId,
      status:'Cancelled',
    }).then((data)=>{
      if(data.data.status===200)
      {
        alert("Leave Cancelled Successfully");
        fetchleave();
      }
    })
  }
},[]);

const fetchleave = ()=>
{
      axios.post("user/leavestatus",{
        token:window.localStorage.getItem("token")
    })
    .then((data)=>{
    if(data.data.status===200)
    {
       setLeaveData(data.data.data.reverse());
       setIsLoading(false);
    }
    })
}

useEffect(()=>{
  fetchleave();
},[cancelLeave]);

  return (
    <>
    <Navbar/>
    <div className='leavestatusmaincontainer'>

        <p className='lsheadingtext flex flex-row justify-center text-3xl text-primary-dark font-bold mt-5'><MdPendingActions size={40}/>Leave Request Status</p>
        <hr className='my-5 mx-20'/>

        <div className='lstabelstyle'>
        {
          leaveData.length===0&&isLoading===false?


          <div className='text-center my-5'>
            <div className='w-full h-1/2  flex flex-row justify-center'><img src={nodata} alt="nodataimage"/></div>
            <div className='text-error text-lg font-bold justify-center m-0 flex flex-row'><FcDeleteDatabase size={30}/>No Leaves Found...</div>
          </div>:



        isLoading===true?
        <div role="status" className="m-10 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
            <div className="flex items-center justify-between">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <div className="flex items-center justify-between pt-4">
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                </div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
        :
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
            <th className="tableheading" >Edit</th>
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
                <td className="tablecoldata" >{val.status==='Pending'?<button
                onClick={()=>{cancelLeave(val._id)}} 
                className='w-10 hover:bg-error bg-error-dark text-white rounded-full'><i className="fa-solid fa-xmark"></i></button>:<p>-</p>}</td>
                </tr>
          ))}
        </tbody>
        </table>
        }
        </div>

    </div>
    </>
  );
};

export default LeaveStatus;