const express = require("express");
const leaveRouter = express.Router();
const mongoose = require("mongoose");
const User = mongoose.model("userdata");
const Manager =  mongoose.model("managerdata");
const UserLeave = mongoose.model("LeaveList");


leaveRouter.post('/acceptupdateleave',async(req,res)=>{

    const{leaveId,status,managerNote} = req.body;

    try{

      await UserLeave.findByIdAndUpdate({_id:leaveId},{$set:{
             status,managerNote
      }}).then(()=>{
        return res.json({data:'Leave Update Successfully',status:200});
      })
    }
    catch(err){
         res.json({data:err,status:400});
    }
});

leaveRouter.post('/rejectupdateleave',async(req,res)=>{

    const{leaveId,employId,status,managerNote,days,role} = req.body;

    try{

      await UserLeave.findByIdAndUpdate({_id:leaveId},{$set:{
             status,managerNote
      }}).then(async()=>{

        if(role==='E')
        {
          const currentDays = await User.findOne({_id:employId});
          const actualDays = currentDays.remainingLeaveDays+days;
  
          await User.findByIdAndUpdate({_id:employId},{$set:{
              remainingLeaveDays:actualDays
          }})
        }
        else if(role==="M")
        {
          const currentDays = await Manager.findOne({_id:employId});
          const actualDays = currentDays.remainingLeaveDays+days;
  
          await Manager.findByIdAndUpdate({_id:employId},{$set:{
              remainingLeaveDays:actualDays
          }})
        }


         return res.json({data:'Leave Update Successfully',status:200});
      })
    }
    catch(err){
         res.json({data:err,status:400});
    }
});

leaveRouter.post('/cancelleave',async(req,res)=>{

    const{leaveId,status} = req.body;

    try{

      const leaveData = await UserLeave.findOne({_id:leaveId});
      const days = leaveData.days;
      const userId = leaveData.employId;
      const role = leaveData.role;

      if(role==='E')
      {
        const user = await User.findOne({_id:userId});

        const cuurentUserDays = user.remainingLeaveDays;

        await User.findByIdAndUpdate({_id:userId},{$set:{
          remainingLeaveDays:cuurentUserDays+days
        }})
      }

      else if(role==="M")
      {
        const user = await Manager.findOne({_id:userId});

        const cuurentUserDays = user.remainingLeaveDays;

        await Manager.findByIdAndUpdate({_id:userId},{$set:{
          remainingLeaveDays:cuurentUserDays+days
        }})
      }
        await UserLeave.findByIdAndUpdate({_id:leaveId},{$set:{
            status
        }})
         return res.json({data:'Leave Cancelled succefully',status:200});
    }
    catch(err){
         res.json({data:err,status:400});
    }
});

module.exports = leaveRouter;