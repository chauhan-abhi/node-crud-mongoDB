var mongoose = require('mongoose')

mongoose.Promise = global.Promise   
// tell mongoose which promise library 
//we want to use which is the es6 build in one
mongoose.connect(process.env.MONGODB_URI ,  { useNewUrlParser: true })

module.exports = {
    mongoose
}