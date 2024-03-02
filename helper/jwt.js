const jwt = require ('jsonwebtoken');
const JWT_SECRET = 'secret123'

const createdToken = (data) => {
    console.log(JWT_SECRET)
    return jwt.sign(data, JWT_SECRET)
}

const verifedToken = (token) => {
    return jwt.verify(token, JWT_SECRET)
}


module.exports = {createdToken, verifedToken}