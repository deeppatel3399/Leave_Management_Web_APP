import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import LatestLeave from "./LatestLeave";
import EmployeeEditCard from "./EmployeeEditCard";
import ManagerEditCard from "./ManagerEditCard";
import { read, utils } from "xlsx";

const AdminDash = () => {
  const [managerData, setManagerData] = useState([]);
  const [employeeData, setEmployeerData] = useState([]);
  const [leavesData, setLeavesData] = useState([]);

  const [leaveVal, setLeaveVal] = useState(true);
  const [managerVal, setManagerVal] = useState(false);
  const [employeeVal, setEmployeeVal] = useState(false);

  const [employEditCard, setEmployEditCard] = useState(false);
  const [managerEditCard, setManagerEditCard] = useState(false);

  const[managerEditData,setManagerEditData] = useState(null);
  const[employeeEditData,setEmployeeEditData] = useState(null);
  const[insertDisVal,setInsertDisVal] = useState(true);

  const [xlFile,setXlFile] = useState(null);
  const [xlData,setXlData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemPerpage, setItemPerPage] = useState(5);
  const totalPages = [];

  const indexOfLastPage = currentPage * itemPerpage;
  const indexOfFirstPage = indexOfLastPage - itemPerpage;
  const currentEmployeeData = employeeData.slice(indexOfFirstPage, indexOfLastPage);


  for (let i = 1; i <= Math.ceil(employeeData.length / itemPerpage); i++) {
    totalPages.push(i);
  }


  const fetchdata = async () => {
    const res = await axios.get("admin/admindash");

    setManagerData(res.data.manager);
    setEmployeerData(res.data.employee);
    setLeavesData(res.data.leaves);
  };

  const readXlData = (e)=>
  {
    const file = e.target.files[0];
    setXlFile(file);
    if(file)
    {
    setInsertDisVal(false);
    }
    else
    {
      setInsertDisVal(true);
    }

    const reader = new FileReader();

    reader.onload = (e)=>
    {
        const data = e.target.result;
        const sheet = read(data,{type:"array"});
        const sheetName = sheet.SheetNames[0];
        const workSheet = sheet.Sheets[sheetName];
        const res = utils.sheet_to_json(workSheet);
        setXlData(res);
    };
    reader.readAsArrayBuffer(file);
  };

  const uploadData = ()=>
  {
    axios.post("admin/insertEmployeeData",{
      xlData
    }).then((data)=>{
          if(data.data.status===200)
          {
            alert("Employee Data Inserted Successfully");
          }
          else
          {
            alert("Data not inserted");
          }
    })
  };


  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <div>
      <Navbar />

        <div className="grid grid-cols-12">
          <div className="col-span-2 h-screen w-full bg-light px-6 py-8">
            <button
              className="w-full h-10 my-3 text-left text-primary-dark font-bold text-lg hover:bg-primary-dark hover:text-white hover:rounded"
              onClick={() => {
                setManagerVal(false);
                setEmployeeVal(false);
                setLeaveVal(true);
              }}
            >
              <i className="fa-solid fa-list"></i> Latest Leave List
            </button>
            <button
              className="w-full h-10 my-3 text-left text-primary-dark font-bold text-lg hover:bg-primary-dark hover:text-white hover:rounded"
              onClick={() => {
                setManagerVal(true);
                setEmployeeVal(false);
                setLeaveVal(false);
              }}
            >
              <i className="fa-solid fa-list"></i> Manager List
            </button>
            <button
              className="w-full h-10 my-3 text-left text-primary-dark font-bold text-lg hover:bg-primary-dark hover:text-white hover:rounded"
              onClick={() => {
                setManagerVal(false);
                setEmployeeVal(true);
                setLeaveVal(false);
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
                          name={val.employId.fname + " " + val.employId.lname}
                          fromDate={new Date(val.fromDate).toLocaleDateString(
                            "in-en"
                          )}
                          toDate={new Date(val.toDate).toLocaleDateString(
                            "in-en"
                          )}
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
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
                      {currentEmployeeData.map((val, ind) => (
                        <tr
                          className="bg-light border-b dark:bg-light dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 dark:hover:text-white hover:text-white font-medium text-primary-dark whitespace-nowrap dark:text-primary-dark"
                          key={ind}
                        >
                          <th scope="row" className="px-6 py-4">
                          {((currentPage-1)*itemPerpage)+ind+1}
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
                              className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-row justify-center mt-5">
                  <ul className="inline-flex -space-x-px">
                    <li>
                      <button
                        onClick={()=>setCurrentPage(currentPage-1)}
                        className="px-3 py-2 ml-0 leading-tight text-white bg-primaryborder border-gray-300 rounded-lg hover:bg-primary-dark hover:text-gray-700 dark:bg-primary dark:border-gray-700 dark:text-white dark:hover:bg-primary-dark dark:hover:text-white disabled:bg-slate-500 disabled:cursor-not-allowed disabled:hover:bg-slate-500"
                        disabled={currentPage>1?false:true}
                      >
                        Previous
                      </button>
                    </li>
                    {totalPages.map((val,ind)=>(
                    <li key={ind}>
                        <button
                        onClick={()=>{setCurrentPage(val);}}
                        className="px-3 py-2 ml-0 leading-tight text-white bg-primaryborder border-gray-300 rounded-lg hover:bg-primary-dark hover:text-gray-700 dark:bg-primary dark:border-gray-700 dark:text-white dark:hover:bg-primary-dark dark:hover:text-white"
                      >
                        {val}
                      </button>
                  </li>
                    ))}
                    <li>
                    <button
                        onClick={()=>setCurrentPage(currentPage+1)}
                        className="px-3 py-2 ml-0 leading-tight text-white bg-primaryborder border-gray-300 rounded-lg hover:bg-primary-dark hover:text-gray-700 dark:bg-primary dark:border-gray-700 dark:text-white dark:hover:bg-primary-dark dark:hover:text-white disabled:bg-slate-500 disabled:cursor-not-allowed disabled:hover:bg-slate-500"
                        disabled={totalPages.length===currentPage?true:false}
                      >
                        Next
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
                <div className="flex flex-col w-1/2 rounded-xl items-start p-3 fixed bottom-10 left-1/3">    
                <div className="my-3"><p className="text-primary-dark font-bold text-lg">Add Employee</p><input type="file" onChange={readXlData} accept=".xlsx,.xml,.csv"/></div>
                <button onClick={uploadData} className="rounded-lg w-28 h-10 text-white font-bold text-md hover:bg-primary-dark bg-primary disabled:bg-slate-500 disabled:cursor-not-allowed" disabled={insertDisVal}>Insert Data</button>
                </div>
              </div>
            ) : null}
          </div>

        </div>

          {employEditCard ? (
            <EmployeeEditCard onclick={() => setEmployEditCard(false)} fname={employeeEditData.fname} lname={employeeEditData.lname} email={employeeEditData.email} role={employeeEditData.role} managerId={employeeEditData.managerId} managerName={employeeEditData.managerName} employId={employeeEditData._id} password={employeeEditData.password}/>
          ) : null}

          {managerEditCard ? (
            <ManagerEditCard onclick={() => setManagerEditCard(false)} name={managerEditData.fname+" "+managerEditData.lname} email={managerEditData.email} role={managerEditData.role} managerId={managerEditData.managerId} managerDataId={managerEditData._id}/>
          ) : null}

    </div>
  );
};

export default AdminDash;
