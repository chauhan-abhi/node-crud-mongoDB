var express = require('express')
var bodyParser = require('body-parser')

//es 6 destructuring
var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')
const {ObjectID} =  require('mongodb')


var app = express()
const port = process.env.PORT || 3000

//send json to express app --> this app
app.use(bodyParser.json())

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })
    todo.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos,
        errorString: 'success'})
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/todos/:id', (req, res) => {
    var id = req.params.id
    // validate id using isValid
    if(!ObjectID.isValid(id)) {
        res.status(404 ).send()
    } else {
        Todo.findById(id).then((todo) => {
            if(todo) {
                res.send({ todo})
            } else {
                res.status(404).send()
            }
        }, (e) => {
            res.status(400).send()  
        })
    }
})

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id
    if(!ObjectID.isValid(id)) {
        res.status(404 ).send()
    } else {
        Todo.findByIdAndRemove(id).then((todo) => {
            if(!todo) {
                return res.status(404).send()
            }
            res.send({todo})
        }).catch((e) => {
            res.status(400).send()
        })
    }
})

app.listen(port, () => {
    console.log(`Started upm at ${port}`)
})