var {User} = require('./../models/user')

var authenticate = (req, res, next) => {
    var token = req.header('x-auth')

    User.findByToken(token).then((user) => {
        if(!user) {
            // if no user can do same as done below in catch block
            //res.status(401).send()
            // but alternatively we can reject this promise and following 
            // statements will not execute and catch block will execute
            console.log('User does not exist')
            return Promise.reject()
        }
        // here we will modify the request object 
        req.user = user
        req.token = token
        next()
        // call to next is neccessary otherwise code in arrow function 
        // of /users/me route will not execute

    }).catch((e) => {
        console.log('unauthorized access in authenticate.js')
        res.status(401).send()
        // here we dont want to send back user bcoz request is unauthorized
        // hence next( ) is not called
    })
}

module.exports = {authenticate}