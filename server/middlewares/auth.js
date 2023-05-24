const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader){
        const token = authHeader.split(' ')[1];
        if (token) {
            jwt.verify(token, SECRET_KEY, (err, user) => {
                if (err) {
                    console.log("err on authenticate user", err);
                    return res.status(403).send({error: "Token is not valid"})
                }  
                req.user = user;

                next();
            }) 
        }else {
            return res.status(409).send({error: "Token is not availble"});   
        }
    }else {
        return res.status(403).send({error: "You don't have the access"});
    }
}
module.exports = {authenticateUser};