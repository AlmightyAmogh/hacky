module.exports = {
  checkAuthentication: (req, res, next) =>
  {
      if(req.isAuthenticated())
          return next();

      res.redirect("/login");
  },

  checkLogin: (req, res, next) =>
  {
      if(req.isAuthenticated())
          return res.redirect("/logout");
      else
          return next();
  }
}