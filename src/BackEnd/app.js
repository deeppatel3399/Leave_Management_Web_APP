const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");

const app = express();

app.use(express.json());
app.use(cors());

require("./src/db/dbConn");
require("./src/models/userReg");
require("./src/models/managerReg");
require("./src/models/leaveList");
require("dotenv").config();

const UserRouters = require("./src/routers/userRoutes");

app.use(UserRouters);

app.listen(process.env.PORT,()=>{
    console.log("Server Start on"+" "+process.env.PORT);
});
