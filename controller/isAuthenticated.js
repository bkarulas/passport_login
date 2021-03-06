// Middleware for restricting routes a user is not allowed to visit if not logged in

module.exports = function(req, res, next) {
    if (req.user) {
      next();
    } else {
    return res.redirect("/login");
    }
  };
  