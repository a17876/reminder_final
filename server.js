const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");    
const path = require("path");
const port = process.env.port || 8000;
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({                                      
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

const passport = require("./middleware/passport");               
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
const reminderRoute = require("./routes/reminderRoute");

// Middleware for express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());                               
app.use(passport.session());                                     


// Routes
app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/reminder", reminderRoute);


app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
