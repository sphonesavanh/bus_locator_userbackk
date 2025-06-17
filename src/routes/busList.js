const express = require("express");
const router = express.Router();
const pool = require("../db/database");

router.get("/", async (req, res) => {
  const route_id = req.query.route_id;
  console.log(" [busList] route_id: ", route_id);
  if (!route_id) {
    return res.status(400).json({ error: "Route ID is required" });
  }

  try {
    const result = await pool.query(
      `SELECT DISTINCT bus.bus_id, bus.bus_plate, bus.bus_number
      FROM trip
      JOIN bus ON trip.bus_id = bus.bus_id
      WHERE trip.route_id = $1`,
      [route_id]
    );
    console.log(" [busList] rows: ", result.rows);
    res.json(result.rows);
  } catch {
    console.error("Error retrieving bus list:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
