const express = require('express');
const router = express.Router();

const DatabaseConfig = require('../db/database.config');
const UserRegisterService = require('./user.register.service');
const UserValidate = require('./user.validate');


module.exports = router;


//------------------------------USER REGISTER---------------------------------------------
router.post('/register', function (req, res, next) {
  
    const v = new UserValidate();
    const inputdatavalid = v.validateInputDataCreateRegister(req.body.firstName, req.body.lastName, req.body.email, req.body.password );

    // If all user data are valid add the User
    if ( inputdatavalid == true ){
            
        let registereduser = false;
         const dbconfig = new DatabaseConfig();
         const connectionString = dbconfig.getDBConnectionPool();
         var s = new UserRegisterService();
        
         // Consuming Promises: First a function to check if the email is already used by another User
         let promisevalidate = s.ValidateMailRegisterUser( connectionString, req.body.email );
         promisevalidate.then(( isemailfree ) => {
                         
            // Chaining Promises: If the email is free try to register the User and if the User 
            // was registered  return true to the next THEN
            if( isemailfree ){
                 console.log("The User email is free - inside the Controller first THEN: " + isemailfree );
                 userregistered = s.doRegisterUser( connectionString, req.body.email, req.body.password, req.body.title, req.body.firstName, req.body.lastName, req.body.role );
                 return userregistered;
                 }
             else {
                  console.log("The User email is NOT free - inside the Controller first THEN: " + isemailfree );
                  // Note: Insted of return false a response could be sent to the client about email not free
                  // res.status(400).send( { message: 'The User was not registered because of wrong Email!'} );
                  return false;
                 }     
                               
            }).then(( userregistered ) => {
                
                // Note: Here verification eemail could be send because of the fact that the email was not
                // used by another User and the User was registered successfully !
                // For now a 200 status code is send back to the client CLIENT :-) 
                if( userregistered ){ 
                     console.log("The User was registered - inside the Controller second THEN: " + userregistered );
                     res.status(200).send( { message: 'The User was registered !' } );  
                    }
                else {
                     console.log("The User was not registered - inside the Controller second THEN: " + userregistered );
                     res.status(400).send( { message: 'The User was not registered !'} );
                    }
            });
         
         }
    else {
         console.log("The User was not registered because of wrong input values !");
         res.status(400).send( { message: 'The User was not registered because of wrong input values !' } );
        } 

 }); 


