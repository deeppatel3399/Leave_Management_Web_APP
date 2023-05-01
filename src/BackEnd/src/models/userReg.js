const mongoose = require("mongoose");

const userReg = new mongoose.Schema(
  {
    fname: { type: String, require: true, trim: true },
    lname: { type: String, require: true, trim: true },
    email: { type: String, require: true, unique: true, trim: true },
    password: { type: String, require: true, trim: true },
    role: { type: String, require: true, enum: ["E", "M"], trim: true },
    managerId: { type: String, require: true, trim: true },
    managerName: String,
    remainingLeaveDays: { type: Number, default: 28 },
  },
  {
    collection: "userdata",
  }
);

mongoose.model("userdata", userReg);
