import React from "react";
import axios from "axios";
import EmployLeaveReqCard from "../../EmployLeaveReqCard";
import Navbar from "../../Navbar";
import { useEffect, useState, useCallback } from "react";
import { IoIosPeople } from "react-icons/io";
import nodata from "../../../Images/nodata.png";
import { FaChartPie } from "react-icons/fa";
import PieChart from "./PieChart";

const ManagerDash = () => {
  // const [employData, setEmployData] = useState([]);
  // const [managerData, setManagerData] = useState([]);
  const [leaveList, setLeaveList] = useState([]);
  const [employName, setEmployName] = useState();

  const [allList, setAllList] = useState([]);

  const [activeBtn, setActiveBtn] = useState(1);

  const [showStats, setShowStats] = useState(false);

  const [isLeaveDataLoading, setIsLeaveDataloading] = useState(true);
  const [isAllListLodaing, setIsAllListLodaing] = useState(true);

  const fetchData = useCallback(() => {
    axios
      .post("manager/managerdata", {
        token: window.localStorage.getItem("token"),
      })
      .then((data) => {
        if (data.data.status === 200) {
          fetchemployData(data.data.data.managerId);
        }
      });
  }, []);

  const fetchemployData = useCallback((managerId) => {
    axios
      .post("manager/allemploy", {
        managerId,
      })
      .then((data) => {
        if (
          data.data.employeeData.length > 0 ||
          data.data.managerData.length > 0
        ) {
          fetchLeave(data.data.employeeData[0]._id);
          setEmployName(
            data.data.employeeData[0].fname +
              " " +
              data.data.employeeData[0].lname
          );
          setAllList(data.data.employeeData.concat(data.data.managerData));
          console.log(data.data.employeeData.concat(data.data.managerData));
          setIsAllListLodaing(false);
        } else if (
          data.data.employeeData.length === 0 ||
          data.data.managerData.length === 0
        ) {
          setIsAllListLodaing(false);
        }
        // else
        // {
        //   setIsLeaveDataloading(true);
        //   setIsAllListLodaing(true);
        // }
      });
  }, []);

  const fetchLeave = useCallback((employId) => {
    axios
      .post("manager/leavedata", {
        employId,
      })
      .then((data) => {
        if (data.data.status === 200) {
          setLeaveList(data.data.data.reverse());
          setIsLeaveDataloading(false);
        }
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar />

      <div className="grid grid-cols-12 h-[90vh]">
        <div className="col-span-4 flex flex-col items-center">
          <h1 className="text-2xl text-primary-dark font-bold text-center my-5 flex">
            <IoIosPeople size={35} className="mr-3" />
            Employee List
          </h1>
          <hr className="w-10/12" />

          {isAllListLodaing === true ? (
            <div
              role="status"
              className="w-10/12 mt-10 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
            >
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
          ) : allList.length > 0 ? (
            allList.map((val, ind) => (
              <div className="flex justify-center align-middle" key={ind}>
                <div
                  key={ind}
                  className={`w-72 text-center  flex flex-row justify-evenly rounded-lg p-5 my-5 hover:bg-primary cursor-pointer ${
                    activeBtn === ind + 1 ? "bg-primary" : "bg-primary-dark"
                  }`}
                  value={activeBtn}
                  onClick={() => {
                    fetchLeave(val._id);
                    setEmployName(val.fname + " " + val.lname);
                    setActiveBtn(ind + 1);
                    setShowStats(false);
                  }}
                >
                  <div className="font-bold text-xl text-white">{ind + 1}</div>
                  <div className="font-bold text-xl text-white">
                    {val.fname + " " + val.lname}
                  </div>
                </div>

                <div className="bg-red-500 rounded-full w-6 h-6 text-center font-bold text-xs border-2 border-black text-white flex justify-center align-middle items-center -ml-3 mt-3">
                  4
                </div>

                <button
                  className={` text-center  flex flex-row justify-evenly rounded-lg p-5 my-5 ml-1 text-white hover:bg-primary cursor-pointer ${
                    activeBtn === ind + 1 ? "bg-primary" : "bg-primary-dark"
                  }`}
                  onClick={() => {
                    fetchLeave(val._id);
                    setEmployName(val.fname + " " + val.lname);
                    setActiveBtn(ind + 1);
                    setShowStats(!showStats);
                  }}
                >
                  <FaChartPie size={30} />
                </button>
              </div>
            ))
          ) : (
            // :
            // employData.length > 0 ? (
            //   employData.map((val, ind) => (
            //     <div className="flex justify-center align-middle" key={ind}>
            //       <div
            //         key={ind}
            //         className={`w-72 text-center  flex flex-row justify-evenly rounded-lg p-5 my-5 hover:bg-primary cursor-pointer ${
            //           activeBtn === ind + 1 ? "bg-primary" : "bg-primary-dark"
            //         }`}
            //         value={activeBtn}
            //         onClick={() => {
            //           fetchLeave(employData[ind]._id);
            //           setEmployName(
            //             employData[ind].fname + " " + employData[ind].lname
            //           );
            //           setActiveBtn(ind + 1);
            //           setShowStats(false);
            //         }}
            //       >
            //         <div className="font-bold text-xl text-white">{ind + 1}</div>
            //         <div className="font-bold text-xl text-white">
            //           {val.fname + " " + val.lname}
            //         </div>
            //       </div>

            //       <div className="bg-red-500 rounded-full w-6 h-6 text-center font-bold text-xs border-2 border-black text-white flex justify-center align-middle items-center -ml-3 mt-3">4</div>

            //       <button
            //       className={` text-center  flex flex-row justify-evenly rounded-lg p-5 my-5 ml-1 text-white hover:bg-primary cursor-pointer ${
            //           activeBtn === ind + 1 ? "bg-primary" : "bg-primary-dark"
            //         }`}
            //         onClick={() => {
            //           fetchLeave(employData[ind]._id);
            //           setEmployName(
            //             employData[ind].fname + " " + employData[ind].lname
            //           );
            //           setActiveBtn(ind + 1);
            //           setShowStats(!showStats);
            //         }}
            //         >
            //         <FaChartPie size={30}/>
            //       </button>
            //     </div>
            //   ))
            // )
            // : managerData.length > 0 ? (
            //   managerData.map((val, ind) => (
            //     <div className="flex justify-center align-middle" key={ind}>
            //       <div
            //         key={ind}
            //         className={`w-72 text-center  flex flex-row justify-evenly rounded-lg p-5 my-5 hover:bg-primary cursor-pointer ${
            //           activeBtn === ind + 1 ? "bg-primary" : "bg-primary-dark"
            //         }`}
            //         value={activeBtn}
            //         onClick={() => {
            //           fetchLeave(managerData[ind]._id);
            //           setEmployName(
            //             managerData[ind].fname + " " + managerData[ind].lname
            //           );
            //           setActiveBtn(ind + 1);
            //           setShowStats(false);
            //         }}
            //       >
            //         <div className="font-bold text-xl text-white">{ind + 1}</div>
            //         <div className="font-bold text-xl text-white">
            //           {val.fname + " " + val.lname}
            //         </div>

            //       </div>
            //       <button
            //       className={` text-center  flex flex-row justify-evenly rounded-lg p-5 my-5 ml-1 text-white hover:bg-primary cursor-pointer ${
            //           activeBtn === ind + 1 ? "bg-primary" : "bg-primary-dark"
            //         }`}
            //         onClick={() => {
            //           fetchLeave(managerData[ind]._id);
            //           setEmployName(
            //             managerData[ind].fname + " " + managerData[ind].lname
            //           );
            //           setActiveBtn(ind + 1);
            //           setShowStats(!showStats);
            //         }}>
            //         <FaChartPie size={30}/>
            //       </button>
            //     </div>
            //   ))
            // )
            <div className="text-center my-5">
              <h1 className="text-lg font-bold text-error">
                No Employee / Manager Found...
              </h1>
            </div>
          )}
        </div>

        <div className="col-span-8 flex flex-row flex-wrap mt-3 overflow-auto">
          {isLeaveDataLoading === true ? (
            <>
              <div
                role="status"
                className="space-y-2.5 animate-pulse w-full mt-20 mx-20 flex flex-col  items-start"
              >
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
              <div
                role="status"
                className="space-y-2.5 animate-pulse w-full mt-20 mx-20 flex flex-col  items-start"
              >
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
              <div
                role="status"
                className="space-y-2.5 animate-pulse w-full mt-20 mx-20 flex flex-col  items-start"
              >
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
              <div
                role="status"
                className="space-y-2.5 animate-pulse w-full mt-20 mx-20 flex flex-col  items-start"
              >
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
          ) : leaveList.length === 0 ? (
            <div className="w-full h-3/4 mt-20 flex justify-center">
              <img src={nodata} alt="nodatafound" />
            </div>
          ) : (
            leaveList.map((val, ind) => (
              <div className="col-span-3 basis-1/2 pb-3" key={ind}>
                <EmployLeaveReqCard
                  fetchLeave={fetchLeave}
                  name={employName}
                  from={new Date(val.fromDate).toLocaleDateString("in-en")}
                  to={new Date(val.toDate).toLocaleDateString("in-en")}
                  days={val.days}
                  note={val.note}
                  leavListData={leaveList[ind]}
                  managerNote={val.managerNote}
                  status={val.status}
                />
              </div>
            ))
          )}

          {showStats === true ? (
            <div className="fixed justify-center items-center pt-20 bg-slate-500 bg-opacity-70 backdrop-blur-sm w-full h-full">
              <PieChart data={leaveList} />
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ManagerDash;
