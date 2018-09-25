const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'

MongoClient.connect(url, (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server')
    }

    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')
    insertDocuments(db, () => {
        client.close()
    })
    
})

const insertDocuments = (db, callback) => {
    const collection = db.collection('Todo')
    collection.insertMany([
        {
            text: 'Something todo',
            completed: false  
        }
    ], (err, result) => {
        if(err) {
            return console.log('Unable to insert TODO', err)
        }
        console.log(JSON.stringify(result.ops, undefined, 2))
        callback(result)
    })
}
// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
//     if(err) {
//         return console.log('Unable to connect to MongoDB server')
//     }

//     console.log('Connected to MongoDB server')
//     // Add data
//     db.collection.insertOne('Todos', () => {
//         text: 'Something todo',
//         completed: false
//     })
//     }, (err, result) => {
//         if(err) {
//             return console.log('Unable to insert TODO', err)
//         }

//         console.log(JSON.stringify(result.ops), undefined, 2)
//     }) 
//     db.close()
// })