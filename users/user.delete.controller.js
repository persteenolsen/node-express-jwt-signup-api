const express = require('express');
const router = express.Router();

const DatabaseConfig = require('../db/database.config');
const UserDeleteService = require('./user.delete.service');

module.exports = router;


router.delete('/:id', function (req, res, next) {
      
    const dbconfig = new DatabaseConfig();
    const connectionString = dbconfig.getDBConnectionPool();
    var s = new UserDeleteService();

    const User = s.doDeleteUser( connectionString, req.params.id );
    User.then(( userdeleted ) => {
             
        if( userdeleted ){
            console.log("Yes, 1 User deleted in Controller: " +  userdeleted );
            res.status(200).send( { message: 'The User was deleted!'} ); 
            }
        else {
             console.log("Ups, No User deleted in Controller! " );
             res.status(400).send( { message: 'Error Deleting the User!'} ); 
            }
        }); 

})

