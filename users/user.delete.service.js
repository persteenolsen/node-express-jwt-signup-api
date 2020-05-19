

class UserDeleteService {
      
    
  async doDeleteUser( con, id ) {
     
    try {
        let userdeleted = false;
        
        await new Promise((res, rej) => {
     
        con.query("DELETE FROM node_crud_signup_jwt WHERE Id=" + id, function (err, result, fields) {
       if (err) throw err;
       else {
          
           if( result.affectedRows === 1 ){
               console.log( result.affectedRows + " User deleted in Service !");
               userdeleted = true;
               res( true );
               }
          else {
               console.log( "User not deleted in Service !" );
               userdeleted = false;
               res( false );
            }
          }
       });
 
     });
         
     return userdeleted;
     } 
     catch (err) {
        console.log(err)
      }
 }


}

module.exports = UserDeleteService;