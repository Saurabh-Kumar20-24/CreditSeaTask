import React from "react";

const BasicDetails = ({ details }) => {
  if (!details) return null;

  return (
    <section className="mb-8">
      <h2 className="text-xl font-semibold text-blue-600 border-b pb-2 mb-4">
        Basic Details
      </h2>
      <div className="grid grid-cols-2 gap-4 text-gray-700">
        <p><strong>Name:</strong> {details.name}</p>
        <p><strong>Mobile:</strong> {details.mobilePhone}</p>
        <p><strong>PAN:</strong> {details.pan}</p>
        <p><strong>Credit Score:</strong> {details.creditScore}</p>
      </div>
    </section>
  );
};

export default BasicDetails;
