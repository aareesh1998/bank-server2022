// server creation
// import express
 const express = require('express')

//  import dataservice
 const dataservice=require('./services/data.service')

   // import jsonwebtoken
   const jwt=require('jsonwebtoken')

//  servcer app create using express
const app = express()


// prse json data
app.use(express.json())

const appMiddleware = (req,res,next)=>{
    console.log("condition application specific middleware")
    next()
}
// use middleware
app.use(appMiddleware)


    const jwtMiddleware = (req,res,next)=>{
    // fetch token
    try{
    token = req.headers['x-access-token']
    // verify token
   const data = jwt.varify(token,'supersecretkey12345')
   next()
}
    
catch{
    res.status(401).json({
        status:false,
        statusCode:401,
        message:'please log in'
    })
}
    }

// bankappserver


// register api
app.post('/register',(req,res)=>{
const result = dataservice.register(req.body.username,req.body.acno,req.body.password)
res.status(result.statusCode).json(result)
})

// login Api
app.post('/login',(req,res)=>{
    const result = dataservice.login(req.body.acno,req.body.pswd)
    res.status(result.statusCode).json(result)
    })

    // deposit Api
app.post('/deposit',jwtMiddleware,(req,res)=>{
    const result = dataservice.deposit(req.body.acno,req.body.password,req.body.amt)
    res.status(result.statusCode).json(result)
    })

    // withdraw

    app.post('/withdraw',jwtMiddleware,(req,res)=>{
        const result = dataservice.withdraw(req.body.acno,req.body.password,req.body.amt)
        res.status(result.statusCode).json(result)
        })

        // get transaction
        
    app.post('/transaction',jwtMiddleware,(req,res)=>{
        const result = dataservice.getTransaction(req.body.acno)
        res.status(result.statusCode).json(result)
        })

// user request resolving
// get request
app.get('/',(req,res)=>{
    res.send("get reguest")
})
// post request
app.post('/',(req,res)=>{
    res.send("post reguest")
})
// put request
app.put('/',(req,res)=>{
    res.send("put reguest")
})
// patch request
app.patch('/',(req,res)=>{
    res.send("patch reguest")
})
// delet request
app.delete('/',(req,res)=>{
    res.send("del reguest")
})



// set up port number the server
app.listen(3000,()=>{
    console.log("server started at 3000");
})