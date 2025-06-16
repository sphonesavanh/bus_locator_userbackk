const express = require("express");
const router = express.Router();
const pool = require("../db/database");

router.get("all", async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT route_id, coordinates from route_paths`
    );

    const features = result.rows.map((route) => ({
      type: "Feature",
      properties: {
        route_id: route.route_id,
      },
      geometry: {
        type: "LineString",
        coordinates: route.coordinates,
      },
    }));
    res.json({ type: "FeatureCollection", features: features });
  } catch (err) {
    console.error("Error retrieving route list:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get(`/:route_id`, async (req, res) => {
  const { route_id } = req.params;
  const result = await pool.query(
    `SELECT coordinates FROM route_paths WHERE route_id = $1`,
    [route_id]
  );

  if (result.rowCount === 0 || !result.rows[0].coordinates) {
    res.status(404).json({ error: "Route not found" });
  }

  res.json({
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: result.rows[0].coordinates,
    },
  });
});

module.exports = router;
