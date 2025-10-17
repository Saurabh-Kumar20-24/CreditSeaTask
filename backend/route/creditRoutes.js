import express from "express";
import multer from "multer";
import { uploadXML } from "../controller/creditController.js";
import CreditReport from "../model/creditModel.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage }); // stores file in memory

router.post("/upload", upload.single("file"), uploadXML);

// ✅ GET endpoint to fetch all saved reports
router.get("/", async (req, res) => {
  try {
    const reports = await CreditReport.find().sort({ createdAt: -1 });
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: "Error fetching reports" });
  }
});

export default router;
