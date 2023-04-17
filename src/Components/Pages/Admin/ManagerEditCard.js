import React from "react";
import axios from "axios";
import { useState } from "react";

const ManagerEditCard = ({onclick,name,email,role,managerId,managerDataId,superManagerId}) => {

  const [newManagerId,setNewManagerId] = useState(managerId);
  // const [newSuperManagerId,setNewSuperManagerid] = useState(superManagerid);

  // const managerUpdate = ()=>
  // {
  //   axios.post("/admin/updateManager",{
  //     managerDataId,
  //     managerId:newManagerId,
  //   }).then((data)=>{
  //     if(data.data.status===200)
  //     {
  //       alert(name+" Data Update Succefully");
  //     }
  //   })
    
  // };

  return (
    <div className="w-full flex  h-full top-0 left-0 justify-center items-center backdrop-blur-sm absolute bg-black bg-opacity-50">
    <div
      className="w-96 bg-light py-5 px-3 rounded-lg top-40 border-solid border-4 border-primary-dark"
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
          Manager Name-{" "}
        </span>
        <span className="text-md text-black font-semibold">{name}</span>
      </div>
      <div className="my-3">
        <span className="text-lg font-bold text-primary-dark">Email-Id- </span>
        <span className="text-md text-black font-semibold">{email}</span>
      </div>

      <div className="my-3 text-lg font-bold text-primary-dark"><span className="text-lg font-bold text-primary-dark">Role- </span>
       {role==="M"?"Manager":null}</div>

      <div className="my-3">
        <span className="text-lg font-bold text-primary-dark">
          Manager-Id-{" "}
        </span>
        <p className="h-8 rounded-lg p-3 bg-white w-24 flex justify-center items-center text-center">{managerId}</p>
      </div>

      <div className="my-3">
        <span className="text-lg font-bold text-primary-dark">
          Super Manager-Id-{" "}
        </span>
        <p className="h-8 rounded-lg p-3 bg-white w-24 flex justify-center items-center text-center">{superManagerId?superManagerId:"-"}</p>
      </div>

      {/* <div className="flex flex-row justify-center mt-3">
        <button onClick={managerUpdate} className="w-20 h-10 rounded bg-primary-dark text-white font-bold hover:bg-primary">
          Update
        </button>
      </div> */}
    </div>
    </div>
  );
};

export default ManagerEditCard;
