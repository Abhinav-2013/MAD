const jwt = require('jsonwebtoken');
const Secret = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, Secret, (err, user) => {
        if (err) return res.sendStatus(403).json({message: 'Token is not valid'});
        req.user = user;
        console.log(user);
        next();
    })
}

module.exports = authenticateToken;