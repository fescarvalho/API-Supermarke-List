const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
const port = 3333;
mongoose.set("strictQuery", true);

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
app.delete("/list-items/:id", async (req, res) => {
  const { id } = req.params;
  const listItemDeletaded = await listItem.findByIdAndDelete(id);
  return res.json(listItemDeletaded);
});

app.put("/list-items/:id", async (req, res) => {
  const { id } = req.params;
  const { name, quantity, checked } = req.body;

  const listItemUpdated = await listItem.findByIdAndUpdate(
    id,
    {
      name,
      quantity,
      checked,
    },
    {
      new: true,
    },
  );
  return res.json(listItemUpdated);
});

app.post("/list-items", async (req, res) => {
  const { name, quantity, checked } = req.body;
  const newItem = await listItem.create({
    name,
    quantity,
    checked,
  });

  return res.json(newItem);
});

app.listen(port, () => {
  connectDatabase().catch((err) => {
    console.log(`Error connecting to database: ${err}`);
  });
  console.log(`App is runing ate port${port}`);
});
