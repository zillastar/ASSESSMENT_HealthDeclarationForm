const express = require("express");
const router = express.Router();

const controller = require("../controllers/formController");
router.get("/", controller.getForm);
router.post("/", controller.postForm);

module.exports = router;