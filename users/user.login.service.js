
const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs")


class UserLoginService {
  
 // Note: A User in the format the the React client need !
 // const users = [{ id: 1, email: 'persteen@test.dk', passwordhash: 'mypass123', title: 'Mr', role: 'Admin', firstName: 'Per Steen', lastName: 'Olsen' }];

   
 async authenticate( con, email, password ) {

      try {
           let hasuser = false;
           let userWithJwt = [];
      
           await new Promise((res, rej) => {
              
           con.query("SELECT id, title, firstName, lastName, role, email, passwordhash, isVerified FROM node_crud_signup_jwt where email LIKE '" + email + "'" , function (err, result, fields) {
           if (err) throw err;
            else {
                   
                 if( result.length === 1 ){

                     if( bcrypt.compareSync( password, result[0].passwordhash) ){
                                               
                          console.log( '1 User found in Service with Email: ' + email  );
                                                   
                           var userstring = JSON.stringify( result );
                           userstring = userstring.substring(1,(userstring.length-1));
                             
                           var user = JSON.parse( userstring );
                                       
                           const token = jwt.sign({ sub: user.id }, config.secret );
                           const { passwordhash, ...userWithoutPassword } = user;
                               
                           let jwttoken = [];
                           jwttoken.token = token;
                          
                            userWithJwt = { ...userWithoutPassword, ...jwttoken };
                            console.log( userWithJwt );

                            hasuser = true;
                            res( true );  
                                        
                          }
                          else {
                                console.log('Users Password does not match in Service !');
                                hasuser = false;
                                userWithJwt = null;
                                res( false );  
                             }
                         }

                   else {
                         console.log( 'Users Email does not match in Service !' );
                         hasuser = false;
                         userWithJwt = null;
                         res( false );
                     }
                   }
                });
          
              });
                  
              return  userWithJwt;

              } 
              catch (err) {
                 console.log(err)
               }
      }   

}

module.exports = UserLoginService;