const ScheduledMaintenance = require("../models/ScheduledMaintenance");
const Request = require("../models/Request"); // Import the Request model
const { Parser } = require("json2csv"); // For CSV export

exports.getReportData = async (req, res) => {
  try {
    const { propertyId, status, startDate, endDate, format, page = 1, limit = 10 } = req.query;
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

    const paginationOptions = {
      skip: (page - 1) * limit,
      limit: parseInt(limit),
    };

    // Fetch Scheduled Maintenance
    const scheduledData = await ScheduledMaintenance.find(filter, null, paginationOptions)
      .populate("createdBy", "name email")
      .populate("assignedTo", "name")
      .populate("vendor", "name contact");

    // Fetch Requests
    const requestData = await Request.find(filter, null, paginationOptions)
      .populate("tenant", "name email")
      .populate("property", "name address");

    // Combine data
    const combinedData = [
      ...scheduledData.map((item) => ({ ...item.toObject(), type: "Scheduled Maintenance" })),
      ...requestData.map((item) => ({ ...item.toObject(), type: "Request" })),
    ];

    // Handle CSV export if requested
    if (format === "csv") {
      const fields = [
        "type",
        "title",
        "status",
        "priority",
        "createdAt",
        "resolvedAt",
        "createdBy.name",
        "createdBy.email",
      ];
      const parser = new Parser({ fields });
      const csv = parser.parse(combinedData);
      res.header("Content-Type", "text/csv");
      res.attachment("report.csv");
      return res.send(csv);
    }

    // Return data as JSON
    res.json({
      data: combinedData,
      pagination: {
        currentPage: parseInt(page),
        totalItems: combinedData.length,
        itemsPerPage: limit,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Report generation failed." });
  }
};