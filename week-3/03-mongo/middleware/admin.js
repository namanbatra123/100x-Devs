const { Admin } = require('../db/index.js');

// Middleware for handling auth
async function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    try{

        const { name, password } = req.headers;
        if(!name || !password) {
            res.status(400).json({ message: "Incorrect credentials" });
        }
        const admin = await Admin.findOne({ name:name, password:password });
        if(!admin) {
            res.status(400).json({ message: "Admin not found " });
        }else{
            req.admin = admin;
            next();
        }
    }catch(e){
        console.log(e);
        res.status(500).json({ message: "Error authenticating admin" });
    }
}

module.exports = adminMiddleware;