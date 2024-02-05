const { User } = require("../db/index.js");

async function userMiddleware(req, res, next) {
    // Implement user auth logic
    // You need to check the headers and validate the user from the user DB. Check readme for the exact headers to be expected

    try{
        const { name, password } = req.headers;
        if(!name || !password) {
            res.status(400).json({ message: "Incorrect credentials" });
        }
        
        const user = await User.findOne({ name:name, password:password });
        if(!user) {
            res.status(400).json({ message: "User not found " });
        }else{
            req.user = user;
            next();
        }
    }catch(e){
        console.log(e);
        return res.status(500).json({ message: "Error fetching user" });
    }

}

module.exports = userMiddleware;