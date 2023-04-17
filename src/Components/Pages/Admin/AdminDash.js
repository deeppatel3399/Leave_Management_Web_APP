import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import LatestLeave from "./LatestLeave";
import EmployeeEditCard from "./EmployeeEditCard";
import ManagerEditCard from "./ManagerEditCard";
import { read, utils } from "xlsx";
import templatefile from '../../../assets/test2.xlsx';


const AdminDash = () => {
  const [managerData, setManagerData] = useState([]);
  const [employeeData, setEmployeerData] = useState([]);
  const [employeeDataLen, setEmployeeDataLen] = useState("");
  const [managerDataLen, setmanagerDataLen] = useState("");
  const [leavesData, setLeavesData] = useState([]);

  const [leaveVal, setLeaveVal] = useState(true);
  const [managerVal, setManagerVal] = useState(false);
  const [employeeVal, setEmployeeVal] = useState(false);

  const [employEditCard, setEmployEditCard] = useState(false);
  const [managerEditCard, setManagerEditCard] = useState(false);

  const [managerEditData, setManagerEditData] = useState(null);
  const [employeeEditData, setEmployeeEditData] = useState(null);
  const [insertDisVal, setInsertDisVal] = useState(true);

  const [xlFile, setXlFile] = useState(null);
  const [xlData, setXlData] = useState([]);

  const [activeBtn, setActiveBtn] = useState(1);

  const fetchdata = async () => {
    const res = await axios.get(
      `admin/admindash?employeepageno=${employeeCurrentPage}&managerpageno=${managerCurrentPage}`
    );
    setManagerData(res.data.managerdata);
    setmanagerDataLen(res.data.managerlength);
    setEmployeerData(res.data.employeedata);
    setEmployeeDataLen(res.data.employeelength);
    setLeavesData(res.data.leavesdata);
  };

  const [employeeCurrentPage, setEmployeeCurrentPage] = useState(1);
  const [managerCurrentPage, setManagerCurrentPage] = useState(1);
  const employeeTotalPages = [];
  const managerTotalPages = [];

  for (let i = 1; i <= Math.ceil(employeeDataLen / 5); i++) {
    employeeTotalPages.push(i);
  }
  for (let i = 1; i <= Math.ceil(managerDataLen / 5); i++) {
    managerTotalPages.push(i);
  }

  const readXlData = (e) => {
    const file = e.target.files[0];
    const fileName = file.name;
    const extension = fileName.split(".").pop();
    setXlFile(file);
    if (file) {
      setInsertDisVal(false);
    } else {
      setInsertDisVal(true);
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      let sheet;
      try {
        sheet = read(data, { type: "array" });
        if(extension==="xlsx"||extension==="csv"||extension==="tsv"||extension==="ods"||extension==="xml")
        {
          setInsertDisVal(false);
        }
        else
        {
          setInsertDisVal(true);
          alert("Incorrect File Extension");  
        }
      } catch (e) {
        setInsertDisVal(true);
      }
      const sheetName = sheet.SheetNames[0];
      const workSheet = sheet.Sheets[sheetName];
      const res = utils.sheet_to_json(workSheet);
      setXlData(res);
    };
    reader.readAsArrayBuffer(file);
  };

  const uploadData = () => {
    axios
      .post("admin/insertEmployeeData", {
        xlData,
      })
      .then((data) => {
        if (data.data.status === 200) {
          alert("Employee Data Inserted Successfully");
        } else {
          alert("Error Occured during inserting data");
        }
      });
  };

  useEffect(() => {
    fetchdata();
  }, [employeeCurrentPage, managerCurrentPage]);

  return (
    <div>
      <Navbar />

      <div className="grid grid-cols-12">
        <div className="col-span-2 h-screen w-full bg-light px-6 py-8">
          <button
            value={activeBtn}
            onClick={() => {
              setManagerVal(false);
              setEmployeeVal(false);
              setLeaveVal(true);
              setActiveBtn(1);
            }}
            className={`w-full h-10 my-3 text-center text-primary-dark font-bold text-md hover:bg-primary-dark hover:text-white hover:rounded ${
              activeBtn === 1
                ? "text-white bg-primary-dark rounded"
                : "text-primary-dark"
            }`}
          >
            <i className="fa-solid fa-list"></i> Latest Leave List
          </button>
          <button
            className={`w-full h-10 my-3 text-center text-primary-dark font-bold text-md hover:bg-primary-dark hover:text-white hover:rounded ${
              activeBtn === 2
                ? "text-white bg-primary-dark rounded"
                : "text-primary-dark"
            }`}
            value={activeBtn}
            onClick={() => {
              setManagerVal(true);
              setEmployeeVal(false);
              setLeaveVal(false);
              setActiveBtn(2);
            }}
          >
            <i className="fa-solid fa-list"></i> Manager List
          </button>
          <button
            className={`w-full h-10 my-3 text-center text-primary-dark font-bold text-md hover:bg-primary-dark hover:text-white hover:rounded ${
              activeBtn === 3
                ? "text-white bg-primary-dark rounded"
                : "text-primary-dark"
            }`}
            value={activeBtn}
            onClick={() => {
              setManagerVal(false);
              setEmployeeVal(true);
              setLeaveVal(false);
              setActiveBtn(3);
            }}
          >
            <i className="fa-solid fa-list"></i> Employee List
          </button>
        </div>

        <div className="col-span-10  w-full p-10 flex flex-col items-center">
          {leaveVal === true ? (
            <div className="flex flex-row flex-wrap mt-1 overflow-auto items-center">
              {leavesData
                .slice(-4)
                .reverse()
                .map((val, ind) => (
                  <div className="col-span-3 basis-1/2 pb-5" key={ind}>
                    <LatestLeave
                      name={val.name||""}
                      fromDate={new Date(val.fromDate).toLocaleDateString(
                        "in-en"
                      )}
                      toDate={new Date(val.toDate).toLocaleDateString("in-en")}
                      days={val.days}
                      note={val.note}
                      managerNote={val.managerNote}
                      status={val.status}
                    />
                  </div>
                ))}
            </div>
          ) : managerVal === true ? (
            <div className="w-full flex flex-col justify-center items-center">
              <h1 className="text-2xl text-primary-dark font-bold text-center pb-10">
                Manager List
              </h1>
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-3/4">
                <table className="w-full text-sm text-left text-white dark:text-white bg-light dark:bg-light">
                  <thead className="text-xs text-white uppercase bg-primary-dark dark:bg-primary-dark dark:text-white">
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
                    {managerData.map((val, ind) => (
                      <tr
                        className="bg-light border-b dark:bg-light dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white hover:text-white font-medium text-primary-dark whitespace-nowrap dark:text-primary-dark"
                        key={ind}
                      >
                        <th scope="row" className="px-6 py-4">
                          {ind + 1}
                        </th>
                        <td className="px-6 py-4">
                          {val.fname + " " + val.lname}
                        </td>
                        <td className="px-6 py-4">{val.managerId}</td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => {
                              setManagerEditCard(true);
                              setManagerEditData(val);
                            }}
                            className="w-14 hover:bg-primary-dark h-8 rounded-md bg-primary text-white font-bold text-center"
                            >
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex flex-row justify-center mt-5 fixed bottom-36">
                <ul className="inline-flex -space-x-px">
                  <li>
                    <button
                      onClick={() =>
                        setManagerCurrentPage(managerCurrentPage - 1)
                      }
                      className="px-3 py-2 ml-0 leading-tight text-white bg-primaryborder border-gray-300 rounded-lg hover:bg-primary-dark hover:text-gray-700 dark:bg-primary dark:border-gray-700 dark:text-white dark:hover:bg-primary-dark dark:hover:text-white disabled:bg-slate-500 disabled:cursor-not-allowed disabled:hover:bg-slate-500"
                      disabled={managerCurrentPage > 1 ? false : true}
                    >
                      <i className="fa-solid fa-arrow-left"></i>
                    </button>
                  </li>
                  {managerTotalPages.map((val, ind) => (
                    <li key={ind}>
                      <button
                        onClick={() => {
                          setManagerCurrentPage(val);
                        }}
                        className={`px-3 py-2 ml-0 leading-tight font-semibold text-white bg-primaryborder border-gray-300 rounded-lg hover:bg-primary-dark hover:text-white ${
                          val === managerCurrentPage
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
                      onClick={() =>
                        setManagerCurrentPage(managerCurrentPage + 1)
                      }
                      className="px-3 py-2 ml-0 leading-tight text-white bg-primaryborder border-gray-300 rounded-lg hover:bg-primary-dark hover:text-gray-700 dark:bg-primary dark:border-gray-700 dark:text-white dark:hover:bg-primary-dark dark:hover:text-white disabled:bg-slate-500 disabled:cursor-not-allowed disabled:hover:bg-slate-500"
                      disabled={
                        managerTotalPages.length === managerCurrentPage
                          ? true
                          : false
                      }
                    >
                      <i className="fa-solid fa-arrow-right"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          ) : employeeVal === true ? (
            <div className="w-full flex flex-col">
              <div className="w-full flex flex-col justify-center items-center">
                <h1 className="text-2xl text-primary-dark font-bold text-center pb-10">
                  Employee List
                </h1>
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-3/4">
                  <table className="w-full text-sm text-left text-white dark:text-white bg-light dark:bg-light">
                    <thead className="text-xs text-white uppercase bg-primary-dark dark:bg-primary-dark dark:text-white">
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
                      {employeeData.map((val, ind) => (
                        <tr
                          className="bg-light border-b dark:bg-light dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white hover:text-white font-medium text-primary-dark whitespace-nowrap dark:text-primary-dark"
                          key={ind}
                        >
                          <th scope="row" className="px-6 py-4">
                            {(employeeCurrentPage - 1) * 5 + ind + 1}
                          </th>
                          <td className="px-6 py-4">
                            {val.fname + " " + val.lname}
                          </td>
                          <td className="px-6 py-4">{val.email}</td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => {
                                setEmployEditCard(true);
                                setEmployeeEditData(val);
                              }}
                              className="w-14 hover:bg-primary-dark h-8 rounded-md bg-primary text-white font-bold text-center">                       
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-row justify-center mt-8 fixed top-2/3">
                  <ul className="inline-flex -space-x-px">
                    <li>
                      <button
                        onClick={() =>
                          setEmployeeCurrentPage(employeeCurrentPage - 1)
                        }
                        className="px-3 py-2 ml-0 leading-tight text-white bg-primaryborder border-gray-300 rounded-lg hover:bg-primary-dark hover:text-gray-700 dark:bg-primary dark:border-gray-700 dark:text-white dark:hover:bg-primary-dark dark:hover:text-white disabled:bg-slate-500 disabled:cursor-not-allowed disabled:hover:bg-slate-500"
                        disabled={employeeCurrentPage > 1 ? false : true}
                      >
                        <i className="fa-solid fa-arrow-left"></i>
                      </button>
                    </li>
                    {employeeTotalPages.map((val, ind) => (
                      <li key={ind}>
                        <button
                          onClick={() => {
                            setEmployeeCurrentPage(val);
                          }}
                          className={`px-3 py-2 ml-0 leading-tight font-semibold text-white bg-primaryborder border-gray-300 rounded-lg hover:bg-primary-dark hover:text-white ${
                            val === employeeCurrentPage
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
                        onClick={() =>
                          setEmployeeCurrentPage(employeeCurrentPage + 1)
                        }
                        className="px-3 py-2 ml-0 leading-tight text-white bg-primaryborder border-gray-300 rounded-lg hover:bg-primary-dark hover:text-gray-700 dark:bg-primary dark:border-gray-700 dark:text-white dark:hover:bg-primary-dark dark:hover:text-white disabled:bg-slate-500 disabled:cursor-not-allowed disabled:hover:bg-slate-500"
                        disabled={
                          employeeTotalPages.length === employeeCurrentPage
                            ? true
                            : false
                        }
                      >
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex flex-col w-1/2 rounded-xl items-start p-3 fixed bottom-5 left-1/3 mt-3">
                <div className="mt-3">
                  <p className="text-primary-dark font-bold text-lg">
                    Add Employee
                  </p>
                  <input
                    type="file"
                    onChange={readXlData}
                    accept=".xlsx,.xml,.csv,.ods,.tsv"
                  />
                </div>
                <p className="text-base text-slate-600 my-1">
                  <span className="text-md font-bold text-error">Note</span>:-
                  File should be with extension{" "}
                  <span className="font-bold text-black">
                    .xlsx , .xml , .csv , .tsv and .ods .
                  </span>
                </p>

                <div className="flex flex-row">
                <button
                  onClick={uploadData}
                  className="rounded-lg w-28 h-10 text-white font-bold text-md hover:bg-primary-dark bg-primary disabled:bg-slate-500 disabled:cursor-not-allowed"
                  disabled={insertDisVal}
                >
                  Insert Data
                </button>
                <a href={templatefile} download={true} target="_blank" rel="noreferrer">
                <button
                  // onClick={uploadData}
                  className="rounded-lg w-48 px-3 h-10 ml-5 text-white font-bold text-md hover:bg-primary-dark bg-primary disabled:bg-slate-500 disabled:cursor-not-allowed"
                >
                  Download Template
                </button>
                </a>
                </div>

              </div>

            </div>
          ) : null}
        </div>
      </div>

      {employEditCard ? (
        <EmployeeEditCard
          onclick={() => setEmployEditCard(false)}
          fname={employeeEditData.fname}
          lname={employeeEditData.lname}
          email={employeeEditData.email}
          role={employeeEditData.role}
          managerId={employeeEditData.managerId}
          managerName={employeeEditData.managerName}
          employId={employeeEditData._id}
          password={employeeEditData.password}
          data={managerData}
        />
      ) : null}

      {managerEditCard ? (
        <ManagerEditCard
          onclick={() => setManagerEditCard(false)}
          name={managerEditData.fname + " " + managerEditData.lname}
          email={managerEditData.email}
          role={managerEditData.role}
          managerId={managerEditData.managerId}
          managerDataId={managerEditData._id}
          superManagerId={managerEditData.superManagerId}
        />
      ) : null}
    </div>
  );
};

export default AdminDash;
