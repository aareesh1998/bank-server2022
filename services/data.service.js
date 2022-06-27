  
  // import jsonwebtoken
  const jwt=require('jsonwebtoken')
  
  
  
  
  // database
   db = {
    1000:{"acno":1000,"username":"Neer","password":1000,"balance":5000,transaction:[]},
    1001:{"acno":1001,"username":"Lalitha","password":1001,"balance":3000,transaction:[]},
    1002:{"acno":1002,"username":"Aareesh","password":1002,"balance":9000,transaction:[]}

  }

//   register
var register=(username, acno, password)=>{
  
    if(acno in db){
      return {
        status:false,
        message:"already register  please login....!",
        statusCode:401
      }
    }
    else{
      // insert in db
      db[acno]={
        acno,
        username,
        password,
        "balance":0,
        transaction:[]
    
      }
      console.log(db)
   
    
      return {
        status:true,
        message:"register successfully",
        statusCode:200
      }
    }
    }


  // login

  var login=(acno,pswd)=>{

   
    if(acno in db){
      if(pswd==db[acno]["password"]){
        
        currentUser=db[acno]["username"]
        currentAcno=acno


        // token generate
const token=jwt.sign({
  //store the account number inside the token
  currentAcno:acno
},'supersecretkey12345')


       
        return {
          status:true,
          message:"login successfully",
          statusCode:200,
          currentUser,
          currentAcno,
          token
        }


      }
      else{
        return {
          status:false,
          message:"incorrect password",
          statusCode:401
        }
      }
    }
else{
  return {
    status:false,
    message:"user not exist!!!",
    statusCode:401
  }
}
  }

// deposit
 var deposit=(acno,password,amt)=>{
   
    var amount=parseInt(amt)
    if(acno in db){
  
      if(password== db[acno]["password"]){
        db[acno]["balance"]+=amount
        db[acno].transaction.push({
          type:"CREDIT",
          amount:amount
        })
        
   
        return {
          status:true,
          message:amount+"successfully deposited...new balance "+db[acno]["balance"],
          statusCode:200
        }
  
      }
      else{
        return {
          status:false,
          message:"incorrectpassword",
          statusCode:401
        }
      }
  
    }
    else{
      return {
        status:false,
        message:"user doesnot exist!!!!",
        statusCode:401
      }
    }
  
    
    
  }



  // withdraw

var withdraw=(acno,password,amt)=>{
 
  var amount=parseInt(amt)
  if(acno in db){

    if(password== db[acno]["password"]){
      if(db[acno]["balance"]>amount){
        db[acno]["balance"]-=amount
        db[acno].transaction.push({
          type:"DEBIT",
          amount:amount
        })
   

      

        return {
          status:true,
          message:amount+"successfully debited...new balance "+db[acno]["balance"],
          statusCode:200
        }

      }
      else{
     
        return {
          status:false,
          message:"insufficient balance",
          statusCode:411
        }

    }
  }
    else{
  
      return {
        status:false,
        message:"incorrectpassword",
        statusCode:400
      }
    }

  }

  else{
   
    return {
      status:false,
      message:"user doesnot exist!!!!",
      statusCode:401
    }
  }
}


//transaction history
  
var getTransaction=(acno)=>{

  if(acno in db){
  return {
    status:true,
    statusCode:200,
    transaction:db[acno].transaction
  }
  
  }
  else{
    return {
      status:false,
      message:"user doesnot exist!!!!",
      statusCode:400
      
    }

  }
}

  


    // export
    module.exports={
        register,
        login,
        deposit,
        withdraw,
        getTransaction
    }



    
