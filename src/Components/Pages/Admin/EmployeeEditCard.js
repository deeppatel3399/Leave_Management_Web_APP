import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const EmployeeEditCard = ({onclick,fname,lname,password,email,role,managerId,managerName,employId,data}) => {

  const [newRole,setNewRole] = useState(role);
  const [newManagerId,setNewManagerId] = useState("");
  const [newManagerName,setNewManagerName] = useState(managerName);

  const [selectManagerId,setSelectManagerId] = useState(managerId);
  const [selectManagerName,setSelectManagerName] = useState(managerName);
  const [superManagerId,setSuperManagerId] = useState("");

  const [managerIdErr,setManagerIdErr] = useState("");
  const manageridcheck = /^(?=.*[a-zA-Z])(?=.*[0-9])[a-zA-Z0-9]{1,10}$/;
  const [newManagerIdErr,setNewManagerIdErr] = useState("");
  const [newSuperManagerIdErr,setNewSuperManagerIdErr] = useState("");

  const [updateDisVal,setUpdateDisval] = useState(true);

  const newManagerIdBlur = ()=>
  {
    if(newManagerId==="")
    {
      setNewManagerIdErr("New Manager Id Required");
      setUpdateDisval(true);
    }
    else if(newManagerId.match(manageridcheck))
    {
       setNewManagerIdErr("");
       setUpdateDisval(false);
    }
    else if(newManagerId.length>10)
    {
      setNewManagerIdErr("Max 10 characater Allow");
      setUpdateDisval(true);
    }
    else
    {
      setNewManagerIdErr("Id must have one character,one number and not include any special character");
    }
  };
  const newSuperManagerIdBlur = ()=>
  {
    if(newManagerId===superManagerId)
    {
      setNewSuperManagerIdErr("New managerId and super manager Id Can't  be same");
      setUpdateDisval(true);
    }
    if(superManagerId.match(manageridcheck))
    {
       setNewSuperManagerIdErr("");
       setUpdateDisval(false);
    }
    else if(superManagerId.length>10)
    {
      setNewSuperManagerIdErr("Max 10 characater Allow");
      setUpdateDisval(true);
    }
    else
    {
      setNewSuperManagerIdErr("Id must have one character,one number and not include any special character");
    }
  }

  const employeeUpdate = ()=>
  {
    axios.post("/admin/updateEmployee",{
      employId,
      fname,
      lname,
      email,
      password,
      role:newRole,
      managerId:selectManagerId,
      updateManagerId:newManagerId,
      managerName:selectManagerName,
      superManagerId
    }).then((data)=>{
      if(data.data.status===200)
      {
        alert(fname+" "+lname+" Data Update Succefully");
      }
    })
  };

  useEffect(()=>{

    if(newManagerId==="")
    {
        setUpdateDisval(true);
    }
    else
    {
        if(!newManagerId.match(manageridcheck))
        {
            setNewManagerIdErr("Id must have one character,one number,max 10 character allow and not include any special character");
            setUpdateDisval(true);
        }
        else
        {
            setNewManagerIdErr("");
            setUpdateDisval(false);
        }
    }
    if(superManagerId!=="")
    {
        if(!superManagerId.match(manageridcheck))
        {
            setNewSuperManagerIdErr("Id must have one character,one number,max 10 character allow and not include any special character");
            setUpdateDisval(true);
        }
        else if(newManagerId===superManagerId)
        {
          setNewSuperManagerIdErr("New managerId and super manager Id Can't  be same");
          setUpdateDisval(true);
        }
        else
        {
            setNewSuperManagerIdErr("");
            setUpdateDisval(false);
        }
    }

  },[newManagerId,newManagerIdErr,superManagerId,newSuperManagerIdErr]);

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

        <select 
              value={selectManagerId}
              onChange={(e) => {
                if(e.target.value===managerId)
                {
                 setManagerIdErr("New Manager Id can't be same");
                 setUpdateDisval(true);
                }
                else
                {
                 setSelectManagerId(e.target.value);
                 setManagerIdErr("");
                 setUpdateDisval(false);
                }
              }}
        >
        <option value={selectManagerId}>{selectManagerId}</option>
          {
            data.map((val,ind)=>
            <option key={ind} value={val.managerId}>{val.managerId}</option>
            )
          }
        </select>

        <p className="text-error text-base italic">{managerIdErr}</p>

      </div>



      <div className="my-3">
        <span className="text-lg font-bold text-primary-dark">
          Manager Name-{" "}
        </span>

        <select value={selectManagerName} onChange={(e)=>{setSelectManagerName(e.target.value)}}>
          {
            data.filter((val)=>val.managerId===selectManagerId?val:null).map((val,ind)=>
            <option key={ind} value={val.fname+" "+val.lname}>{val.fname+" "+val.lname}</option>   
             )
          }
        </select>
       
      </div>
      </div>
      :
      <div>
      <div className="my-3">
        <span className="text-lg font-bold text-primary-dark">
          New Manager-Id:{" "}
        </span>
        <input type="text" value={newManagerId} onChange={(e)=>{setNewManagerId(e.target.value)}} onBlur={newManagerIdBlur} className="h-10 p-3 rounded-lg"/>
      </div>
      <p className="text-error text-base italic">{newManagerIdErr}</p>
      <div className="my-3">
        <span className="text-lg font-bold text-primary-dark">
          New Super Manager-Id:{" "}
        </span>
        <input type="text" value={superManagerId} onChange={(e)=>{setSuperManagerId(e.target.value)}} className="h-10 p-3 rounded-lg" onBlur={newSuperManagerIdBlur}/>
      </div>
      <p className="text-error text-base italic">{newSuperManagerIdErr}</p>
      </div>
       }

      <div className="flex flex-row justify-center mt-3">
        <button onClick={employeeUpdate} className="w-20 h-10 rounded bg-primary-dark text-white font-bold hover:bg-primary disabled:hover:bg-gray-600 disabled:cursor-not-allowed disabled:bg-gray-600" disabled={updateDisVal}>
          Update
        </button>
      </div>
    </div>
    </div>
  );
};

export default EmployeeEditCard;
