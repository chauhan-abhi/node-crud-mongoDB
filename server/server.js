var express = require('express')
var bodyParser = require('body-parser')

//es 6 destructuring
var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')
// // creatng instance of Todo
// var newTodo = new Todo({
//     text: '   Play CS',
//     completed: false,
//     completedAt: 324324
// })

// newTodo.save().then((doc) => {
//     console.log(JSON.stringify(doc, undefined, 2))
// },(e) => {
//     console.log('Unable to save todo', e)
// })


var newUser = new User({
    email: 'abc@gmail.com   '
})

newUser.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2))
},(e) => {
    console.log('Unable to save', e)
})

