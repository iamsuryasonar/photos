const jwt = require('jsonwebtoken');

async function verify(req, res, next) {
    const token = req?.header('Authorization')?.slice(7);
    if (!token) return res.status(401).json({ success: false, message: "Access denied" });

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        req.user = verified;
        next()
    } catch (error) {

        console.log(error)
        return res.status(500).json({ success: false, message: "Something went wrong" });
    }
}

module.exports = {
    verify,
}