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
require("./src/models/superAdmin");
require("dotenv").config();

const bodyParser = require("body-parser");

const commonRouter = require("./src/routers/commonRoutes");
const UserRouters = require("./src/routers/userRoutes");
const managerRouter = require("./src/routers/managerRoutes");
const leaveRouter = require("./src/routers/leaveRoutes");
const adminRouter = require("./src/routers/adminRoutes");

// increase the maximum request size limit to 50mb
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(commonRouter);
app.use("/user", UserRouters);
app.use("/manager", managerRouter);
app.use("/leave", leaveRouter);
app.use("/admin", adminRouter);

app.listen(process.env.PORT, () => {
  console.log("Server Start on" + " " + process.env.PORT);
});
