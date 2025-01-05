import mongoose, { Schema, Document } from "mongoose";
export interface ITransaction {
  type: "credit" | "debit";
  invoice: string;
  timestamp: number;
  status: string;
  mobile: string;
}
// MongoDB Schema
const transactionSchema = new mongoose.Schema(
  {
    type: { type: String, enum: ["credit", "debit"], required: true },
    invoice: { type: String, required: true },
    timestamp: { type: Number, required: true },
    status: { type: String, required: true },
    mobile: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Transaction", transactionSchema);
