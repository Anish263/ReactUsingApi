import React,{ useState} from 'react';
import RegistrationLink from './RegisterationLink';
import "../styles/form.css"

import '../styles/form.css'
function Login (props){
const [values,setValues]=useState({email:"",password:""})
const[isAuth,setIsAuth]=useState(false);
const[flag,setFlag]=useState(1);

async function loginSubmit(event){
        event.preventDefault();
        let item={...values}
      let result= await  fetch('http://localhost:8000/auth/login', {
         method:"POST",
         headers:{
                "Content-Type":"Application/json"
        },
            body:JSON.stringify(item)
        })
        result=await result.json()
        
            
            if(!result.token){
           setFlag(0);

            
            }
            else {
                setIsAuth(isAuth=>!isAuth);
               
                console.log("MMMM<<<<<<<<",isAuth)
                localStorage.setItem("isAuth",JSON.stringify(true))
                    localStorage.setItem("auth",JSON.stringify(result.token))
                    localStorage.setItem("id",JSON.stringify(result.id))
                    props.history.push('/LoginSuccess/'+result.id);
                            }
                          
}

const handleChange=(event)=>{
    event.preventDefault();
    setValues({
    ...values,
    [event.target.name]:event.target.value
})
}
     
        return (

            
        <div  className="main-container">
            {flag===0 && <div style={{color:"red"}}>Email or Password Wrong </div>}
            Hello
            <div className="center">
            <form className="login-form"onSubmit={loginSubmit}>
                <h1>Login Here...</h1>
                <input type="text" placeholder="Email" name="email"
                value={values.email}
                onChange={handleChange } required/>
                <input type="password" placeholder="Password" value={values.password}name="password" onChange={handleChange} required/>
                <button type="submit">Login</button>
                <RegistrationLink />
            </form>
            </div>

        </div>
         )
         }


export default Login