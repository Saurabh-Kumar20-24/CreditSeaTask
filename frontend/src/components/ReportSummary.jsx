import React from "react";

const ReportSummary = ({ summary }) => {
  if (!summary) return null;

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-blue-600 border-b pb-2 mb-4">
        Report Summary
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
        <p><strong>Total Accounts:</strong> {summary.totalAccounts}</p>
        <p><strong>Active Accounts:</strong> {summary.activeAccounts}</p>
        <p><strong>Closed Accounts:</strong> {summary.closedAccounts}</p>
        <p><strong>Current Balance:</strong> ₹{summary.currentBalanceAmount}</p>
        <p><strong>Secured Amount:</strong> ₹{summary.securedAccountsAmount}</p>
        <p><strong>Unsecured Amount:</strong> ₹{summary.unsecuredAccountsAmount}</p>
        <p><strong>Last 7 Days Enquiries:</strong> {summary.last7DaysCreditEnquiries}</p>
      </div>
    </section>
  );
};

export default ReportSummary;
