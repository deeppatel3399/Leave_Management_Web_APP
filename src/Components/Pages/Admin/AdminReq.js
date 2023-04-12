import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../../Navbar";
import { RiFileList2Fill } from "react-icons/ri";
import nodata from "../../../Images/nodata.png";
import { utils, writeFile } from "xlsx";

function flatten(obj) {
  var result = {};

  function recurse(cur, prop) {
    if (Object(cur) !== cur) {
      result[prop] = cur;
    } else if (Array.isArray(cur)) {
      for (var i = 0, l = cur.length; i < l; i++)
        recurse(cur[i], prop + "[" + i + "]");

      if (l == 0) result[prop] = [];
    } else {
      var isEmpty = true;

      for (var p in cur) {
        isEmpty = false;

        recurse(cur[p], p);
      }

      if (isEmpty && prop) result[prop] = {};
    }
  }

  recurse(obj, "");

  return result;
}

const AdminReq = () => {
  const [leaves, setLeaves] = useState([]);
  const [allLeaves, setAllLeaves] = useState([]);
  const [leaveStatus, setLeaveStatus] = useState("All");
  const [filterLeave, setFilterLeave] = useState("");
  const [leaveLen, setLeaveLen] = useState();

  const [isLoading, setIsLoading] = useState(true);

  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());

  const [employeeName, setEmployeeName] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = [];

  for (let i = 1; i <= Math.ceil(leaveLen / 5); i++) {
    totalPages.push(i);
  }

  const fetchLeaves = useCallback(async () => {
    try {
      const res = await axios.get(
        `admin/leaves?status=${leaveStatus}&pageno=${currentPage}&name=${employeeName}&filter=${filterLeave}&from=${fromDate}&to=${toDate}`
      );
      setLeaves(res.data.data);
      setAllLeaves(res.data.allLeaves.map(
        d=>flatten(d)
      ));
      setIsLoading(false);
      setLeaveLen(res.data.length);
    } catch (err) {
      alert(err);
    }
  }, [toDate, filterLeave, leaveStatus, currentPage, employeeName]);

  const downloadData = () => {
    const worksheet = utils.json_to_sheet(allLeaves);
    const workbook = utils.book_new();
    utils.book_append_sheet(workbook, worksheet, "Leaves Data");
    writeFile(workbook, "leave_data.xlsx");
  };

  useEffect(() => {
    fetchLeaves();
  }, [toDate, filterLeave, leaveStatus, currentPage, employeeName]);

  return (
    <>
      <Navbar />
      <h1 className="font-bold text-2xl text-center text-primary-dark mt-5 flex justify-center">
        <RiFileList2Fill size={35} className="mr-3" />
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
                value={employeeName}
                onChange={(e) => {
                  setEmployeeName(e.target.value);
                  setIsLoading(true);
                }}
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
                setIsLoading(true);
              }}
            >
              <option defaultValue="All" value="All">
                All
              </option>
              <option value="Pending">Pending</option>
              <option value="Accepted">Accepted</option>
              <option value="Rejected">Rejected</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div className="col-span-3 col-start-10">
            <select
              id="filterleaves"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-11"
              value={filterLeave}
              onChange={(e) => {
                setFilterLeave(e.target.value);
                setIsLoading(true);
              }}
            >
              <option value="">Filter Leaves</option>
              <option value="Last Week">Last Week</option>
              <option value="Last Month">Last Month</option>
              <option value="From to End">From to End Date</option>
            </select>
          </div>
        </div>

        {filterLeave === "From to End" ? (
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
                value={fromDate}
                onChange={(e) => {
                  setFromDate(e.target.value);
                  setIsLoading(true);
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
                value={toDate}
                onChange={(e) => {
                  setToDate(e.target.value);
                  setIsLoading(true);
                }}
              />
            </div>
          </div>
        ) : null}

        <div className="mt-5 p-5">
          {isLoading === true ? (
            <div className="animate-pulse">
              <div className="h-4 bg-gray-400 mt-3 mb-6 rounded"></div>
              <div className="h-4 bg-gray-500 mb-6 rounded"></div>
              <div className="h-4 bg-gray-400 mb-6 rounded"></div>
              <div className="h-4 bg-gray-500 mb-6 rounded"></div>
              <div className="h-4 bg-gray-400 mb-6 rounded"></div>
              <div className="h-4 bg-gray-400 mb-6 rounded"></div>
              <div className="h-4 bg-gray-500 mb-6 rounded"></div>
              <div className="h-4 bg-gray-400 mb-6 rounded"></div>
            </div>
          ) : leaveLen === 0 ? (
            <div className="w-10/12 h-1/2 flex justify-center">
              <img src={nodata} alt="nodata" />
            </div>
          ) : (
            <>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left">
                  <thead className="text-md bg-slate-600 text-white">
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
                        View<i className="ml-2 fa-solid fa-eye"></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaves.map((val, ind) => (
                      <tr
                        className="border-b bg-slate-300 text-black hover:bg-light"
                        key={ind}
                      >
                        <th scope="row" className="px-6 py-4 font-medium">
                          {(currentPage - 1) * 5 + ind + 1}
                        </th>
                        <td className="px-6 py-4">
                          {val.name || ""} 
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
                        <td className="px-6 py-4 text-left">
                          <button className="w-14 hover:bg-primary-dark h-8 rounded-md bg-primary text-white font-bold text-center">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="flex flex-row justify-center">
                <div className="flex flex-row justify-center mt-5 fixed bottom-20">
                  <ul className="inline-flex -space-x-px">
                    <li>
                      <button
                        onClick={() => setCurrentPage(currentPage - 1)}
                        className="px-3 py-2 ml-0 leading-tight text-white bg-primaryborder border-gray-300 rounded-lg hover:bg-primary-dark hover:text-gray-700 dark:bg-primary dark:border-gray-700 dark:text-white dark:hover:bg-primary-dark dark:hover:text-white disabled:bg-slate-500 disabled:cursor-not-allowed disabled:hover:bg-slate-500"
                        disabled={currentPage > 1 ? false : true}
                      >
                        <i className="fa-solid fa-arrow-left"></i>
                      </button>
                    </li>
                    {totalPages.map((val, ind) => (
                      <li key={ind}>
                        <button
                          onClick={() => {
                            setCurrentPage(val);
                          }}
                          className={`px-3 py-2 ml-0 leading-tight font-semibold text-white bg-primaryborder border-gray-300 rounded-lg hover:bg-primary-dark hover:text-white ${
                            val === currentPage
                              ? "dark:bg-primary-dark dark:border-gray-700 text-white"
                              : "dark:bg-primary dark:border-gray-700 dark:text-white"
                          } `}
                        >
                          {val}
                        </button>
                      </li>
                    ))}
                    <li>
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        className="px-3 py-2 ml-0 leading-tight text-white bg-primaryborder border-gray-300 rounded-lg hover:bg-primary-dark hover:text-gray-700 dark:bg-primary dark:border-gray-700 dark:text-white dark:hover:bg-primary-dark dark:hover:text-white disabled:bg-slate-500 disabled:cursor-not-allowed disabled:hover:bg-slate-500"
                        disabled={
                          totalPages.length === currentPage ? true : false
                        }
                      >
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </li>
                  </ul>
                </div>
                <button
                  className="w-40 text-center rounded bg-primary hover:bg-primary-dark h-10 text-white font-bold fixed bottom-13 right-10"
                  onClick={downloadData}
                >
                  Export Leave Data
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminReq;
