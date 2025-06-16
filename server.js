const express = require("express");
const cors = require("cors");

const signupRoute = require("./src/routes/signup");
const authRoute = require("./src/routes/auth");
const routeSelect = require("./src/routes/routeSelect");
const busList = require("./src/routes/busList");

const routeMap = require("./src/routes/routeCoordinates");
const busStopMap = require("./src/routes/busStopCoordinates");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/signup", signupRoute);
app.use("/api/login", authRoute);
app.use("/api/route", routeSelect);
app.use("/api/bus", busList);

app.use("/api/routeMap", routeMap);
app.use("/api/busStopMap", busStopMap);

const PORT = 3000;
app.listen(PORT, "192.168.1.17", () => {
  console.log(`Server running on port ${PORT}`);
});
