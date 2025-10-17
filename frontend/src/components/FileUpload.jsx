import React, { useState } from "react";
import axios from "axios";

const FileUpload = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage("");
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("⚠️ Please select an XML file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post("https://creditseatask-1.onrender.com/api/reports/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("✅ File uploaded and processed successfully!");
      onUploadSuccess(res.data);
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("❌ Upload failed. Please check the console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 p-4 border-2 border-dashed border-blue-400 rounded-xl bg-blue-50">
      <form onSubmit={handleUpload} className="flex flex-col items-center space-y-4">
        <input
          type="file"
          accept=".xml"
          onChange={handleFileChange}
          className="cursor-pointer text-sm"
        />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          {loading ? "Uploading..." : "Upload XML"}
        </button>
        {message && <p className="text-sm text-gray-700">{message}</p>}
      </form>
    </div>
  );
};

export default FileUpload;
