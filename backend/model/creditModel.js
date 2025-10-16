import mongoose from "mongoose";

const CreditAccountSchema = new mongoose.Schema({
  bank: String,
  accountNumber: String,
  address: String,
  amountOverdue: Number,
  currentBalance: Number,
});

const CreditReportSchema = new mongoose.Schema({
  name: String,
  mobilePhone: String,
  pan: String,
  creditScore: Number,
  reportSummary: {
    totalAccounts: Number,
    activeAccounts: Number,
    closedAccounts: Number,
    currentBalanceAmount: Number,
    securedAccountsAmount: Number,
    unsecuredAccountsAmount: Number,
    last7DaysCreditEnquiries: Number,
  },
  creditAccounts: [CreditAccountSchema],
}, { timestamps: true });

export default mongoose.model("CreditReport", CreditReportSchema);
