const bcrypt = require("bcryptjs")


class UserCreateValidateService {
     
     
  async ValidateMailCreateUser( con, email ){
       
    try {

        let isemailfree = false;
           
        await new Promise((res, rej) => {
           
        con.query("SELECT email FROM node_crud_signup_jwt WHERE email LIKE '" +  email + "'", function (err, result, fields) {
        if (err) throw err;
        else{
         
         // The USER can only be updated with own or new email not used by any other user !!
         if( result.length === 0 ){
             console.log( 'Username is free !' );
             isemailfree = true;
             res( true );
             }
         else{
              console.log( 'Username is not free !' );
              isemailfree = false;
              res( false );
             }
         }
       });
  
     });
 
     return isemailfree;

   } 
   catch (err) {
        console.log(err)
     }
 }



 doCreateUser( con, email, password, title, firstname, lastname, role ) {

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync( password, salt );
    var datecreated = "";
    datecreated = new Date().toISOString();

    var sqlString = "";
    sqlString += "INSERT INTO node_crud_signup_jwt ";
      
    sqlString += " (email, title, firstName, lastName, role, passwordhash, ";
    sqlString += " isVerified, dateCreated, acceptterms ";

    sqlString += " ) values( ";

    sqlString += "'" + email + "','" + title + "";
    sqlString += "', '" + firstname + "', '" + lastname + "";
      
    if( (! role ) || role == '' || role === 'undefined' )
         sqlString += "', 'User";
    else
         sqlString += "', '" + role + "";

     sqlString += "', '" + hash + "";
     sqlString += "', 'true', '" + datecreated + "', 'true'";
     
     con.query(sqlString + " )", function (err, results, fields) {
     if(err) throw err;
     else
         return results;
     });
     
  }   

 

}

module.exports = UserCreateValidateService;