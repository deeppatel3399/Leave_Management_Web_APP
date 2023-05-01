import React, { useState, useEffect } from "react";
import { OrganizationChart } from "primereact/organizationchart";
import axios from "axios";

const ColoredDemo = () => {
  const [superManager, setSuperManager] = useState([]);
  const [employees, setEmployees] = useState([]);

  const fetchData = async () => {
    const res = await axios.get("/admin/allData");
    setSuperManager(res.data.supermanagerData);
    setEmployees(res.data.allEmployeesData);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const test = [
    {
      expanded: true,
      type: "person",
      className: "bg-indigo-500 text-white",
      style: { borderRadius: "12px" },
      data: {
        image:
          "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
        name: "Leave Management System",
        title: "LMS",
      },
      children: superManager.map((item, index) => {
        const smId = item.managerId;

        return {
          expanded: true,
          type: "person",
          className: "bg-indigo-500 text-white",
          style: { borderRadius: "12px" },
          data: {
            image:
              "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
            name: item.fname + " " + item.lname,
            title: item.role,
          },
          children: 
            employees.map((val, ind) => {
              if (val.role === "E") {
                const empId = val.managerId;
                if (empId === smId) {
                  console.log(val, "emp");
                  return {
                    expanded: false,
                    type: "person",
                    className: "bg-indigo-500 text-white",
                    style: { borderRadius: "12px" },
                    data: {
                      image:
                        "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
                      name: val.fname + " " + val.lname,
                      title: val.role,
                    },
                  };
                }
              } 
              else {
                const empId = val.superManagerId;
                if (empId === smId) {
                  console.log(val, "manager");
                  return {
                    expanded: true,
                    type: "person",
                    className: "bg-indigo-500 text-white",
                    style: { borderRadius: "12px" },
                    data: {
                      image:
                        "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
                      name: val.fname + " " + val.lname,
                      title: val.role,
                    },
                    children:employees.map((e,i)=>{
                        const idEmp = val.managerId;
                        if(idEmp===e.managerId&&e.role==="E")
                        {
                        return{
                          expanded: false,
                          type: "person",
                          className: "bg-indigo-500 text-white",
                          style: { borderRadius: "12px" },
                          data: {
                            image:
                              "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png",
                            name: e.fname + " " + e.lname,
                            title: e.role,
                          }
                        }
                      }
                    }).filter(v=>v),
                  };
                }
              }
            }).filter(v=>v),
        };
      }).filter(v=>v),
    },
  ];

  console.log(test);

  //   const data = [
  //     // {
  //     //     expanded: true,
  //     //     type: 'person',
  //     //     className: 'bg-indigo-500 text-white',
  //     //     style: { borderRadius: '12px' },
  //     //     data: {
  //     //         image: 'https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png',
  //     //         name: 'Leave Management System',
  //     //         title: 'LMS'
  //     //     },
  //     //     children:
  //     //     [
  //     //         superManager.map((item) => {
  //     //             return {
  //     //                 expanded: true,
  //     //                 type: 'person',
  //     //                 className: 'bg-purple-500 text-white',
  //     //                 style: { borderRadius: '12px' },
  //     //                 data: {
  //     //                     image: 'https://primefaces.org/cdn/primereact/images/avatar/annafali.png',
  //     //                     name: item.fname,
  //     //                     title: item.role
  //     //                 }
  //     //             }
  //     //           })
  //     //     ]
  //     // }
  //   ];

  const nodeTemplate = (node) => {
    if (node.type === "person") {
      return (
        <div className="flex flex-col">
          <div className="flex flex-col align-middle items-center align-items-center">
            <img
              alt={node.data.name}
              src={node.data.image}
              className="mb-3 w-3rem h-3rem"
            />
            <span className="font-bold mb-2">{node.data.name}</span>
            <span>{node.data.title}</span>
          </div>
        </div>
      );
    }

    return node.label;
  };

  return (
    <div className="card overflow-x-auto ml-[50vw] mt-20">
      <OrganizationChart value={test} nodeTemplate={nodeTemplate} />
    </div>
  );
};

export default ColoredDemo;
