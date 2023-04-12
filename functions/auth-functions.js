const jwt = require('jsonwebtoken')
const {Forbidden} = require('../custom-errors')

const sendCookies = (res, token) => {
    res.cookie('apimeToken', token, {expires: new Date(Date.now() + 3600000 * 3), httpOnly: true, signed:true})
}

const isJwtValid = (token) => 
    jwt.verify(token, process.env.TOKEN_SECRET)


const checkOwner = (user, ownerId) => {
    if(user.id === ownerId){
        return
    }
    if(user.role === 'administrator'){
        return
    }
    throw new Forbidden('User Unauthorized to access this resource.')
}

module.exports = {sendCookies, isJwtValid, checkOwner}