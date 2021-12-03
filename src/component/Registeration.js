import React,{Component} from 'react';
// import { Link } from 'react-router-dom';
import LoginLink from "./LoginLink"
import "../styles/form.css"
function Registeration(props) {
    

  const register=(event)=>{
        event.preventDefault();

        fetch('http://localhost:8000/auth/signup', {
             method:"PUT",
             headers:{  "Content-Type":"Application/json"
             },
        body:JSON.stringify(this.state)
    }).then((result)=>{
         result.json().then((resp)=>{
         console.log(resp);
                 localStorage.setItem("auth",JSON.stringify(resp.token))
         this.props.history.push('/Login');
            })

        }) .catch(err => {

            console.log(err);

            alert(err.data[0].msg);

        })
    }

     
        return <div className="main-container">
            <form className="form" onSubmit={register}> 
                <h1>Welcome </h1>
                <input type="email" placeholder="email" name="email" onChange={(e) => {this.setState({email:e.target.value})} } required/>
                <input type="text" placeholder="username" name="username" onChange={(e) => {this.setState({username:e.target.value})}} required/>
                <input type="password" placeholder="password" name="password" onChange={(e) => {this.setState({password:e.target.value})} }required/>
                <input type="text" placeholder="description" name="description" onChange={(e) => {this.setState({description:e.target.value})} }required/>
             <button type="submit">Register</button>
              <LoginLink/>
            </form>
        </div>;
    }

export default Registeration