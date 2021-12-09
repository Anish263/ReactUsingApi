const validation=(userInfo)=>{
    let errors={};
    
    console.log('.....XXX',errors);
    const emailRegex = RegExp(
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
      );
      if(!userInfo.email){
        errors.email="Email is required."
    }else if(!emailRegex.test(userInfo.email)){
        errors.email="Email should be valid."
    }

   if(!userInfo.username){
        errors.username="Name is Required"
    }
    else if( userInfo.username.length<5){
        errors.username="length should be greator than 5"
    }
    

if(!userInfo.password){
    errors.password="password is required."

}else if(userInfo.password.length<5){
    errors.password="description should be greator than 5"
}
if(!userInfo.description){
    errors.description="description is required."

}else if(userInfo.description.length<5){
    errors.description="description should be greator than 5"
}
console.log('.....XXX',errors);
return errors;
}
export default validation;