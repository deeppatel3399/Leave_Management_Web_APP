import axios from "axios";
import React from "react";
import { useState } from "react";

const EmployeeEditCard = ({onclick,fname,lname,password,email,role,managerId,managerName,employId}) => {

  const [newRole,setNewRole] = useState(role);
  const [newManagerId,setNewManagerId] = useState(managerId);
  const [newManagerName,setNewManagerName] = useState(managerName);
  // const [employeeNewManagerId,setEmployeeNewManagerId] = useState("");

  const employeeUpdate = ()=>
  {
    axios.post("/admin/updateEmployee",{
      employId,
      fname,
      lname,
      email,
      password,
      role:newRole,
      managerId:newManagerId,
      managerName:newManagerName,
      // employeeNewManagerId
    }).then((data)=>{
      if(data.data.status===200)
      {
        alert(fname+" "+lname+" Data Update Succefully");
      }
    })
    
  };

  return (
    <div className="w-full flex  h-full top-0 left-0 justify-center items-center backdrop-blur-sm absolute bg-black bg-opacity-50">
    <div
      className="w-96 bg-light py-5 px-3 rounded top-40 border-solid border-4 border-primary-dark"
      id="EmployEditCard"
    >
      <button
        className="flex flex-row justify-end"
        onClick={onclick}
        
      >
        <i className="fa-solid fa-xmark text-lg hover:text-red-500"></i>
      </button>
      <div className="mb-3">
        <span className="text-lg font-bold text-primary-dark">
          Employee Name-{" "}
        </span>
        <span className="text-md text-black font-semibold">{fname+" "+lname}</span>
      </div>
      <div className="my-3">
        <span className="text-lg font-bold text-primary-dark">Email-Id- </span>
        <span className="text-md text-black font-semibold">{email}</span>
      </div>

      <div className="my-3">
        <p className="text-lg font-bold text-primary-dark">Role-</p>
        <select className="w-28 rounded p-2" value={newRole} onChange={(e)=>{setNewRole(e.target.value)}}>
          <option value="E">Employee</option>
          <option value="M">Manager</option>
        </select>
      </div>

     {newRole==="E"?
     <div>
      <div className="my-3">
        <span className="text-lg font-bold text-primary-dark">
          Manager-Id-{" "}
        </span>
        <input type="text" value={newManagerId} onChange={(e)=>{setNewManagerId(e.target.value)}} className="h-10 p-3 rounded-lg"/>
      </div>

      <div className="my-3">
        <span className="text-lg font-bold text-primary-dark">
          Manager Name-{" "}
        </span>
        <input type="text" value={newManagerName} onChange={(e)=>{setNewManagerName(e.target.value)}} className="h-10 p-3 rounded-lg"/>
      </div>
      </div>
      :
      <div>
      <div className="my-3">
        <span className="text-lg font-bold text-primary-dark">
          New Manager-Id-{" "}
        </span>
        <input type="text" value={newManagerId} onChange={(e)=>{setNewManagerId(e.target.value)}} className="h-10 p-3 rounded-lg"/>
      </div>
      </div>
       }

      <div className="flex flex-row justify-center mt-3">
        <button onClick={employeeUpdate} className="w-20 h-10 rounded bg-primary-dark text-white font-bold hover:bg-primary">
          Update
        </button>
      </div>
    </div>
    </div>
  );
};

export default EmployeeEditCard;
