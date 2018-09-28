var mongoose = require('mongoose')

mongoose.Promise = global.Promise   
// tell mongoose which promise library 
//we want to use which is the es6 build in one
mongoose.connect('mongodb://localhost:27017/TodoApp',  { useNewUrlParser: true })

var Todo = mongoose.model('Todo', {
    text: {
        type: String
    },
    completed: {
        type: Boolean
    },
    completedAt: {
        type: Number    // unix time 
    }
})

// creatng instance of Todo
var newTodo = new Todo({
    text: 'Play Fifa',
    completed: false,
    completedAt: 0234324324
})

newTodo.save().then((doc) => {
    console.log(JSON.stringify(doc, undefined, 2))
},(e) => {
    console.log('Unable to save todo', e)
})