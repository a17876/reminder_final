const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const userModel = require("../models/userModel").userModel;
const router = express.Router();


// localhost:8000/auth/login --> shows the login page
router.get("/login", forwardAuthenticated, (req, res) => res.render("login"));

// localhost:8000/auth/login --> when the login button clicked
router.post(
  "/login",
  passport.authenticate("local", {       
    successRedirect: "/dashboard",        
    failureRedirect: "/auth/login",       
  })                                      
);

// localhost:8000/auth/login --> when the "Login with Github" button clicked
router.get("/github",  passport.authenticate("github"));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/auth/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });


router.get("/register", forwardAuthenticated, (req, res) => res.render("register"));



router.get("/forgot", (req, res) => res.send("Sorry. You cannot reset your account. We will improve our service as soon as possible."));


// localhost:8000/auth/logout --> when the logout button clicked
router.get("/logout", (req, res) => {
  req.logout();                           
  res.redirect("/auth/login");
});

module.exports = router;
