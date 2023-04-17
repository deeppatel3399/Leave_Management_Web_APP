const express = require("express");
const adminRouter = express.Router();
const mongoose = require("mongoose");
const Manager = mongoose.model("managerdata");
const User = mongoose.model("userdata");
const UserLeave = mongoose.model("LeaveList");
const moment = require('moment');

adminRouter.get("/leaves", async (req, res) => {

    const status = req.query.status;
    const firstname = req.query.name;
    const name = { $regex: firstname, $options: "i" };
    const page = req.query.pageno;
    const limit = 5;
    const lastIndex = page * limit;
    const firstIndex = lastIndex - limit;
    const filter = req.query.filter;

    try {

        var fromDate;
        var toDate;
        var from;
        var to;

        if(filter==="Last Week")
        {
            fromDate = moment().subtract(1,'week');
            toDate = moment();
        }
        else if(filter==="Last Month")
        {
            fromDate = moment().subtract(1,'Month');
            toDate = moment();
        }
        else if(filter==="From to End")
        {
          from = moment(req.query.from);
          to = moment(req.query.to);
        }

        if (status === "All") 
        {

          if (firstname) 
          {
            if(filter&&!filter=="")
            {
              if(filter==="From to End")
              {
                  const leaveFound = await UserLeave.find({name,$and:[{fromDate:{$gte:from,$lte:to}},{toDate:{$gte:from,$lte:to}}]})
                const newleaves = leaveFound.slice(firstIndex, lastIndex);
                return res.json({ data: newleaves,allLeaves:leaveFound, length: leaveFound.length });
              }
              else
              {
                   const leaveFound = await UserLeave.find({ name,createdAt:{$gte:fromDate,$lte:toDate} })
                  const newleaves = leaveFound.slice(firstIndex, lastIndex);
                  return res.json({ data: newleaves,allLeaves:leaveFound, length: leaveFound.length });
              }
            }
            else
            {
                  const  leaveFound = await UserLeave.find({ name});
                  const newleaves = leaveFound.slice(firstIndex, lastIndex);
                  return res.json({ data: newleaves,allLeaves:leaveFound, length: leaveFound.length });
            }
          }
          else if(filter&&!filter=="")
          {
            if(filter==="From to End")
            {
              const leaves = await UserLeave.find({$and:[{fromDate:{$gte:from,$lte:to}},{toDate:{$gte:from,$lte:to}}]});
              const newleaves = leaves.slice(firstIndex,lastIndex);
              return res.json({data:newleaves,allLeaves:leaves,length:leaves.length});
            }
            else
            {
            const leaves =  await UserLeave.find({createdAt:{$gte:fromDate,$lte:toDate}});
            const newleaves = leaves.slice(firstIndex, lastIndex);
            return res.json({ data: newleaves,allLeaves:leaves, length: leaves.length });
            }
          }
          else if(!firstname&&filter==="") {
            const leaves = await UserLeave.find({});
            const newleaves = leaves.slice(firstIndex, lastIndex);
            return res.json({ data: newleaves,allLeaves:leaves, length: leaves.length });
          }
        } 

        else 
        {
            if (firstname) 
            {
                if(filter&&!filter=="")
                {
                  if(filter==="From to End")
                  {
                     const leaveFound = await UserLeave.find({ name,status:status,$and:[{fromDate:{$gte:from,$lte:to}},{toDate:{$gte:from,$lte:to}}]});
                    const newleaves = leaveFound.slice(firstIndex, lastIndex);
                    return res.json({ data: newleaves,allLeaves:leaveFound, length: leaveFound.length });
                  }
                  else
                  {
                       const  leaveFound = await UserLeave.find({ name,status:status,createdAt:{$gte:fromDate,$lte:toDate} });
                      const newleaves = leaveFound.slice(firstIndex, lastIndex);
                      return res.json({ data: newleaves,allLeaves:leaveFound, length: leaveFound.length });
                   }
                }
                else
                {
                        const leaveFound = await UserLeave.find({ name,status:status});
                      const newleaves = leaveFound.slice(firstIndex, lastIndex);
                      return res.json({ data: newleaves,allLeaves:leaveFound, length: leaveFound.length });

                }
            }
            else if(filter&&!filter=="")
            {
              if(filter==="From to End")
              {
                const leaves = await UserLeave.find({status:status,$and:[{fromDate:{$gte:from,$lte:to}},{toDate:{$gte:from,$lte:to}}]});
                const newleaves = leaves.slice(firstIndex,lastIndex);
                return res.json({data:newleaves,allLeaves:leaves, length:leaves.length});
              }
              else
              {
                const leaves = await UserLeave.find({status:status,createdAt:{$gte:fromDate,$lte:toDate}});
                  const newleaves = leaves.slice(firstIndex, lastIndex);
                  return res.json({ data: newleaves,allLeaves:leaves, length: leaves.length });
              }
            } 
            else if(!firstname&&filter==="") 
            {
            const leaves = await UserLeave.find({ status: status });
            const newleaves = leaves.slice(firstIndex, lastIndex);
            return res.json({ data: newleaves,allLeaves:leaves, length: leaves.length });
            }
        }
      } 
      
      catch (err) {
        res.json({ data: err });
      }
});

adminRouter.get("/admindash", async (req, res) => {

  const limit = 5;
  const employeePage = req.query.employeepageno;
  const managerPage = req.query.managerpageno;
  
  const emplastIndex = employeePage * limit;
  const empfirstIndex = emplastIndex - limit;

  const managerlastIndex = managerPage * limit;
  const managerfirstIndex = managerlastIndex - limit;

  const manager = await Manager.find({});
  const newManagerData = manager.slice(managerfirstIndex,managerlastIndex);

  const employee = await User.find({});
  const newEmployeeData = employee.slice(empfirstIndex,emplastIndex);

  const leaves = await UserLeave.find({});

  res.json({employeedata:newEmployeeData,employeelength:employee.length,managerdata:newManagerData,managerlength:manager.length,leavesdata:leaves});
});

adminRouter.post("/updateEmployee", async (req, res) => {
  const {
    employId,
    fname,
    lname,
    email,
    password,
    role,
    managerId,
    updateManagerId,
    managerName,
    superManagerId
  } = req.body;

  try {
    if (role === "E") {
      await User.findByIdAndUpdate(
        { _id: employId },
        {
          $set: {
            role,
            managerId,
            managerName,
          },
        }
      );
      res.json({ data: "Employee Data Update Successfully", status: 200 });
    } else if (role === "M") {
      await Manager.create({
        fname,
        lname,
        email,
        password,
        role,
        managerId:updateManagerId,
        superManagerId
      }).then(async () => {
        await User.findByIdAndDelete({ _id: employId });
        await UserLeave.deleteMany({ employId: employId });
      });
      res.json({ data: "Employee Promoted", status: 200 });
    } else {
      res.json({ data: "Error Occured", statu: 400 });
    }
  } catch (err) {
    res.json({ data: err, status: 400 });
  }
});

adminRouter.post("/updateManager", async (req, res) => {
  const { managerDataId, managerId } = req.body;

  try {
    await Manager.findByIdAndUpdate(
      { _id: managerDataId },
      {
        $set: {
          managerId,
        },
      }
    );
    res.json({ data: "Manager Data Update Successfully", status: 200 });
  } catch (err) {
    res.json({ data: err, status: 400 });
  }
});

adminRouter.post("/insertEmployeeData", async (req, res) => {
  const { xlData } = req.body;

  try {
    await User.insertMany(xlData);
    return res.json({ data: "Data Inserted", status: 200 });
  } catch (err) {
    res.json({ data: err, status: 400 });
  }
});

module.exports = adminRouter
