require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./src/routes/index");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 3000;

mongoose.set("strictQuery", true);
app.use(express.json());

app.use(
  cors({
    origin: "*",
  }),
);

async function connectDatabase() {
  await mongoose.connect(process.env.DATABASE_URL);
}

app.listen(port, () => {
  connectDatabase().catch((err) => {
    console.log(`Error connecting to database: ${err}`);
  });
  app.use("/", routes);
  console.log(`App is runing ate port${port}`);
});
