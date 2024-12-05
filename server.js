const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { v4: uuidv4 } = require("uuid"); // For generating unique IDs

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory array for storing transactions
let transactions = [
  {
    id: "1",
    title: "Grocery Shopping",
    amount: 50.0,
    type: "expense",
  },
];

// GET /api/transactions: Retrieve all transactions
app.get("/api/transactions", (req, res) => {
  res.json(transactions);
});

// POST /api/transactions: Add a new transaction
app.post("/api/transactions", (req, res) => {
  const { title, amount, type } = req.body;
  if (!title || !amount || !type) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const newTransaction = {
    id: uuidv4(), // Generate a unique ID
    title,
    amount: parseFloat(amount), // Ensure amount is a number
    type,
  };

  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

// DELETE /api/transactions/:id: Remove a transaction by ID
app.delete("/api/transactions/:id", (req, res) => {
  const { id } = req.params;
  const index = transactions.findIndex((transaction) => transaction.id === id);

  if (index === -1) {
    return res.status(404).json({ message: "Transaction not found" });
  }

  transactions.splice(index, 1); // Remove the transaction
  res.status(200).json({ message: "Transaction deleted" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
