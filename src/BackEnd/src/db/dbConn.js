const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/LeaveManagement",{
    useNewUrlParser: true,
})
.then(()=>{
   console.log("Database Connection Successfully");
})
.catch((err)=>{
    console.log("Database Not Connected");
    console.log(err);
});
