const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema(
  {
    employId:
    {
      type:String,
      require:true,
      ref:"userdata"
    },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    typeOfLeave: { type: String, require: true },
    days: { type: Number },
    note: { type: String, trim: true },
    status: {
      type: String,
      enum: ["Accepted", "Rejected", "Pending","Cancelled"],
      default: "Pending",
    },
    role:{type:String,require:true,enum:["E","M"]},
    name:{type:String,require:true,trim:true},
    managerNote: { type: String, default: "" },
  },
  {
    timestamps: true,
    collection: "LeaveList",
  }
);

mongoose.model("LeaveList", LeaveSchema);


// const mongoose = require("mongoose");


// const LeaveSchema = new mongoose.Schema(
//   {
//     employId: [
//     {
//       type: String,
//       ref: require('./userReg'),
//     }, 
//     {
//       type: String,
//       ref: require('./managerReg'),
//     }],
//     fromDate: { type: Date, required: true },
//     toDate: { type: Date, required: true },
//     typeOfLeave: { type: String, require: true },
//     days: { type: Number },
//     note: { type: String, trim: true },
//     status: {
//       type: String,
//       enum: ["Accepted", "Rejected", "Pending","Cancelled"],
//       default: "Pending",
//     },
//     managerNote: { type: String, default: "" },
//   },
//   {
//     timestamps: true,
//     collection: "LeaveList",
//   }
// );

// mongoose.model("LeaveList", LeaveSchema);

