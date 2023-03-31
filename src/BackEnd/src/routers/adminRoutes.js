const express = require("express");
const adminRouter = express.Router();
const mongoose = require("mongoose");
const Manager = mongoose.model("managerdata");
const User = mongoose.model("userdata");
const UserLeave = mongoose.model("LeaveList");

adminRouter.get("/leaves", async (req, res) => {
  const status = req.query.status;
  const firstname = req.query.name;
  const name = { $regex: firstname, $options: "i" };
  const page = req.query.pageno;
  const limit = 5;
  const lastIndex = page * limit;
  const firstIndex = lastIndex - limit;

  try {
    if (status === "All") {
      if (firstname) {
        const userData = await User.find({
          $or: [{ fname: name }, { lname: name }],
        });
        const userLeaves = [];
        let leaveFound=[]
        for (var i = 0; i < userData.length; i++) {
          const id = userData[i]._id;
           leaveFound = await UserLeave.find({ employId: id }).populate(
            "employId",
            "fname lname"
          );
          if (leaveFound?.length) userLeaves.push(...leaveFound);
        }
        const newleaves = userLeaves.slice(firstIndex, lastIndex);
        return res.json({ data: newleaves, length: userLeaves.length });
      } else {
        const leaves = await UserLeave.find({}).populate(
          "employId",
          "fname lname"
        );
        const newleaves = leaves.slice(firstIndex, lastIndex);
        return res.json({ data: newleaves, length: leaves.length });
      }
    } else {
        if (firstname) {
            const userData = await User.find({
              $or: [{ fname: name }, { lname: name }],
            });
            const userLeaves = [];
            let leaveFound=[]
            for (var i = 0; i < userData.length; i++) {
              const id = userData[i]._id;
               leaveFound = await UserLeave.find({ employId: id,status:status }).populate(
                "employId",
                "fname lname"
              );
              if (leaveFound?.length) userLeaves.push(...leaveFound);
            }
            const newleaves = userLeaves.slice(firstIndex, lastIndex);
            return res.json({ data: newleaves, length: userLeaves.length });
          } else {
        const leaves = await UserLeave.find({ status: status }).populate(
          "employId",
          "fname lname"
        );
        const newleaves = leaves.slice(firstIndex, lastIndex);
        return res.json({ data: newleaves, length: leaves.length });
      }
    }
  } catch (err) {
    res.json({ data: err });
  }
});

adminRouter.get("/admindash", async (_, res) => {
  const manager = await Manager.find({});
  const employee = await User.find({});
  const leaves = await UserLeave.find({}).populate("employId", "fname lname");

  res.json({ manager, employee, leaves });
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
    managerName,
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
        managerId,
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

module.exports = adminRouter;
