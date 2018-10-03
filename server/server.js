
require('./config/config')

const _ = require('lodash')
const express = require('express')
const bodyParser = require('body-parser')
const {ObjectID} =  require('mongodb')

//es 6 destructuring
var {mongoose} = require('./db/mongoose')
var {Todo} = require('./models/todo')
var {User} = require('./models/user')
var {authenticate} = require('./middleware/authenticate')

var app = express()
const port = process.env.PORT

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

//update todo
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id
    // only these two properties can be updated
    // not allowing users to update anything they want
    // alter to creating Todo object using req params as done in post todo route
    var body = _.pick(req.body, ['text', 'completed'])
    
    if(!ObjectID.isValid(id)) {
        return res.status(404).send()
    } 
    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime()
    } else {
        body.completed = false
        body.completedAt = null
    }
    // set new: true --> return new object on update
    Todo.findByIdAndUpdate(id, { $set: body}, {new: true }).then((todo) => {
        if(!todo) {
            return res.status(404).send()
        }
        res.send({todo})
    }).catch((e) => {
        res.status(400).send()
    })


})

// POST users
app.post('/users', (req, res) => {
    // alter to creating Todo object using req params as done in post todo route
    var body = _.pick(req.body, ['email', 'password'])
    var user = new User(body)
      
    user.save().then(() => {
        return user.generateAuthToken()
    }).then((token) => {
        //send the token as header
        res.header('x-auth', token).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    })

})

// this will get modified req object bcoz of reference authenticate
app.get('/users/me', authenticate, (req, res) => {
    console.log('request authenticated')
    res.send(req.user)

    // var token = req.header('x-auth')
    // User.findByToken(token).then((user) => {
    //     if(!user) {
    //         // if no user can do same as done below in catch block
    //         //res.status(401).send()
    //         // but alternatively we can reject this promise and following 
    //         // statements will not execute and catch block will execute
    //         return Promise.reject()
    //     }
    //     res.send(user)
    // }).catch((e) => {
    //     res.status(401).send()
    // })

})


app.listen(port, () => {
    console.log(`Started upm at ${port}`)
})