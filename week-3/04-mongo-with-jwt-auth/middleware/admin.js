const jwt = require("jsonwebtoken");

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
  // Implement admin auth logic
  // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
  if (!req.headers.authorization) {
    return res.status(401).json({ msg: "Authorization header missing" });
  }
  const token = req.headers.authorization.split(" ")[1];

  try {
    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized" });
      }
      req._id = data._id;
      next();
    });
  } catch (e) {
    console.log(e);
    res.json({ msg: "token not found" });
  }
}

module.exports = adminMiddleware;
