import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from '../../Navbar';
import LatestLeave from './LatestLeave';

const AdminDash = () => {

  const[managerData,setManagerData] = useState([]);
  const[employeeData,setEmployeerData] = useState([]);

  const[leaveVal,setLeaveVal] = useState(true);
  const[managerVal,setManagerVal] = useState(false);
  const[employeeVal,setEmployeeVal] = useState(false);

  const fetchdata = async()=>
  {
    const res = await axios.get("admin/admindash");

    setManagerData(res.data.manager);
    setEmployeerData(res.data.employee);

  };

  useEffect(()=>{

   fetchdata();

  },[])

  return (
    <>
    <Navbar/>

    <div>
      
      <div className='grid grid-cols-12'>

        <div className='col-span-2 h-screen w-full bg-light px-6 py-8'>

          <button className='w-full h-10 my-3 text-primary-dark font-bold text-lg hover:bg-primary-dark hover:text-white hover:rounded' onClick={()=>{setManagerVal(false);setEmployeeVal(false);setLeaveVal(true);}}>
          <i className="fa-solid fa-list"></i> Latest Leave List
          </button>
          <button className='w-full h-10 my-3 text-primary-dark font-bold text-lg hover:bg-primary-dark hover:text-white hover:rounded' onClick={()=>{setManagerVal(true);setEmployeeVal(false);setLeaveVal(false);}}>
          <i className="fa-solid fa-list"></i> Manager List
          </button>
          <button className='w-full h-10 my-3 text-primary-dark font-bold text-lg hover:bg-primary-dark hover:text-white hover:rounded' onClick={()=>{setManagerVal(false);setEmployeeVal(true);setLeaveVal(false);}}>
          <i className="fa-solid fa-list"></i> Employee List
          </button>
          
 

        </div> 

        <div className='col-span-10 h-screen w-full p-10 flex flex-col items-center'>

          {leaveVal===true?
          <>
            <h1>LATEST 4 LEAVE</h1>

            <div className='grid grid-cols-12'>
                <div className='col-span-4 col-start-2'>
                <LatestLeave/>
                </div>
                <div className='col-span-4 col-start-7'>
                <LatestLeave/>
                </div>
            </div>
          </>
          :managerVal===true?
          <>
          <h1 className='text-2xl text-primary-dark font-bold text-center pb-10'>Manager List</h1>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-3/4">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Sr. No.
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Manager Name
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Manager Id
                            </th>
                            <th scope="col" className="px-6 py-3">
                                <span className="sr-only">Edit</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                      {managerData.map((val,ind)=>(
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={ind}>
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {ind+1}
                            </th>
                            <td className="px-6 py-4">
                               {val.fname+" "+val.lname}
                            </td>
                            <td className="px-6 py-4">
                                {val.managerId}
                            </td>
                            <td className="px-6 py-4 text-right">
                                <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                            </td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
          </>
          :employeeVal===true?
          <>
          <h1 className='text-2xl text-primary-dark font-bold text-center pb-10'>Employee List</h1>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-3/4">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr>
                          <th scope="col" className="px-6 py-3">
                              Sr. No.
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Employee Name
                          </th>
                          <th scope="col" className="px-6 py-3">
                              Employee Email Id
                          </th>
                          <th scope="col" className="px-6 py-3">
                              <span className="sr-only">Edit</span>
                          </th>
                      </tr>
                  </thead>
                  <tbody>
                    {employeeData.map((val,ind)=>(
                      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={ind}>
                          <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                              {ind+1}
                          </th>
                          <td className="px-6 py-4">
                             {val.fname+" "+val.lname}
                          </td>
                          <td className="px-6 py-4">
                              {}
                          </td>
                          <td className="px-6 py-4 text-right">
                              <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                          </td>
                      </tr>
                      ))}
                  </tbody>
              </table>
          </div>
          </>
          :null
          }

        </div> 

      </div>

    </div>

    </>
  );
};

export default AdminDash;