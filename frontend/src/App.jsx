import React, { useEffect, useState } from "react";
import axios from "axios";
import FileUpload from "./components/FileUpload";
import BasicDetails from "./components/BasicDetails";
import ReportSummary from "./components/ReportSummary";
import CreditAccounts from "./components/CreditAccounts";

const App = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/reports"); // adjust if needed
         console.log("Fetched report data:", res.data);
        const data = res.data[0]; // assuming API returns array of reports
        setReport(data);
      } catch (err) {
        console.error("Error fetching report:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, []);

   // Called when upload succeeds
  const handleUploadSuccess = (newReport) => {
    setReport(newReport.savedReport);
  };

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading report...</div>;
  if (!report) return <div className="text-center mt-10 text-red-500">No report found</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white p-8 shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
          Credit Report Dashboard
        </h1>

         <FileUpload onUploadSuccess={handleUploadSuccess} />

         {!report ? (
          <div className="text-center text-red-500 mt-8">No report found</div>
        ) : (
          <>
            <BasicDetails details={report} />
            <ReportSummary summary={report.reportSummary} />
            <CreditAccounts accounts={report.creditAccounts || []} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
