//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')  // using Object Destructuring
 
//onject destructuring
// var user = {name: 'Abhi', age :21}
// var {name} = user
// console.log(name)

const url = 'mongodb://localhost:27017'

MongoClient.connect(url, (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server')
    }

    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')
    
    deleteDocuments(db, () => {
        client.close()
    })
    //client.close()

    
})

const deleteDocuments = (db, callback) => {
    const collection = db.collection('Todo')

    /************ using callback*********/
    collection.deleteMany({text: 'Eat lunch'}, (err, results) => {
        if(err) {
            return console.log('Unable to delete document')
        }
        console.log('Deleting doc')
        console.log(results)
    })

    /******* FInd One And Delete one ********/
    // collection.findOneAndDelete({text: 'Todo2'}).then((result) => {
    //     console.log(result)
    // })

    /*******using promise***********/
    // collection.deleteOne({
    //     text: 'Eat lunch'
    // }).then((result) => {
    //     console.log('Deleting doc')
    //     console.log(result)
    // },  (err) => {
    //     console.log('Unable to delete todo', err)
    // })
}


const insertDocuments = (db, callback) => {
    const collection = db.collection('Users')
    collection.insertMany([
        {
            name: 'Abhijeet',
            age: 21,
            location: 'Noida'
        }
    ], (err, result) => {
        if(err) {
            return console.log('Unable to insert Users', err)
        }
        console.log(result.ops[0]._id.getTimestamp())
        //console.log(JSON.stringify(result.ops[0]._id, undefined, 2))
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