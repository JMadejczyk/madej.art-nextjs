const requireAuth = (req, res, next) => {
  if (req.session.authenticated) {
    next(); // User is authenticated, continue to next middleware
  } else {
    // res.redirect("/login"); // User is not authenticated, redirect to login page
    res.status(401).send({ message: "Unauthorized" });
  }
};
module.exports = { requireAuth };
// Path: backend/routes/login.js
