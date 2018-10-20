
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

// authenticate middleware lets us have access to 
// the user and the token
app.post('/todos', authenticate, (req, res) => {
    var todo = new Todo({
        text: req.body.text,
        _creator: req.user._id
    })
    todo.save().then((doc) => {
        res.send(doc)
    }, (e) => {
        res.status(400).send(e)
    })
})

// get only those Todos where actual logged in user
// created --> see query in Todo.find()
app.get('/todos', authenticate, (req, res) => {
    Todo.find({
        _creator: req.user._id
    }).then((todos) => {
        res.send({todos,
        errorString: 'success'})
    }, (e) => {
        res.status(400).send(e)
    })
})

app.get('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id
    // validate id using isValid
    if(!ObjectID.isValid(id)) {
        res.status(404 ).send()
    } else {
        // just access those todo by id created by them
        Todo.findOne({
            _id: id,
            _creator: req.user._id
        }).then((todo) => {
            if(todo) {
                res.send({ todo})
            } else {
                res.status(404).send()
            }
        }, (e) => {
            res.status(400).send()  
        })
        /*******old code to fetch Todo by id without authentication ***********/
        // Todo.findById(id).then((todo) => {
        //     if(todo) {
        //         res.send({ todo})
        //     } else {
        //         res.status(404).send()
        //     }
        // }, (e) => {
        //     res.status(400).send()  
        // })
    }
})

app.delete('/todos/:id', authenticate, (req, res) => {
    var id = req.params.id
    if(!ObjectID.isValid(id)) {
        res.status(404 ).send()
    } else {
        Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
        }).then((todo) => {
            if(!todo) {
                return res.status(404).send()
            }
            res.send({todo})
        }).catch((e) => {
            res.status(400).send()
        })

        // Todo.findByIdAndRemove(id).then((todo) => {
        //     if(!todo) {
        //         return res.status(404).send()
        //     }
        //     res.send({todo})
        // }).catch((e) => {
        //     res.status(400).send()
        // })
    }
})

/*********Delete todos by id using async-await *************/
app.delete('/todos/:id', authenticate, async(req, res) => {
    var id = req.params.id
    if(!ObjectID.isValid(id)) {
        return res.status(404).send()
    } 
    try {
        const todo = await Todo.findOneAndRemove({
            _id: id,
            _creator: req.user._id
        })
        if(!todo) {
            return res.status(404).send()
        }
        res.send({todo})    
    } catch(e) {
        res.status(400).send()
    }
})

//update todo
app.patch('/todos/:id', authenticate, (req, res) => {
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

    Todo.findOneAndUpdate({
        //custom query
        _id: id,
        _creator: req.user._id
    }, { $set: body}, {new: true}).then((todo) => {
        if(!todo) {
            return res.status(404).send()
        }
        res.send({todo})
    }).catch((e) => {
        res.status(400).send()
    })


    // set new: true --> return new object on update
    // Todo.findByIdAndUpdate(id, { $set: body}, {new: true }).then((todo) => {
    //     if(!todo) {
    //         return res.status(404).send()
    //     }
    //     res.send({todo})
    // }).catch((e) => {
    //     res.status(400).send()
    // })


})

/***** POST users using async-await*******/
app.post('/users', async(req, res) => {
   try {
    // alter to creating Todo object using req params as done in post todo route
    var body = _.pick(req.body, ['email', 'password'])
    var user = new User(body)
    await user.save()
    const token = await user.generateAuthToken()
    res.header('x-auth', token).send(user)
   } catch(e) {
    res.status(400).send(e)
   }
})

// this will get modified req object bcoz of reference authenticate middleware
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


/********Using async await instead of promise chaining********* */
app.post('/users/login', async(req, res) => {
    try {
        var body = _.pick(req.body, ['email', 'password'])
        const user = await User.findByCredentials(body.email, body.password)
        const token = await user.generateAuthToken()
        res.header('x-auth', token).send(user)
    } catch(e) {
        //not able to login
        console.log('status error')
        res.status(400).send()
    }
})

/********Using async await instead of promise chaining********* */
app.delete('/users/me/token', authenticate, async (req, res) => {
    try {
        await req.user.removeToken(req.token)
        res.status(200).send()
    
    }catch(e) {
        res.status(400).send() 
    }
})


app.listen(port, () => {
    console.log(`Started upm at ${port}`)
})