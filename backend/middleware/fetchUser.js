const jwt = require('jsonwebtoken')
const JWT_SECRET = 'jaySwaminar@y@n'


const fetchUser = (req, res, next) => {
    // Get user from the jwt token and id to req req object 

    const token = req.header('auth-token')
    if (!token) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const string = jwt.verify(token, JWT_SECRET);
        req.user = string.user;

        next()

    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}

module.exports = fetchUser;