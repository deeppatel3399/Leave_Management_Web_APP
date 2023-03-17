import React from 'react';
import axios from 'axios';
import EmployLeaveReqCard from '../EmployLeaveReqCard';
import { useEffect, useState,useCallback } from 'react';

const ManagerDash = () => {

  const[employData,setEmployData] = useState([]);
  const[leaveList,setLeaveList] = useState([]);
  const[employName,setEmployName] = useState();

  const fetchData = useCallback(()=>{
  
    axios.post('/managerdata',{
      token:window.localStorage.getItem("token")
    })
    .then((data)=>{

      if(data.data.status===200)
      {
        fetchemployData(data.data.data.managerId);
      }

    })
  },[]);

  const fetchemployData = useCallback((managerId)=>{

    axios.post('/allemploy',{
      managerId
    })
    .then((data)=>{
      setEmployData(data.data.data);
    });
  },[]);

  const fetchLeave = useCallback((employId)=>{

    axios.post("/leavedata",{
      employId
    })
    .then((data)=>{
      
      if(data.data.status===200)
      {
        setLeaveList(data.data.data);
      }
    })

  },[]);

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <>
    <div className='grid grid-cols-12 h-[90vh]'>

    <div className='col-span-4 flex flex-col items-center'>

          {employData.map((val,ind)=>(
            <div key={ind} className='w-2/3 text-center bg-primary-dark flex flex-row justify-evenly rounded-lg p-5 my-5' onClick={()=>{fetchLeave(employData[ind]._id);setEmployName(employData[ind].fname+" "+employData[ind].lname)}}>
              <div className='font-bold text-xl text-white'>{ind+1}</div>
              <div className='font-bold text-xl text-white'>{val.fname+" "+val.lname}</div>
            </div>
          ))}

    </div>


    <div className='col-span-8 flex flex-row flex-wrap h-screen overflow-auto'>

      {leaveList.map((val,ind)=>(
      <div className='col-span-3 basis-1/2' key={ind}>
         <EmployLeaveReqCard name={employName} from={new Date(val.fromDate).toLocaleDateString("in-en")} to={new Date(val.toDate).toLocaleDateString("in-en")} days={val.days} note={val.note}/>
      </div>
      ))}

    </div>

    </div>
    </>
  );
};

export default ManagerDash;