const express = require('express');
const router = express.Router();

const DatabaseConfig = require('../db/database.config');
const UserRegisterService = require('./user.register.validate.service');
const UserValidate = require('./user.validate');


module.exports = router;


//------------------------------USER REGISTER---------------------------------------------
router.post('/register', function (req, res, next) {
  
    const v = new UserValidate();
    const inputdatavalid = v.validateInputDataCreateRegister(req.body.firstName, req.body.lastName, req.body.email, req.body.password );

    // If all user data are valid add the User
    if ( inputdatavalid == true ){
            
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
                  res.status(400).send( { message: 'The User was not registered because the Email is already in use !'} );
                  }     
                               
            }).then(( userregistered ) => {
                
                // Note: Here verification email could be send because of the fact that the email was not
                // used by another User and the User was registered successfully !
                // For now a 200 status code is send back to the client CLIENT :-) 
                if( userregistered ){ 
                     console.log("The User was registered - inside the Controller second THEN: " + userregistered );
                     res.status(200).send( { message: 'The User was registered successfully !' } );  
                    }
                else 
                     console.log("The User was not registered - inside the Controller second THEN: " + userregistered );
                   
            }).catch( error => {
               console.log( "SQL error from Promise displayed in catch - Controller: " + error );
               res.status(400).send( { message: 'The User was not registered due to an SQL error inside Service !'} );
            });
         
         }
    else {
         console.log("The User was not registered because of wrong input values !");
         res.status(400).send( { message: 'The User was not registered because of wrong input values !' } );
        } 

 }); 


