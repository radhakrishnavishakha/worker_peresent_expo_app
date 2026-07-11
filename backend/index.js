const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const personRoutes = require("./routes/person");
const attendanceRoutes = require("./routes/attendance");

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: "*" })); // Allow all origins for testing

app.use("/api/auth", authRoutes);
app.use("/api/person", personRoutes);
app.use("/api/attendance", attendanceRoutes);

app.listen(5000, () => {
  console.log("Backend server running on port 5000");
});
