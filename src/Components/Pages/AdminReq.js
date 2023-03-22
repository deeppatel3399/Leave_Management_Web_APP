import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";

const AdminReq = () => {
  const [leaves, setLeaves] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState("");
  const [filterLeave, setFilterLeave] = useState("");
  const [startDate,setStartDate] = useState(new Date());
  const [endDate,setEndDate] = useState(new Date());

  const fetchLeaves = useCallback(async () => {
    try {
      const res = await axios.get("/admin/leaves");
      setLeaves(res.data);
    } catch (err) {
      alert(err);
    }
  }, []);

  const leaveFilterFun = ()=>
  {
    if (filterLeave === "LW") 
    {
      const today = new Date();
      setEndDate(new Date(today));

      const lastDate = new Date(today.setDate(today.getDate() - 7));
      setStartDate(new Date(lastDate));
    }
  };

  useEffect(() => {
    fetchLeaves();
    if(filterLeave!="")
    {
      leaveFilterFun();
    }

  }, [filterLeave]);
  

  return (
    <>
      <Navbar />
      {/* {
              leaves.filter((val)=>
              {
                const createdDate = new Date(val.createdAt);
                const getDate = createdDate.getDate();
                const getMonth = createdDate.getMonth();
                const getYear = createdDate.getYear();
        
                const startGetDate = startDate.getDate();
                const endGetdate = endDate.getDate();
        
                if(startGetDate<=getDate && endGetdate>=getDate)
                {
                  return val;
                }
              })
              .map((val,ind)=>{
                <p>{ind+1+" "+new Date(val.fromDate).toLocaleDateString("in-en")+" "+new Date(val.toDate).toLocaleDateString("in-en")}</p>
              })
      } */}
      <h1 className="font-bold text-2xl text-center text-primary-dark mt-5">
        Employee Leave List
      </h1>
      <div className="mt-5 p-5">
        <div className="grid grid-cols-12">
          <div className="col-span-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-3 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full h-11 p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Employee Name"
                required
              />
            </div>
          </div>

          <div className="col-span-3 col-start-6">
            <select
              id="leavestatus"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-11"
              value={leaveStatus}
              onChange={(e) => {
                setLeaveStatus(e.target.value);
              }}
            >
              <option defaultValue="status">Leave Status</option>
              <option value="">All</option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="C">Cancelled</option>
            </select>
          </div>

          <div className="col-span-3 col-start-10">
            <select
              id="filterleaves"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-11"
              value={filterLeave}
              onChange={(e) => {
                setFilterLeave(e.target.value);
              }}
            >
              <option defaultValue="Filter">Filter Leaves</option>
              <option value="LW">Last Week</option>
              <option value="LM">Last Month</option>
              <option value="FTE">From to End Date</option>
            </select>
          </div>
        </div>

        {filterLeave === "FTE" ? (
          <div className="flex items-center mt-5 justify-center">
            <div className="relative">
              <p className="text-md font-bold text-primary-dark">From Date</p>
              <input
                name="start"
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date start"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
            <span className="mx-4 font-bold text-primary-dark">to</span>
            <div className="relative">
              <p className="text-md font-bold text-primary-dark">To Date</p>
              <input
                name="end"
                type="date"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Select date end"
                onKeyDown={(e) => {
                  e.preventDefault();
                }}
              />
            </div>
          </div>
        ) : null}

        <div className="mt-5 p-5">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left">
              <thead className="text-md bg-primary text-white">
                <tr>
                  <th scope="col" className="px-6 w-28 py-3">
                    Sr. No
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Employee Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    From Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    To Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Days
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category of Leave
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Manager Note
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaves
                  .filter((val) =>
                    leaveStatus ?
                    // || filterLeave ? 
                    val.status===leaveStatus
                    // ||
                    // ((val.fromDate>=startDate&&val.fromDate<=endDate)
                    // &&(val.toDate>=startDate&&val.toDate<=endDate)
                    // ) 
                    : val
                  )
                  .map((val, ind) => (
                    <tr
                      className="border-b bg-primary-dark text-white hover:bg-primary"
                      key={ind}
                    >
                      <th scope="row" className="px-6 py-4 font-medium">
                        {ind + 1}
                      </th>
                      <td className="px-6 py-4">
                        {val.employId.fname || ""} {val.employId.lname || ""}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(val.fromDate).toLocaleDateString("in-en")}
                      </td>
                      <td className="px-6 py-4">
                        {new Date(val.toDate).toLocaleDateString("in-en")}
                      </td>
                      <th scope="row" className="px-6 py-4 font-medium">
                        {val.status}
                      </th>
                      <td className="px-6 py-4">{val.days}</td>
                      <td className="px-6 py-4">{val.typeOfLeave}</td>
                      <td className="px-6 py-4">{val.managerNote}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminReq;
