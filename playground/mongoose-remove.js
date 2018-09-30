const {ObjectID} =  require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

// User.remove({}).then((res) => {
//     console.log(res)
// })

//Todo.findOneAndRemove()
// Todo.findOneAndRemove({_id: '5bae1a6d6664df3abea4aa68'}).then((todo) => {
//     console.log({todo})
// })

Todo.findByIdAndRemove
Todo.findByIdAndRemove('5bae1a6d6664df3abea4aa68').then((todo) => {
    console.log({todo})
})