const fetchuser = require("./fetchuser");
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const fetchpost = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const utoken = req.get('authtoken');
    // const ptoken = req.get('posttoken')
    if (!utoken) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
    try {
        const udata = jwt.verify(utoken, JWT_SECRET);
        // const pdata = jwt.verify(ptoken, JWT_SECRET);
        req.user = udata.user;
        console.log(req.user);
        // req.post = pdata.post;
        // console.log(req.post);

        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }

}


module.exports = fetchpost; 
