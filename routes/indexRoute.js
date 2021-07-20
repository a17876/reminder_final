const express = require("express");
const router = express.Router();
const { ensureAuthenticated, isAdmin } = require("../middleware/checkAuth");
const reminderController = require("../controllers/reminder_controller");

//----------------------- Welcome Route ----------------------------//
// localhost: 8000
router.get("/", (req, res) => {
  res.send("welcome");
});


// ---------------------- Dashboard Route --------------------------//
// localhost: 8000/dashboard
// req.user = { id: 4, name: "Jim", email: "jim123@gmail.com", password: "jim123" }
router.get("/dashboard", ensureAuthenticated, (req, res) => {       // user가 로그인했는지 체크하는 function
  res.render("dashboard", {                                         // express는 req, res를 받아서 뭔가를 하고, 보통 ejs에서 이걸 보내는데...
    user: req.user,                                            // req.user에 접근해서 current user를 받아 dashboard.ejs에 보내는 것임
  });                                                               // ensureAuthenticated: middleware
});


router.get("/weather", reminderController.getWeather);


// billing page example

// router.get("/billing", ensureAuthenticated, (req, res) => {      
//   res.render("billing", {                                        
//     user: req.user,   
//     creditCardType: req.user.creditCardType                                         
//   });                                                              
// });

// create - billing.ejs


module.exports = router;
