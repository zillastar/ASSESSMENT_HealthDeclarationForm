const express = require("express");
const router = express.Router();

const controller = require("../controllers/formController");
router.get("/", controller.getForm);
router.get("/byUser", controller.getFormByUser);
router.get("/byUQID", controller.getFormByUQID);
router.get("/data", controller.getFormData);
router.post("/newform", controller.createNewForm);
router.post("/", controller.postForm);
router.put("/", controller.updateForm);
router.delete("/", controller.deleteForm);

module.exports = router;