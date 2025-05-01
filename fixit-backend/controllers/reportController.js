const MaintenanceRequest = require("../models/MaintenanceRequest");
const { Parser } = require("json2csv"); // For CSV export

exports.getReportData = async (req, res) => {
  try {
    const { propertyId, status, startDate, endDate } = req.query;
    const filter = {};

    // Apply filters
    if (propertyId) filter.property = propertyId;
    if (status) filter.status = status;
    if (startDate && endDate) {
      filter.createdAt = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    // Fetch the data
    const data = await MaintenanceRequest.find(filter)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name")
      .populate("vendor", "name contact");

    // Handle CSV export if requested
    if (req.query.format === "csv") {
      const fields = ["title", "status", "priority", "createdAt", "resolvedAt"];
      const parser = new Parser({ fields });
      const csv = parser.parse(data);
      res.header("Content-Type", "text/csv");
      res.attachment("report.csv");
      return res.send(csv);
    }

    // Return data as JSON
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Report generation failed." });
  }
};
