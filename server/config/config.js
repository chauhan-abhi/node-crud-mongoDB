var env = process.env.NODE_ENV || 'development'

if (env === 'development' || env === 'test') {
    //access config.json
    // require json file it automatically parses itself to JS object 
    var config = require('./config.json')
    // when  var to access a property use [] notation
    var envConfig = config[env]

    // takes an object gets all keys and returns it as an array
    Object.keys(envConfig).forEach((key) => {
        process.env[key] = envConfig[key]
    })
}   

// if(env === 'development') {
//     process.env.PORT = 3000
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp'
// } else if(env === 'test') {
//     process.env.PORT = 3000
//     process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest'

// }
