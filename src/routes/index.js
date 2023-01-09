const express = require("express");
const router = express.Router();
const listItem = require("../models/ListItem");

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.get("/list-items", async (req, res) => {
  try {
    const items = await listItem.find();
    return res.json(items);
  } catch (err) {
    return res.json(err.message);
  }
});

router.delete("/list-items/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json("Id is mandatory.");

    const listItemDeletaded = await listItem.findByIdAndDelete(id);
    return res.json(listItemDeletaded);
  } catch (err) {
    return res.json(err.message);
  }
});

router.put("/list-items/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const { name, quantity, checked } = req.body;

    if (!name || name.length < 3)
      return res.status(400).json("Name is mandatory and must be more an 3 caracters.");
    if (!quantity || typeof quantity !== "number")
      return res.status(400).json("Quantity s mandatory and must be number.");
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
  } catch (err) {
    return res.json(err.message);
  }
});

router.post("/list-items", async (req, res) => {
  try {
    const { name, quantity, checked } = req.body;

    if (!name || name.length < 3)
      return res.status(400).json("Name is mandatory and must be more an 3 caracters.");
    if (!quantity || typeof quantity !== "number")
      return res.status(400).json("Quantity s mandatory and must be number.");

    const newItem = await listItem.create({
      name,
      quantity,
      checked: checked || false,
    });

    return res.json(newItem);
  } catch (err) {
    return res.json(err);
  }
});

module.exports = router;
