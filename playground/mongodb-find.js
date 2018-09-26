//const MongoClient = require('mongodb').MongoClient
const {MongoClient, ObjectID} = require('mongodb')  // using Object Destructuring
const url = 'mongodb://localhost:27017'

MongoClient.connect(url, (err, client) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server')
    }

    console.log('Connected to MongoDB server')
    const db = client.db('TodoApp')
    
    findDocuments(db, () => {
        client.close()
    })
})
// const findDocuments = (db, callback) => {
//     const collection = db.collection('Todo')
//     collection.find({
//         _id: new ObjectID('5baa65ef85ad3e1ce0907434')
//     }).toArray().then((docs) => {
//         // onSuccess
//         console.log('Todos')
//         console.log(JSON.stringify(docs, undefined, 2))
//     }, (err) => {
//         console.log('Unable to fetch todos', err)
//     })
// }

/***** count cursors  *******/
// const findDocuments = (db, callback) => {
//     const collection = db.collection('Todo')
//     collection.find().count().then((count) => {
//         // onSuccess
//         console.log(`Todos count: ${count}`)
//         //console.log(JSON.stringify(docs, undefined, 2))
//     }, (err) => {
//         console.log('Unable to fetch todos', err)
//     })
// }
/***** count cursors  *******/
const findDocuments = (db, callback) => {
    const collection = db.collection('Users')
    collection.find({name:'Harry'}).toArray().then((docs) => {
        // onSuccess
        //console.log(`Todos count: ${count}`)
        console.log(JSON.stringify(docs, undefined, 2))
    }, (err) => {
        console.log('Unable to fetch todos', err)
    })
}