const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const session = require("express-session");    // passport 사용하려면 기본적으로 session이 필요하다
const path = require("path");
const port = process.env.port || 8000;

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({                                      // 추천하는 기본 configuration, 밑에 passport 있는데, passport 쓰려면, 쓰기 전에 express()와, 왼쪽의 configuration을 마쳐야 함
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

const passport = require("./middleware/passport");               // new configured passport
const authRoute = require("./routes/authRoute");
const indexRoute = require("./routes/indexRoute");
const reminderRoute = require("./routes/reminderRoute");

// Middleware for express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());                                  // start passport, initialize 안하면 serialize/deseialize 작동 안함
app.use(passport.session());                                     // passport hook-in session above

app.use((req, res, next) => {                                    // session 이 밑에서 뭐하는지 print하도록 추가한 것
  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log(req.session.passport);
  next();
});

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/reminder", reminderRoute);


app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
