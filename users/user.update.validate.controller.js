const express = require('express');
const router = express.Router();

const UserUpdateValidateService = require('./user.update.validate.service');
const DatabaseConfig = require('../db/database.config');

const UserValidate = require('./user.validate');

module.exports = router;
 

router.put('/:id', function (req, res, next) {
    
    const v = new UserValidate();
    const inputdatavalid = v.validateInputDataUpdate(req.body.firstName, req.body.lastName, req.body.email, req.body.password );

    if ( inputdatavalid == true ){
            
         const dbconfig = new DatabaseConfig();
         const connectionString = dbconfig.getDBConnectionPool();
         var s = new UserUpdateValidateService();

         const User = s.ValidateMailEditUser( connectionString, req.params.id, req.body.email )
         User.then(( isemailfree ) => {
            
           if( isemailfree ){
               console.log("Yes, User is ok: " + isemailfree );
               //const updateuser = s.doEditUser( req, res, connectionString, req.params.id );
               const updateuser = s.doEditUser( connectionString, req.params.id, req.body.email, req.body.password, req.body.title, req.body.firstName, req.body.lastName, req.body.role );
               
               res.status(200).send( { message: 'The User was updated!'} ); 
               }
           else {
                console.log("Ups, User not OK: " + isemailfree );
                res.status(400).send( { message: 'The Email is not valid for this User!'} ); 
               }
           }); 

         }
    else {
         console.log("The User are not valid...");
         res.status(400).send( { message: 'Error updating User: You need to enter valid values!' } );
        } 
      
 }) 
