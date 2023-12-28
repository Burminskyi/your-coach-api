const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/authRouter");
const workoutsRouter = require("./routes/workoutsRouter");
const userRouter = require("./routes/userRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/workouts", workoutsRouter);
app.use("/user", userRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;