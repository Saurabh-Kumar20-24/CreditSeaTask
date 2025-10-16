import React from "react";

const CreditAccounts = ({ accounts }) => {
  if (!accounts.length) return null;

  return (
    <section>
      <h2 className="text-xl font-semibold text-blue-600 border-b pb-2 mb-4">
        Credit Accounts Information
      </h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-blue-50 text-left">
              <th className="py-2 px-4 border-b">Bank</th>
              <th className="py-2 px-4 border-b">Account No</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Amount Overdue</th>
              <th className="py-2 px-4 border-b">Current Balance</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">{acc.bank}</td>
                <td className="py-2 px-4 border-b">{acc.accountNumber}</td>
                <td className="py-2 px-4 border-b">{acc.address}</td>
                <td className="py-2 px-4 border-b text-red-600">₹{acc.amountOverdue}</td>
                <td className="py-2 px-4 border-b text-green-600">₹{acc.currentBalance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default CreditAccounts;
