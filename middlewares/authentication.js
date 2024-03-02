const { verifedToken } = require("../helper/jwt");
const { User } = require ('../models')

 async function authentication (req, res, next) {
    try {           
        const bearerToken = req.headers.authorization
        if(!bearerToken) {
            throw { name : 'Unauthentication' }
        }

        const token = bearerToken.split(' ')[1]
        console.log(token)

        const decodeToken = verifedToken(token)

        const userFound = await User.findByPk(decodeToken.id)

        if(!userFound) {
            throw { name : 'Unauthentication'}
        }

        req.user = {
            id : userFound.id,
            email : userFound.email,
        }
        next()
    } catch (error) {
        next(error)
    }
};

module.exports = authentication