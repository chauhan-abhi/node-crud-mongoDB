const {ObjectID} =  require('mongodb')

const {mongoose} = require('./../server/db/mongoose')
const {Todo} = require('./../server/models/todo')
const {User} = require('./../server/models/user')

var id = '5bae0fa740ceda34c41235a8'
if(!ObjectID.isValid(id)) {
    console.log('ID not valid')
}

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos', todos)
// })

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log('Todo', todo)
// })

// Todo.findById(id).then((todo) => {
//     if(!todo) {
//         return console.log('Id not found')
//     }
//     console.log('Todo by id', todo)
// }).catch((e) => {
//   console.log(e)    
// })


User.findById('5bae1ec20080fe3d2480fc93').then((user) => {
    if(!user) {
        console.log('Unable to find user')
    }
    console.log(JSON.stringify(user, undefined, 2))
}, (e) => {
    console.log(e)
})
