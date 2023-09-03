const express = require("express");
const router = express.Router();

const formRoutes = require("./formRoutes")
const userRoutes = require("./userRoutes")

// localhost:3000/api/<route>
router.use("/form", formRoutes);
router.use("/user", userRoutes)

module.exports = router;