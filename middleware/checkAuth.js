module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {                  // req.isAuthenticated() : the built-in function the passport has - string을 가지고 if the user currently has a session
      return next();                              // next() 는 그 다음의 코드로 옮겨갈 수 있도록 한다. 여기서는 indexRoute.js의 dashboard render page
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/dashboard");
  },
};
