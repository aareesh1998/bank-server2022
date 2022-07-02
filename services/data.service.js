
// import jsonwebtoken
const jwt = require('jsonwebtoken')

// import db.js
const db = require('./db')


// database
//  db = {
//   1000:{"acno":1000,"username":"Neer","password":1000,"balance":5000,transaction:[]},
//   1001:{"acno":1001,"username":"Lalitha","password":1001,"balance":3000,transaction:[]},
//   1002:{"acno":1002,"username":"Aareesh","password":1002,"balance":9000,transaction:[]}

// }

//   register
const register = (username, acno, password) => {
  return db.User.findOne({ acno }).then(user => {
    if (user) {
      return {
        status: false,
        message: "already register  please login....!",
        statusCode: 401
      }
    }
    else {

      // insert in db
      const newUser = new db.User({
        acno,
        username,
        password,
        balance: 0,
        transaction: []
      })
      newUser.save()
      return {
        status: true,
        message: "register successfully",
        statusCode: 200
      }
    }

  })
}





// login

var login = (acno, pswd) => {

  return db.User.findOne({
    acno,
    password: pswd
  }).then(user => {
    if (user) {

      currentUser = user.username
      currentAcno = acno

      // token generate
      var token = jwt.sign({
        //store the account number inside the token
        currentAcno: acno
      }, 'supersecretkey12345')

      return {
        status: true,
        message: "login successfully",
        statusCode: 200,
        currentUser,
        currentAcno,
        token
      }

    }
    else {
      return {
        status: false,
        message: "invalid account number or password",
        statusCode: 401
      }
    }
  })

}

// deposit
var deposit = (acno, password, amt) => {
  var amount = parseInt(amt)
  return db.User.findOne({
    acno,
    password
  }).then(user => {
 if(user){
  user.balance += amount
  user.transaction.push({
    type: "CREDIT",
    amount: amount
  })
  user.save()
 return {
    status: true,
    message: amount + "successfully deposited...new balance " + user.balance,
    statusCode: 200
  }
 } 
 else{
  return {
    status: true,
    message: "invalid accountnumber and or password!!!",
    statusCode: 200
  }
 }  
  })


}



// withdraw

var withdraw = (acno, password, amt) => {

  var amount = parseInt(amt)
  return db.User.findOne({
    acno,
    password
  }).then(user => {
 if(user){
if(user.balance>amount){
  user.balance -= amount
  user.transaction.push({
    type: "DEBITED",
    amount: amount
  })
  user.save()
 return {
    status: true,
    message: amount + "successfully debited...new balance " + user.balance,
    statusCode: 200
  }
}
else{
  return {
    status: false,
    message: "insufficient balance...!!!!",
    statusCode: 400
  }
}


 } 
 else{
  return {
    status: false,
    message: "invalid accountnumber and or password!!!",
    statusCode: 401
  }
 }  
  })


}


//transaction history

var getTransaction = (acno) => {

  return db.User.findOne({
    acno
  }).then(user=>{
    if(user){
      return {
        status: true,
        statusCode: 200,
        transaction:user.transaction
      }
    }
    else{
      return {
        status: false,
        message: "user doesnot exist!!!!",
        statusCode: 400
  
      }
    }
  })

}




// export
module.exports = {
  register,
  login,
  deposit,
  withdraw,
  getTransaction
}




