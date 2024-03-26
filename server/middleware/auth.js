const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.headers.authorization;
        if (!token) return res.status(401).json({ msg: "Token is not Valid!" });

        jwt.verify(token, process.env.JWT_KEY, (err, user) => {
            if (err) return res.status(401).json({ msg: "You are not Authenticated!" });

            req.user = user; 
            next();
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
}



module.exports = auth;
