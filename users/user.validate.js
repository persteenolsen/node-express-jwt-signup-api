class UserValidate {
    
 // Validate the users input when Logging in and using the modules in this Class
 // Returning TRUE if all input are valid !
 // Note: Validating string lenght before validating using regex to avoid long exetuting time !
 validateInputDataLogin( email, password ){
    
   var allinputvalid = false;
  
   var vemail = false;
   var vpassword = false;
       
    if( email != "" ){
        // vemail = this.ValidateEmail(email);
        vemail = this.ValidateStringLength(email, 8, 25);
        if(vemail)
           // vemail = this.ValidateStringLength(email, 8, 25);
           vemail = this.ValidateEmail(email);
        console.log("Valid Email: " + vemail);
      }
      if( password != "" ){

         // Note: Removing all whitespace to prevent SQL-injection and xss
         // Password and Email dont allowing whitespaces and with limited lengt preventing
         // long input and scripts-tags and sql-injection. The following wont be allowed:
         // 1) DROP TABLE; 
         // 2) OR 10=10
         // 3) <script>alert('Hello');</script>
         password = password.replace(/\s+/g,'');

         vpassword = this.ValidateStringLength(password, 6, 15);
         console.log("Valid Password: " + vpassword);
      } 
   
   if( vemail == true && vpassword == true )
      allinputvalid = true;

   return allinputvalid;

}


 // Validate the users input ( Person ) and using the modules in this Class
 // Returning TRUE if all input are valid !
 // Note: Validating string lenght before validating using regex to avoid long exetuting time !
 validateInputDataCreateRegister(firstname, lastname, email, password){
    
    var allinputvalid = false;
    var vfname = false;
    var vlname = false;
    var vemail = false;
    var vpassword = false;
        

     if( firstname != "" ){
         // vfname = this.ValidateAllLetters(firstname);
         vfname = this.ValidateStringLength(firstname, 2, 15);
         if(vfname)
            // vfname = this.ValidateStringLength(firstname, 2, 15);
            vfname = this.ValidateAllLetters(firstname);
        console.log("Valid firstName: " + vfname);
       }
       if( lastname != "" ){
           // vlname = this.ValidateAllLetters(lastname);
           vlname = this.ValidateStringLength(lastname, 2, 15);
         if(vlname)
            // vlname = this.ValidateStringLength(lastname, 2, 15);
            vlname = this.ValidateAllLetters(lastname);
          console.log("Valid lastName: " + vlname);
         }
     if( email != "" ){
         // vemail = this.ValidateEmail(email);
         vemail = this.ValidateStringLength(email, 8, 25);
         if(vemail)
            // vemail = this.ValidateStringLength(email, 8, 25);
            vemail = this.ValidateEmail(email);
         console.log("Valid Email: " + vemail);
       }
       if( password != "" ){

          // Note: Removing all whitespace to prevent SQL-injection and xss
          // Password and Email dont allowing whitespaces and with limited lengt preventing
          // long input and scripts-tags and sql-injection. The following wont be allowed:
          // 1) DROP TABLE; 
          // 2) OR 10=10
          // 3) <script>alert('Hello');</script>
          password = password.replace(/\s+/g,'');

          vpassword = this.ValidateStringLength(password, 6, 15);
          console.log("Valid Password: " + vpassword);
       } 
    
    if( vfname == true && vlname == true && vemail == true && vpassword == true )
       allinputvalid = true;

    return allinputvalid;

 }


 // Validate the users input ( Person ) and using the modules in this Class
 // Returning TRUE if all input are valid !
  // Note: Validating string lenght before validating using regex to avoid long exetuting time !
 validateInputDataUpdate(firstname, lastname, email, password){
    
   var allinputvalid = false;
   var vfname = false;
   var vlname = false;
   var vemail = false;
   var vpassword = false;
       

    if( firstname != "" ){
        // vfname = this.ValidateAllLetters(firstname);
        vfname = this.ValidateStringLength(firstname, 2, 15);
        if(vfname)
           // vfname = this.ValidateStringLength(firstname, 2, 15);
           vfname = this.ValidateAllLetters(firstname);
       console.log("Valid firstName: " + vfname);
      }
      if( lastname != "" ){
         // vlname = this.ValidateAllLetters(lastname);
         vlname = this.ValidateStringLength(lastname, 2, 15);
         if(vlname)
           // vlname = this.ValidateStringLength(lastname, 2, 15);
           vlname = this.ValidateAllLetters(lastname);
         console.log("Valid lastName: " + vlname);
        }
    if( email != "" ){
        // vemail = this.ValidateEmail(email);
        vemail = this.ValidateStringLength(email, 8, 25);
        if(vemail)
           // vemail = this.ValidateStringLength(email, 8, 25);
           vemail = this.ValidateEmail(email);
        console.log("Valid Email: " + vemail);
      }
     if( password.length === 0 ){
         vpassword = true;
       }   
     else {
           
            vpassword = this.ValidateStringLength(password, 6, 15);
            console.log("Valid Password: " + vpassword);
      } 
   
   if( vfname == true && vlname == true && vemail == true && vpassword == true )
      allinputvalid = true;

   return allinputvalid;

}

    
 ValidateEmail(inputText) {

    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if( inputText.match(mailformat) )
        return true;
    else
        return false;
   }
 
 
 
  ValidateStringLength(inputtxt, minlength, maxlength)
   { 
     var field = inputtxt; 
     var mnlen = minlength;
     var mxlen = maxlength;
 
    if( field.length < mnlen || field.length > mxlen )
       return false;
    else
       return true;
 
    }
 
    ValidateAllLetters(inputtxt)
       { 
         
        inputtxt = inputtxt.replace(/\s+/g,'');
       
       var letters = /^[A-Za-z]+$/;
       if( inputtxt.match(letters) )
          return true;
        else
           return false;
       }

     
       ValidateIsNumber(inputtxt, minlength, maxlength)
        { 
      
         var field = inputtxt; 
         var mnlen = minlength;
         var mxlen = maxlength;
         
         // Note: "inputtxt" NEEDS to be a String !!!!!
         inputtxt =  inputtxt + "";
        
         //console.log("Age validate: " + inputtxt );
              
         var numbers = /^[0-9]+$/;
          if( inputtxt.match(numbers) ){
            if( field >= minlength && field <= maxlength )
              return true;
            else
              return false;
          }
          else
             return false;
       } 
         
    

}

module.exports = UserValidate;