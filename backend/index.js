const express = require("express");
const port = 3001;
const app = express();
const path = require("path");
const router = require("./router/routes");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
// const dotenv = require("dotenv");

app.use(bodyParser.json());
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json())
// dotenv.config();

app.use("/api", router);

// connect mongodb
const url =
  "mongodb+srv://zamanyaseen178:E4ohyaDC1L9CP3Md@cluster0.01djjth.mongodb.net/userData?retryWrites=true&w=majority";

mongoose
  .connect(url)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(port, () => {
      console.log(`server running on port ${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
