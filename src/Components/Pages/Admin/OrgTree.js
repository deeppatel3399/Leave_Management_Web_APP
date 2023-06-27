import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import OrgChart from './BalkanTree';

const OrgTree = () => {

 const [superManager,setSuperManager] = useState([]);
 const [employees,setEmployees] = useState([]);

 const fetchData = async()=>
 {
    const res = await axios.get("/admin/allData");
    setSuperManager(res.data.supermanagerData);
    setEmployees(res.data.allEmployeesData);
 };

  useEffect(()=>{
    fetchData();
  },[]);

  const test = [ 
    {
      id: 1,
      pid:0, 
      name: 'Leave Management System', 
      title: 'System', 
      img: require('../../../Images/LMS-LOGO.png')
    }];

    superManager.map((item, ind) => {
      const smId = item.managerId;
    test.push({
      id: test.length+1,
      pid: 1, 
      name: item.fname+" "+item.lname,
      title: "Super Manager",
      img: 'https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png'
      }
      );
      let count = 0;
      employees.map((val,index)=>{
        let count2 = 0;
        if(val.role==='M' && smId===val.superManagerId)
        {
            test.push({
              id: test.length+1,
              pid: test.length-count, 
              name: val.fname+" "+val.lname,
              title: "Manager",
              img: 'https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png'
              }
            );
            count = count + 1;

              employees.map((e,i)=>{
                if(val.managerId===e.managerId&&e.role==='E')
                {
                test.push({
                  id: test.length+1,
                  pid: test.length-count2, 
                  name: e.fname+" "+e.lname,
                  title: "Employee",
                  img: 'https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png'
                  }
                );
                count = count + 1;
                count2 = count2 + 1;
                }
             })
            
        }
        else
        {
          if(val.role==='E' && smId===val.managerId)
          {
              test.push({
                id: test.length+1,
                pid: test.length-count, 
                name: val.fname+" "+val.lname,
                title: "Employee",
                img: 'https://www.kindpng.com/picc/m/495-4952535_create-digital-profile-icon-blue-user-profile-icon.png'
                }
              );
              count = count + 1;
          }
        }
      });
    })
    
  const data  = test.map((e,i)=>e).filter(v=>v);

  console.log(data);

  return (
    <div style={{height: '90vh',width:'100%'}}>

    {/* <OrgChart nodes={[
        { id: 1, name: 'Leave Management System', title: 'System', img: 'https://cdn.balkan.app/shared/2.jpg'},
        { id: 2, pid: 1, name: 'Ashley Barnett', title: 'Sales Manager', img: 'https://cdn.balkan.app/shared/3.jpg' },
        { id: 3, pid: 1, name: 'Caden Ellison', title: 'Dev Manager', img: 'https://cdn.balkan.app/shared/4.jpg' },
        { id: 4, pid: 2, name: 'Elliot Patel', title: 'Sales', img: 'https://cdn.balkan.app/shared/5.jpg' },
        { id: 5, pid: 2, name: 'Lynn Hussain', title: 'Sales', img: 'https://cdn.balkan.app/shared/6.jpg' },
        { id: 6, pid: 3, name: 'Tanner May', title: 'Developer', img: 'https://cdn.balkan.app/shared/7.jpg' },
        { id: 7, pid: 3, name: 'Fran Parsons', title: 'Developer', img: 'https://cdn.balkan.app/shared/8.jpg' }
    ]}/> */}

        <OrgChart nodes={data} />

</div>
  );
};

export default OrgTree;