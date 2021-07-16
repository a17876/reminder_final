const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const userController = require("../controllers/userController");
const GitHubStrategy = require('passport-github').Strategy;


const localLogin = new LocalStrategy(            // 로컬 스트레터지 부분
  {
    usernameField: "email",                      // 우리는 기본 세팅인 username 대신 email을 사용할거야 라고 말하는 부분
    passwordField: "password",                   // 이거는 지워도 된다. 왜냐면 기본 세팅이기 때문에
  },
  (email, password, done) => {                   // talk/ask to the database, does this user exist?
    // Check if User exists in the database
    const user = userController.getUserByEmailIdAndPassword(email, password);     // userControllers에 들어있는 function call(없으면 null return하는)
    // { id: 4, name: "Jim", email: "jim123@gmail.com", password: "jim123" }
    return user                                  // ternary operator
      ? done(null, user)                         // user가 true이면 이거,
      : done(null, false, {                      // false이면 이거
        message: "Your login details are not valid. Please try again",
      });
  }
);


// passport.use(new GitHubStrategy(
//   {
//     clientID: GITHUB_CLIENT_ID,
//     clientSecret: GITHUB_CLIENT_SECRET,
//     callbackURL: "http://127.0.0.1:3000/auth/github/callback"
//   },
//   function (accessToken, refreshToken, profile, cb) {
//     User.findOrCreate({ githubId: profile.id }, function (err, user) {
//       return cb(err, user);
//     });
//   }
// ));





// req.session.passport.user
// req.user = { id: 4, name: "Jim", email: "jim123@gmail.com", password: "jim123" }   : current login user를 불러오는 방법, special variable
passport.serializeUser(function (user, done) {                // user 정보를 server에 저장하기 위해 session을 만드는 것(login()이 call 하는 것), 그리고 attach req.user
  done(null, user.id);                                        // 위의 done에서 받은 user를 받아서 수행 -> 여기서는 user의 id만 저장
});



passport.deserializeUser(function (id, done) {    // email 해도 되고, id 해도 되고...(serialize를 id로 했으니,,)
  let user = userController.getUserById(id);      // re-attach req.user
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

module.exports = passport.use(localLogin);          // passport에게 위의 set-up을 사용하라고 말해줘야 한다, 이 것은 newly figured passport liabrary를 return 한다


// ------------------- Server Hard Drive ------------------

/*
Session = {
 'fjkdlsjdkfjlskdjfkj': {
   id: 5
 }

}
'fjkdlsjdkfjlskdjfkj'를 쿠키에 저장하고, 브라우저에 보낸다.
브라우저 refresh시에: server에 request를 보낼 때마다 cookie의 string이 passport.js(서버)에 보내지게 되고, passport가 이 string을 보게 되면
session에 가서 이 string이 있는지 보고, 있으면 user.id 꺼내서 deserializeUser 실행,
*/