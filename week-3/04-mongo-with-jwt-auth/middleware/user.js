const jwt = require("jsonwebtoken")
const {User} = require("../db");

async function userMiddleware(req, res, next) {
  // Implement user auth logic
  // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected
  const token = req?.headers?.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized" });
  }
  try {
    jwt.verify(token, process.env.JWT_KEY, async (err, data) => {
      if (err) {
        return res.status(401).send({ message: "Unauthorized" });
      }

      // Fetch the user from the database using the ID from the token
      try {
        const user = await User.findById(data._id);
        if (!user) {
          return res.status(401).send({ message: "Unauthorized - User not found" });
        }
        req.user = user; // Attach the user object to the request
        next();
      } catch (userFetchError) {
        console.error(userFetchError);
        return res.status(500).send({ message: "Error fetching user from token" });
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Error verifying token", error: error.message });
  }
}

module.exports = userMiddleware;