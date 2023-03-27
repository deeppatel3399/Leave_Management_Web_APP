const mongoose = require("mongoose");

const LeaveSchema = new mongoose.Schema(
  {
    employId: {
      type: String,
      ref: "userdata",
      required: true,
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
    managerNote: { type: String, default: "" },
  },
  {
    timestamps: true,
    collection: "LeaveList",
  }
);

mongoose.model("LeaveList", LeaveSchema);
