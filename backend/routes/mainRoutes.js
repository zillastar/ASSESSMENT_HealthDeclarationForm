const express = require("express");
const router = express.Router();

const formRoutes = require("./formRoutes")

// localhost:3000/api/<route>
router.use("/form", formRoutes);

module.exports = router;