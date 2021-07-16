const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const reminderController = require("../controllers/reminder_controller");


router.get("/new", ensureAuthenticated, reminderController.new) 
router.post("/", ensureAuthenticated, reminderController.create)
router.get("/", ensureAuthenticated, reminderController.list)
router.get("/:id", ensureAuthenticated, reminderController.listOne)
router.get("/:id/edit", ensureAuthenticated, reminderController.edit)
router.post("/:id/edit", ensureAuthenticated, reminderController.update)
router.post("/delete/:id",ensureAuthenticated, reminderController.delete)
module.exports = router;