var mongoose = require('mongoose')

mongoose.Promise = global.Promise   
// tell mongoose which promise library 
//we want to use which is the es6 build in one
mongoose.connect('mongodb://localhost:27017/TodoApp',  { useNewUrlParser: true })

module.exports = {
    mongoose
}