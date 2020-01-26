const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
module.exports.jwt = function(){
    const { secret } ={secret:process.env.JWT_SECRET};
    return expressJwt({ secret }).unless({
        path: [
            // public routes that don't require authentication
            '/api/v1/user/authenticate'
        ]
    });
}


