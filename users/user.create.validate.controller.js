const express = require('express');
const router = express.Router();

const UserCreateValidateService = require('./user.create.validate.service');
const DatabaseConfig = require('../db/database.config');

const UserValidate = require('./user.validate');

module.exports = router;


router.post('/', function (req, res, next) {
  
    const v = new UserValidate();
    const inputdatavalid = v.validateInputDataCreateRegister(req.body.firstName, req.body.lastName, req.body.email, req.body.password );

    if ( inputdatavalid == true ){
            
         const dbconfig = new DatabaseConfig();
         const connectionString = dbconfig.getDBConnectionPool();
         var s = new UserCreateValidateService();
        
         const User = s.ValidateMailCreateUser( connectionString, req.body.email );
         User.then(( isemailfree ) => {
            
           if( isemailfree ){
               console.log("Yes, User is ok: " + isemailfree );
               const createuser = s.doCreateUser( connectionString, req.body.email, req.body.password, req.body.title, req.body.firstName, req.body.lastName, req.body.role );
               res.status(200).send( { message: 'The User was created!'} ); 
               }
           else {
                console.log("Ups, User not OK: " + isemailfree );
                res.status(400).send( { message: 'Error creating User: The Email is not valid!'} ); 
               }
           }); 

         }
    else {
         console.log("The User are not valid...");
         res.status(400).send( { message: 'Error creating User: You need to enter valid values!'} );
        } 

}); 
