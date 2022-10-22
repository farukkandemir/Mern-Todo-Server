require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

const todoRoutes = require("./routes/todoRoutes.js");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/api/todos", todoRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running at port ${PORT}`));
