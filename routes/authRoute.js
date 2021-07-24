const express = require("express");
const passport = require("../middleware/passport");
const { forwardAuthenticated } = require("../middleware/checkAuth");
const userModel = require("../models/userModel").userModel;
const router = express.Router();
const userController = require("../controllers/userController");

// const prisma = new PrismaClient();
// import { PrismaClient } from "@prisma/client";
// require("dotenv").config();

// router.post("/register", async (req, res) => {
//   const name = req.body.name; 
//   const email = req.body.email;
//   try {
//       const existingUser = await prisma.user.findUnique({ where: { email } }); 
//       if (existingUser) {
//           return res.send("The user already exists!");
//       } else {
//           const userFromDatabase = await prisma.user.create({
//               data: { name, email }
//           });
//           return userFromDatabase;
//       }
//   } catch (err) {
//       return res.send("Something happend");
//   }
// });



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


router.get("/register", (req, res) => res.render("register"));

router.post("/register", userController.userRegister);

router.get("/registerSuccess", (req, res) => res.render("registerSuccess"));

router.get("/forgot", (req, res) => res.send("Sorry. You cannot reset your account. We will improve our service as soon as possible."));


// localhost:8000/auth/logout --> when the logout button clicked
router.get("/logout", (req, res) => {
  req.logout();                           
  res.redirect("/auth/login");
});

module.exports = router;
