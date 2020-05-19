const bcrypt = require("bcryptjs")

class UserUpdateValidateService {

        
   async ValidateMailEditUser( con, id, email ){
       
    try {
        let isemailfree = false;
             
        await new Promise((res, rej) => {
             
        con.query("SELECT email FROM node_crud_signup_jwt WHERE email LIKE '" +  email + "' AND id <>" + id, function (err, result, fields) {
        if (err) throw err;
        else {
              // The USER can only be updated with own or new email not used by any other user !!
              if( result.length === 0 ){
                  console.log( 'Username is free !' );
                  isemailfree = true;
                  res( true );
                  }
             else {
                  console.log( 'Username is not free !' );
                  isemailfree = false;
                  // Note: Could have the value true as well
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

    
   // Perform the functionality for Update the selected person
   doEditUser( con, id, email, password, title, firstname, lastname, role ) {
     
     var sqlStringPassword = "";
     if( password != "" ){
         const salt = bcrypt.genSaltSync(10);
         const hash = bcrypt.hashSync( password, salt);

         sqlStringPassword  += ", passwordhash='" + hash + "'";
         console.log("Password Hash: " + hash ); 
       }
       else
            console.log("Password is Empty!" ); 
       
        var sqlString = "";
        sqlString += "UPDATE node_crud_signup_jwt SET ";
        sqlString += "email='" + email + "', title='" + title + "";
        sqlString += "', firstName='" + firstname + "', lastName='" + lastname + "";
        
        if( (! role ) || role == '' || role === 'undefined' )
            sqlString += "', role='User'"; 
        else
            sqlString += "', role='" + role + "'";      

        sqlString += sqlStringPassword;
        sqlString += " WHERE Id=" + id;
          
        con.query(sqlString, function (err, results, fields) {
            
        if(err) throw err;
        else 
             return results;
        });
             
  }


}

module.exports = UserUpdateValidateService;