const express = require("express");
const cors = require("cors");
require("./db");

const path = require('path');

// serve static frontend files from "public" (create public/ and put teacher.html there)


const authRoutes = require("./routes/auth");
const departmentRoutes = require("./routes/departments");
const SemesterRoutes = require("./routes/semesters");
const teacherRoutes = require("./routes/teachers");
const subjectRoutes = require("./routes/subjects");
const assignmentRoutes = require("./routes/assignments");
const roomRoutes = require("./routes/rooms");



const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", authRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/semesters", SemesterRoutes);
app.use("/api/teachers", teacherRoutes);
app.use("/api/subjects", subjectRoutes);
app.use("/api/assignments", assignmentRoutes);
app.use("/api/rooms", roomRoutes);
app.use(express.static(path.join(__dirname, 'public')));


app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
