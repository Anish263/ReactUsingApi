import React,{ useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './validation.js'
// import { Link } from 'react-router-dom';

import "../styles/form.css"
import validation from './validation.js';

function  AddUser(props)  {
const[flag,setFlag]=useState(1);
const[display,setDisplay]=useState(1);
let token=localStorage.getItem("auth");
const [values,setValues]=useState({
     email:""
    ,username:""
    ,password:""
    ,description:""
})

const [errors,setError]=useState({errors:null})
useEffect(()=>{
    if(!token){
        setFlag(0)
    setDisplay(0)
    }
},[])

  async function register(event){
 
        event.preventDefault();
       
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
         Object.keys(validation(values)).length===0 && props.history.push('/users'); 
        
        
        
    }
 const   logoutHandler = () => {
        
        localStorage.removeItem('auth');
        localStorage.removeItem('id');
        
        console.log("token",localStorage.getItem("auth"));
      };
const handleChange=(event)=>{
    event.preventDefault();
    setValues({
    ...values,
    [event.target.name]:event.target.value
})
}
     
        return <div>
           {flag===0 &&<div> <h1 className="error">Need to login first</h1> <Link to="/Login">Click here to Login..</Link> </div>}
           {display===1 && <div>
            <ul>
  <Link to="/AddUser"> <li><a  href="/AddUser">AddUser</a></li></Link>
 
 
  <Link to="/"><li className="Logout"><a href="/" onClick={logoutHandler}>Logout</a></li></Link>

  <Link to="/users"> <li><a href="/users">Users</a></li> </Link>


</ul>
<div className="main-container">
            <form className="form" onSubmit={register}> 
                <h1>Add User </h1>
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
                
             <button type="submit">AddUser</button>
              
            </form>
        </div>
        </div>}  </div>;
    }


export default AddUser