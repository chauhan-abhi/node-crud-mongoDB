var mongoose = require('mongoose')

var Todo = mongoose.model('Todo', {
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,   // unix time 
        default:null
    },
    _creator: {
        type: mongoose.Schema.Types.ObjectId,
        // not make a todo unless logged in
        required: true
    }


})

module.exports = {Todo}