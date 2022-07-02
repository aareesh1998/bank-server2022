// server creation
// import express
const express = require('express')

//  import dataservice
const dataservice = require('./services/data.service')

// import jsonwebtoken
const jwt = require('jsonwebtoken')

// import cors
const cors=require('cors')

//  servcer app create using express
const app = express()

// use cors in server app
app.use(cors({
    origin:'http://localhost:4200'
}))



// prse json data
app.use(express.json())

const appMiddleware = (req, res, next) => {
    console.log("condition application specific middleware")
    next()
}
// use middleware
app.use(appMiddleware)


const jwtMiddleware = (req, res, next) => {
    // fetch token
    try {
        token = req.headers['x-access-token']
        // verify token
        const data = jwt.verify(token, 'supersecretkey12345')

        next()
    }

    catch {
        res.status(401).json({
            status: false,
            statusCode: 401,
            message: 'please log in'
        })
    }
}

// bankappserver


// register api solving - asichronous
app.post('/register', (req, res) => {
    dataservice.register(req.body.username, req.body.acno, req.body.password)
        .then(result => {
            res.status(result.statusCode).json(result)
        })

})

// login Api
app.post('/login', (req, res) => {
    dataservice.login(req.body.acno, req.body.pswd)
        .then(result => {
            res.status(result.statusCode).json(result)
        })
})

// deposit Api
app.post('/deposit', jwtMiddleware, (req, res) => {
    dataservice.deposit(req.body.acno, req.body.password, req.body.amt)
    .then(result => {
        res.status(result.statusCode).json(result)
    })
})

// withdraw

app.post('/withdraw', jwtMiddleware, (req, res) => {
    dataservice.withdraw(req.body.acno, req.body.password, req.body.amt)
    .then(result => {
        res.status(result.statusCode).json(result)
    })
})

// get transaction

app.post('/transaction', jwtMiddleware, (req, res) => {
     dataservice.getTransaction(req.body.acno)
     .then(result => {
        res.status(result.statusCode).json(result)
    })})

// user request resolving
// get request
app.get('/', (req, res) => {
    res.send("get reguest")
})
// post request
app.post('/', (req, res) => {
    res.send("post reguest")
})
// put request
app.put('/', (req, res) => {
    res.send("put reguest")
})
// patch request
app.patch('/', (req, res) => {
    res.send("patch reguest")
})
// delet request
app.delete('/', (req, res) => {
    res.send("del reguest")
})



// set up port number the server
app.listen(3000, () => {
    console.log("server started at 3000");
})