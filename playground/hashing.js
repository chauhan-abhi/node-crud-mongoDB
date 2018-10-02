const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')

var data= {
    id: 10
}  
//return token --> send back to user when sign up or login
var token = jwt.sign(data, 'secret123') 
console.log(token)

var decoded = jwt.verify(token, 'secret123')
console.log('decoded', decoded)
// var message  = 'I am user no 1'
// var hash = SHA256(message).toString()
// console.log(`Mesaage: ${message}`)
// console.log(`Hash: ${hash}`)

// var data = {
//     id:  4
// }
// var token = {
//     data,
//     hash : SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
// // middle trick
// // token.data.id = 5
// // token.hash = SHA256(JSON.stringify(token.data)).toString()

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString()

// if(resultHash === token.hash) {
//     console.log('Data was not changed')
// } else {
//     console.log('Data was changed. Do not trust')
// }