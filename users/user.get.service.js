

class UserGetService {
          
    
   async doGetAllPersons( con ) {

    try {
        let readyresult = false;
        let usersfound = [];
      
        await new Promise((res, rej) => {
             
        con.query("SELECT * FROM node_crud_signup_jwt ORDER BY id DESC", function (err, result, fields) {
        if (err) throw err;
        else {
           
              if( result.length > 0 ){
                  console.log( 'Users found in Promise!' );
                  readyresult = true;
                  usersfound  = result;
                  res( true );
                  }
             else {
                  console.log( 'No Users found in Promise!' );
                  readyresult  = false;
                  res( false );
               }
             }
          });
        });
         
        console.log( 'Users found in Service: ' + usersfound  );
        return usersfound;

        } 
        catch (err) {
             console.log(err)
         }
   }


     
  async doGetPerson( con, id ) {
        
    try {
        let hasuser = false;
        let theresult = [];

        await new Promise((res, rej) => {
       
         con.query("SELECT * FROM node_crud_signup_jwt WHERE Id=" + id, function (err, result, fields) {
         if (err) throw err;
         else {
            
             if( result.length === 1 ){
                 console.log( '1 User Found in Service widt ID: ' + id );
                 hasuser = true;
                 theresult = JSON.stringify( result ); 
                 theresult = theresult.substring(1,( theresult.length-1) );
                 res( true );
                 }
            else {
                 console.log( 'No User found in Service !' );
                 hasuser = false;
                 res( false );
              }
            }
         });
   
       });
           
       return theresult;
       } 
       catch (err) {
          console.log(err)
        }
   }


}

module.exports = UserGetService;