function requireAuth() {
  return function (req, res, next) {
    if (req.session.authenticated) {
      next();
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  };
}
export default requireAuth;
