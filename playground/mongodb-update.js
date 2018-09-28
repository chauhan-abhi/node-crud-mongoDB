//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')  // using Object Destructuring
 
const url = 'mongodb://localhost:27017'

MongoClient.connect(url, (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server')
    }

    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')
    
    updateUserDocuments(db, () => {
        client.close()
    })
    //client.close()
})



const updateTodoDocuments = (db, callback) => {
    const collection = db.collection('Todo')
    collection.findOneAndUpdate({
        _id: new ObjectID('5baa65ef85ad3e1ce0907434')
    }, {
        // update operators
        $set: {
            completed: true
        }
    },{
        // return updated doc
        returnOriginal: false
    }).then(result => {
         console.log(result)
    })
}


const updateUserDocuments = (db, callback) => {
    const collection = db.collection('Users')
    collection.findOneAndUpdate({
        name: 'Harry'
    }, {
        // update operators
        $inc: {
            age: -10
        }
    },{
        // return updated doc
        returnOriginal: false
    }).then(result => {
         console.log(result)
    })
}