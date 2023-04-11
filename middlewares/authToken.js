const jwt = require("jsonwebtoken");

const verifyTokenAndAdmin = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secretRandomToken");

        if (decoded.user.role !== "admin") {
            res.status(403).json({ message: "UnAuthorized" });
        } else {
            req.user = decoded.user;
            next();
        }
    } catch (err) {
        res.status(401).json({ message: "Invalid token" });
    }
};

module.exports = verifyTokenAndAdmin;
