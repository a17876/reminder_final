const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const reminderController = require("../controllers/reminder_controller");

//----------------------- Welcome Route ----------------------------//
// localhost: 8000
router.get("/", (req, res) => {
  res.render("welcome");
});


// ---------------------- Dashboard Route --------------------------//
router.get("/dashboard", ensureAuthenticated, (req, res) => {       
  res.render("dashboard", {                                         
    user: req.user,                                            
  });                                                              
});

router.get("/weather", reminderController.getWeather);


module.exports = router;
