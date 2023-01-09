const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3333;

async function connectDatabase() {
  await mongoose.connect("mongodb://localhost:27017");
}

const listItemSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  checked: Boolean,
});
const listItem = mongoose.model("list_item", listItemSchema);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/list-items", async (req, res) => {
  const items = await listItem.find();
  return res.json(items);
});

app.listen(port, () => {
  connectDatabase().catch((err) => {
    console.log(`Error connecting to database: ${err}`);
  });
  console.log(`App is runing ate port${port}`);
});
