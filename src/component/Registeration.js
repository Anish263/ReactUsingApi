import React,{ useState} from 'react';
import './validation.js'
// import { Link } from 'react-router-dom';
import LoginLink from "./LoginLink"
import "../styles/form.css"
import validation from './validation.js';
function  Registeration(props)  {
    
     
     localStorage.clear()
const [values,setValues]=useState({
     email:""
    ,username:""
    ,password:""
    ,description:""
})

const [errors,setError]=useState({errors:null})

  async function register(event){
        event.preventDefault();  localStorage.clear()
     setError(validation(values))
        
       
        let item={...values}
        
        console.log(errors)
        let result=await fetch('http://localhost:8000/auth/signup', {
             method:"PUT",
             headers:{  "Content-Type":"Application/json"
             },
            body:JSON.stringify(item)
            })
            result=await result.json() 
           
        localStorage.setItem("user-info",JSON.stringify(result)) 
    console.log(validation(values))
         Object.keys(validation(values)).length===0 &&  props.history.push('/Login'); 
        
        
        
    }
const handleChange=(event)=>{
    event.preventDefault();
    setValues({
    ...values,
    [event.target.name]:event.target.value
})
}
     
        return <div className="main-container">
            <form className="form" onSubmit={register}> 
                <h1>Welcome </h1>
                <input type="email"
                 placeholder="Email" 
                 name="email"
                 value={values.email}
                 onChange={handleChange }
                 />
                  {errors.email && <p className="error">{errors.email}</p>}
                
                <input type="text" 
                placeholder="Username"
                 name="username" 
                 onChange={handleChange}
                 value={values.username}
                  />
{errors.username && <p className="error">{errors.username}</p>}
               
                <input type="password"
                 placeholder="Password" 
                 name="password" 
                 onChange={handleChange }
                 value={values.password}
                 />
{errors.password && <p className="error">{errors.password}</p>}
                 
                <input type="text"
                placeholder="About"
                 name="description" 
                 onChange={handleChange} 
                 value={values.description}
                 />
{errors.description && <p className="error">{errors.description}</p>}
                
             <button type="submit">Register</button>
              <LoginLink/>
            </form>
        </div>;
    }


export default Registeration