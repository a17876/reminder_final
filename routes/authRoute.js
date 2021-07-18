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
  passport.authenticate("local", {        // request를 인터셉트해서 email과 password를 가지고 verify user를 알아서, local 방식 이용한다 말해주고 (트위터면 이 자리에 twitter)
    successRedirect: "/dashboard",        // 로컬로 원해? 그러면 passport.js의 local strategy를 볼게 하고 넘어감
    failureRedirect: "/auth/login",       // passport.js의 localStrategy가 끝나고 user 또는 null을 받게 되면 자동으로 숨겨진 function - login()이 call됨
  })                                      // 이거는 passport.js의 serializeUser를 call 하는데, 이건 user의 session을 만드는 function임
);


// localhost:8000/auth/login --> when the "Login with Github" button clicked
router.get("/github",  passport.authenticate("github"));

router.get('/github/callback', 
  passport.authenticate('github', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/dashboard');
  });
 


// localhost:8000/auth/logout --> when the logout button clicked
router.get("/logout", (req, res) => {
  req.logout();                           // passport가 만들어준 function - destroying session
  res.redirect("/auth/login");
});

module.exports = router;
