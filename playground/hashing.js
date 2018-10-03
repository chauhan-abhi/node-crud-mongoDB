const {SHA256} = require('crypto-js')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


// hashing using bcrpt
var password = '12344aab!'
// salt a password for extra security
bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash)
    })
})
var hashPassword = '$2a$10$zNPYfCulT/GdQaud/iWok.5qN8.nt3J/dbEiHvTVFa2sRrKp9Muh.'
bcrypt.compare('123!', hashPassword, (err, result) => {
    console.log(result)
})  

// var data= {
//     id: 10
// }  
// //return token --> send back to user when sign up or login
// var token = jwt.sign(data, 'secret123') 
// console.log(token)

// var decoded = jwt.verify(token, 'secret123')
// console.log('decoded', decoded)


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