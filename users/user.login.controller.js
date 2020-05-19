const express = require('express');
const router = express.Router();

const DatabaseConfig = require('../db/database.config');
const UserLoginService = require('./user.login.service');

module.exports = router;


//------------------------------USER LOGIN ---------------------------------------------
router.post('/authenticate', function (req, res, next) {

    console.log('Authentication the User...');
    
    const dbconfig = new DatabaseConfig();
    const connectionString = dbconfig.getDBConnectionPool();

    var s = new UserLoginService();
    
    const password = req.body.password;
    const email = req.body.email;

    const User = s.authenticate( connectionString, email, password );

    User.then(( userlogin ) => {
             
        if( userlogin ){
            console.log("Yes, 1 User ready for logging in at the Controller! " );
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end( JSON.stringify( userlogin ));
            }
        else {
             console.log("Ups, No Users ready for login at the Controller! " );
             res.status(400).send( { message: 'You entered wrong Email or Password !'} ); 
            }
        }); 
 
 }); 