import xml2js from "xml2js";
import CreditReport from "../model/creditModel.js";

export const uploadXML = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No XML file uploaded" });
    }

    const xmlString = req.file.buffer.toString();
    const parser = new xml2js.Parser({ explicitArray: false });
    const result = await parser.parseStringPromise(xmlString);

    const root = result.INProfileResponse;

    // Basic details
    const applicant = root?.Current_Application?.Current_Application_Details?.Current_Applicant_Details || {};
    const name = `${applicant.First_Name || ""} ${applicant.Last_Name || ""}`.trim();
    const mobilePhone = applicant.MobilePhoneNumber || "";
    const pan = root?.CAIS_Account?.CAIS_Account_DETAILS?.CAIS_Holder_Details?.Income_TAX_PAN || "";
    const creditScore = Number(root?.SCORE?.BureauScore || 0);

    // Report summary
    const summary = root?.CAIS_Account?.CAIS_Summary;
    const reportSummary = {
      totalAccounts: Number(summary?.Credit_Account?.CreditAccountTotal || 0),
      activeAccounts: Number(summary?.Credit_Account?.CreditAccountActive || 0),
      closedAccounts: Number(summary?.Credit_Account?.CreditAccountClosed || 0),
      currentBalanceAmount: Number(summary?.Total_Outstanding_Balance?.Outstanding_Balance_All || 0),
      securedAccountsAmount: Number(summary?.Total_Outstanding_Balance?.Outstanding_Balance_Secured || 0),
      unsecuredAccountsAmount: Number(summary?.Total_Outstanding_Balance?.Outstanding_Balance_UnSecured || 0),
      last7DaysCreditEnquiries: Number(root?.TotalCAPS_Summary?.TotalCAPSLast7Days || 0),
    };

    // Credit accounts list
    let accountList = root?.CAIS_Account?.CAIS_Account_DETAILS || [];
    if (!Array.isArray(accountList)) accountList = [accountList];

    const creditAccounts = accountList.map(acc => ({
      bank: acc.Subscriber_Name?.trim() || "",
      accountNumber: acc.Account_Number || "",
      address: [
        acc.CAIS_Holder_Address_Details?.First_Line_Of_Address_non_normalized,
        acc.CAIS_Holder_Address_Details?.Second_Line_Of_Address_non_normalized,
        acc.CAIS_Holder_Address_Details?.Third_Line_Of_Address_non_normalized,
        acc.CAIS_Holder_Address_Details?.City_non_normalized,
        acc.CAIS_Holder_Address_Details?.ZIP_Postal_Code_non_normalized
      ].filter(Boolean).join(", "),
      amountOverdue: Number(acc.Amount_Past_Due || 0),
      currentBalance: Number(acc.Current_Balance || 0),
    }));

    const reportData = { name, mobilePhone, pan, creditScore, reportSummary, creditAccounts };

    const savedReport = await CreditReport.create(reportData);

    res.status(201).json({
      message: "XML data parsed and saved successfully",
      savedReport
    });

  } catch (err) {
    console.error("Error parsing XML:", err);
    res.status(500).json({ error: "Failed to parse and save XML" });
  }
};
