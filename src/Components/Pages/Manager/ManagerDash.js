import React from 'react';
import axios from 'axios';
import EmployLeaveReqCard from '../../EmployLeaveReqCard';
import Navbar from '../../Navbar';
import { useEffect, useState,useCallback } from 'react';
import {IoIosPeople} from 'react-icons/io';
import nodata from '../../../Images/nodata.png';

const ManagerDash = () => {

  const[employData,setEmployData] = useState([]);
  const[managerData,setManagerData] = useState([]);
  const[leaveList,setLeaveList] = useState([]);
  const[employName,setEmployName] = useState();

  const [activeBtn,setActiveBtn] = useState(1);

  const[isEmployeeDataLoading,setIsEmployeeDataloading] = useState(true);
  const[isManagerDataLoading,setIsManagerDataloading] = useState(true);
  const[isLeaveDataLoading,setIsLeaveDataloading] = useState(true);

  const fetchData = useCallback(()=>{
  
    axios.post('manager/managerdata',{
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

    axios.post('manager/allemploy',{
      managerId
    })
    .then((data)=>{
      setEmployData(data.data.employeeData);
      setManagerData(data.data.managerData);
      setIsEmployeeDataloading(false);
      setIsManagerDataloading(false);
      if(data.data.employeeData.length>0)
      {
        fetchLeave(data.data.employeeData[0]._id);
        setEmployName(data.data.employeeData[0].fname+" "+data.data.employeeData[0].lname);
      }
      else if(data.data.managerData.length>0)
      {
        fetchLeave(data.data.managerData[0]._id);
        setEmployName(data.data.managerData[0].fname+" "+data.data.managerData[0].lname);
      }
    });
  },[]);

  const fetchLeave = useCallback((employId)=>{

    axios.post("manager/leavedata",{
      employId
    })
    .then((data)=>{
      
      if(data.data.status===200)
      {
        setLeaveList(data.data.data.reverse());
        setIsLeaveDataloading(false);
      }
    })

  },[]);

  useEffect(()=>{
    fetchData();
  },[])

  return (
    <>
    <Navbar/>
    
    <div className='grid grid-cols-12 h-[90vh]'>

    <div className='col-span-4 flex flex-col items-center'>
      <h1 className='text-2xl text-primary-dark font-bold text-center my-5 flex'><IoIosPeople size={35} className='mr-3'/>Employee List</h1>
      <hr className='w-10/12'/>


        {
      isEmployeeDataLoading===true||isManagerDataLoading===true?
        <div role="status" className="w-10/12 mt-10 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
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
        employData.length>0?
           employData.map((val,ind)=>(
            <div key={ind} 
            className={`w-2/3 text-center  flex flex-row justify-evenly rounded-lg p-5 my-5 hover:bg-primary cursor-pointer ${activeBtn===ind+1?"bg-primary":"bg-primary-dark"}`} 
            value={activeBtn} 
            onClick={()=>{fetchLeave(employData[ind]._id);
              setEmployName(employData[ind].fname+" "+employData[ind].lname);
              setActiveBtn(ind+1)}}
            >
              <div className='font-bold text-xl text-white'>{ind+1}</div>
              <div className='font-bold text-xl text-white'>{val.fname+" "+val.lname}</div>
            </div>
          ))
        :
        managerData.length>0?
           managerData.map((val,ind)=>(
            <div key={ind} 
            className={`w-2/3 text-center  flex flex-row justify-evenly rounded-lg p-5 my-5 hover:bg-primary cursor-pointer ${activeBtn===ind+1?"bg-primary":"bg-primary-dark"}`} 
            value={activeBtn} 
            onClick={()=>{fetchLeave(managerData[ind]._id);
              setEmployName(managerData[ind].fname+" "+managerData[ind].lname);
              setActiveBtn(ind+1)}}
            >
              <div className='font-bold text-xl text-white'>{ind+1}</div>
              <div className='font-bold text-xl text-white'>{val.fname+" "+val.lname}</div>
            </div>
          ))
        :
        <div className='text-center my-5'>
        <h1 className='text-lg font-bold text-error'>No Employee / Manager Found...</h1>
        </div>
        }

    </div>


    <div className='col-span-8 flex flex-row flex-wrap mt-3 overflow-auto'>
      {
      isLeaveDataLoading===true?
      <>
          <div role="status" className="space-y-2.5 animate-pulse w-full mt-20 mx-20 flex flex-col  items-start">
              <div className="flex items-center w-full space-x-2">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[480px]">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[400px]">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[480px]">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[440px]">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[360px]">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <span className="sr-only">Loading...</span>
          </div>
          <div role="status" className="space-y-2.5 animate-pulse w-full mt-20 mx-20 flex flex-col  items-start">
              <div className="flex items-center w-full space-x-2">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[480px]">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[400px]">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[480px]">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[440px]">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[360px]">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <span className="sr-only">Loading...</span>
          </div>
          <div role="status" className="space-y-2.5 animate-pulse w-full mt-20 mx-20 flex flex-col  items-start">
              <div className="flex items-center w-full space-x-2">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[480px]">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[400px]">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[480px]">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[440px]">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[360px]">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <span className="sr-only">Loading...</span>
          </div>
          <div role="status" className="space-y-2.5 animate-pulse w-full mt-20 mx-20 flex flex-col  items-start">
              <div className="flex items-center w-full space-x-2">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[480px]">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[400px]">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[480px]">
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
                          <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[440px]">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-32"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-full"></div>
              </div>
              <div className="flex items-center w-full space-x-2 max-w-[360px]">
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
                  <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-80"></div>
                  <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-full"></div>
              </div>
              <span className="sr-only">Loading...</span>
          </div>
      </>     
      :
      leaveList.length===0?
      <div className='w-full h-3/4 mt-20 flex justify-center'>
        <img src={nodata} alt="nodatafound"/>
      </div>
      :
      leaveList.map((val,ind)=>(
      <div className='col-span-3 basis-1/2 pb-3' key={ind}>
         <EmployLeaveReqCard 
         name={employName}
          from={new Date(val.fromDate).toLocaleDateString("in-en")} to={new Date(val.toDate).toLocaleDateString("in-en")} days={val.days} note={val.note} leavListData={leaveList[ind]} managerNote={val.managerNote} status={val.status}/>
      </div>
      ))
      }

    </div>

    </div>
    </>
  );
};

export default ManagerDash;