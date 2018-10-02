const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const _ = require('lodash')

var UserSchema = new mongoose.Schema({ 
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,   
        // validate: {
        //     validator: (value) => {
        //         return validator.isEmail(value)
        //     },
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
    }, 
    password : { 
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
})

// this method determines what is send back when a mongoose model
// is converted into JSON value
UserSchema.methods.toJSON = function () {
    var user = this
    // responsible for taking our mongoose variable 'user'
    // converted into regular object where properties avalable on the
    // document exist 
    var userObject = user.toObject()
    return _.pick(userObject, ['_id', 'email'])
}

// cannot attach method to User object so mehtods are attached to User Schema
// UserScheme.methods is object 
// generateAuthToken is instance method --> access to individual document
// regular function used instead of arrow fn bcoz 'this' is used
// this stores individual document
// user.generateAuthTokem() --> here this refers to user
UserSchema.methods.generateAuthToken = function() {
    var user = this
    var access = 'auth'
    var token = jwt.sign({_id: user._id.toHexString(), access}, 'secret123').toString()
    
    // update user's tokens array which is a regular array
    // using es6 syntax directly pushing value of calculated access and calc token
    //to user tokens field params
    // es6 syntax 
    user.tokens.push({access, token})
    
    // user.save returns a promise --> return a token and server.js
    // can grab this token and attach a then call :
    // normally in promise chaining promise has to be returned but here returning value
    // instead of promise
    // here token value will be passed as success to the next then call

    
    return user.save().then(() => {
        return token
    })
}

// pass schema as second argument
var User = mongoose.model('User', UserSchema)

// var User = mongoose.model('User', {
//     email: {
//         type: String,
//         required: true,
//         minlength: 1,
//         trim: true,
//         unique: true,   
//         // validate: {
//         //     validator: (value) => {
//         //         return validator.isEmail(value)
//         //     },
//         validate: {
//             validator: validator.isEmail,
//             message: '{VALUE} is not a valid email'
//         }
//     }, 
//     password : {
//         type: String,
//         required: true,
//         minlength: 6
//     },
//     tokens: [{
//         access: {
//             type: String,
//             required: true
//         },
//         token: {
//             type: String,
//             required: true
//         }
//     }]
// })

module.exports = {User}