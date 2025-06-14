const express = require("express");
const router = express.Router();
const pool = require("../db/database");

router.get("/", async (req, res) => {
  const { route_id } = req.query;

  try {
    const result = await pool.query(
      `SELECT bus.bus_id, bus.bus_plate, bus.bus_number
      FROM trip
      JOIN bus ON trip.bus_id = bus.bus_id
      WHERE trip.route_id = $1`,
      [route_id]
    );
    res.json(result.rows);
  } catch {
    console.error("Error retrieving bus list:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
