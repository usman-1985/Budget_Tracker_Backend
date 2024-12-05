const express = require("express");
const Transaction = require("../models/Transaction");

const router = express.Router();

// GET /api/transactions
router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/transactions
router.post("/", async (req, res) => {
  try {
    const { title, amount, type } = req.body;
    const transaction = new Transaction({ title, amount, type });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: "Invalid input" });
  }
});

// DELETE /api/transactions/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Transaction.findByIdAndDelete(id);
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(404).json({ message: "Transaction not found" });
  }
});

module.exports = router;
