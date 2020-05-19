const express = require('express');
const router = express.Router();

const DatabaseConfig = require('../db/database.config');
const UserGetService = require('./user.get.service');


// routes
router.get('/', getAll);
module.exports = router;


 
 function getAll(req, res, next) {
      
    const dbconfig = new DatabaseConfig();
    const connectionString = dbconfig.getDBConnectionPool();
    var s = new UserGetService();

    const User = s.doGetAllPersons( connectionString );
    User.then(( usersfound ) => {
             
        if( usersfound ){
            console.log("Yes, Number of found Users in Controller: " +  usersfound.length );
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end( JSON.stringify( usersfound ));
            }
        else {
             console.log("Ups, No Users found in Controller! " );
             res.status(400).send( { message: 'Error Getting Users!'} ); 
            }
        }); 
 
}
 

 router.get('/:id', function (req, res, next) {
   
    const dbconfig = new DatabaseConfig();
    const connectionString = dbconfig.getDBConnectionPool();
    var s = new UserGetService();
    
    const User = s.doGetPerson( connectionString, req.params.id );
    User.then(( usersfound ) => {
             
        if( usersfound ){
            console.log("Yes, 1 User found in Controller: " +  usersfound.length );
            res.writeHead(200, {"Content-Type": "application/json"});
            res.end( usersfound );
            }
        else {
             console.log("Ups, No User found in Controller! " );
             res.status(400).send( { message: 'Error Getting the User!'} ); 
            }
        }); 
         
})

