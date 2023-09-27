const jwt = require('jsonwebtoken');
const JWT_SECRET = "Faizisagoodb$oy";

const fetchUser = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Plesae authenticate using a valid token" })
    }
    else {
        try {
            const data = jwt.verify(token, JWT_SECRET);
            req.user = data.user;   // altering request data
            next();    //next means call the newxt middleware/function
        } catch (error) {
            res.status(401).send({ error: "Plesae authenticate using a valid tokrn" })
        }
     

    }

    
}

//A middleeware is nothing but a function

module.exports = fetchUser;