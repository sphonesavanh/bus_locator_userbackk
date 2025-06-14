const express = require("express");
const cors = require("cors");

const signupRoute = require("./src/routes/signup");
const authRoute = require("./src/routes/auth");

const routeSelect = require("./src/routes/routeSelect");
const busList = require("./src/routes/busList");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/signup", signupRoute);
app.use("/api/login", authRoute);

app.use("/api/route", routeSelect);
app.use("/api/bus", busList);

const PORT = 3000;
app.listen(PORT, '172.20.10.2', () => {
  console.log(`Server running on port ${PORT}`);
});
