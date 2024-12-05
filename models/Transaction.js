const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  type: { type: String, enum: ["income", "expense"], required: true },
});

module.exports = mongoose.model("Transaction", transactionSchema);
