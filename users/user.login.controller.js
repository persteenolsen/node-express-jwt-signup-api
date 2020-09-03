const express = require('express');
const router = express.Router();

const DatabaseConfig = require('../db/database.config');
const UserLoginService = require('./user.login.service');

const UserValidate = require('./user.validate');

module.exports = router;


//------------------------------USER LOGIN ---------------------------------------------
router.post('/authenticate', function (req, res, next) {

    console.log('Authentication the User...');
    
    const v = new UserValidate();
    const inputdatavalid = v.validateInputDataLogin( req.body.email, req.body.password );

    if ( inputdatavalid == true ){
    
       const dbconfig = new DatabaseConfig();
       const connectionString = dbconfig.getDBConnectionPool();

       var s = new UserLoginService();
    
       const user = s.authenticate( connectionString, req.body.email, req.body.password );
       console.log("User Object wrapped in a Promise from Login Service - Controller! " + user );

       user.then(( userlogin ) => {
             
           if( userlogin ){
               console.log("Yes, 1 User ready for logging in at the Controller! " );
               res.writeHead(200, {"Content-Type": "application/json"});
               res.end( JSON.stringify( userlogin ));
               }
           else {
                console.log("Ups, No Users ready for login at the Controller! " );
                res.status(400).send( { message: 'You entered wrong Email or Password !'} ); 
               }

        }).catch( error => {
                console.log( "SQL error from Promise displayed in catch - Controller: " + error );
                res.status(400).send( { message: 'The User was not logged in due to an SQL error inside Service !'} );
        });

    // Wrong format of Email / Password
    }
    else {
          console.log("Email or Password have wrong format !");
          res.status(400).send( { message: 'The Email / Password have invalid format !' } );
         } 
 
 }); 