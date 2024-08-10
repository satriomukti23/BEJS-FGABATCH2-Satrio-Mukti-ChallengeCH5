const jwt = require('jsonwebtoken')

const authJwt = (req,res,next) => {

    const token = req.headers['Authorization']

    if(!token == null){
        return res.status(401).json({
            message: "Token Is Not Valid"
        })
    }

    try{
    jwt.verify(token, process.env.JWT_SECRET);
    next()
    }catch(error){
        console.log(error)
        return res.status(401).json({
            message: "Token Is Not Valid"
        })
    }
}

module.exports = {
    authJwt
}