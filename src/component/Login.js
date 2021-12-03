import React,{Component} from 'react';
import RegistrationLink from './RegisterationLink';
import "../styles/form.css"

import '../styles/form.css'
class Login extends Component{
     constructor(){
         super()
        // let x=this.props.user;
        //  console.log("login>>>>",x);
        
      this.loginSubmit=this.loginSubmit.bind(this);
    }

  
loginSubmit(event){
        event.preventDefault();
        fetch('http://localhost:8000/auth/login', {

            method:"POST",
                headers:{
                "Content-Type":"Application/json"
        },
            body:JSON.stringify(this.state)
        }).then((result)=>{
            result.json().then((resp)=>{
            console.log(resp.token);
            if(!resp.token){
            alert('No user found');
            this.props.history.push('/');
            }
            else {
                    localStorage.setItem("auth",JSON.stringify(resp.token))
                    localStorage.setItem("id",JSON.stringify(resp.id))
                    this.props.history.push('/LoginSuccess/'+resp.id);
                            }
                        })
                    })
                    
            .catch(err => {
                        console.log(err);
                        alert('Invalid User')
                    })
    
}
    render() { 
        return (
        <div  className="main-container">
            Hello
            <form className="login-form" onSubmit={this.loginSubmit}>
                <h1>Login Here...</h1>
                <input type="text" placeholder="Email" name="email" onChange={(e) => {this.setState({email:e.target.value})} } required/>
                <input type="password" placeholder="Password" name="password" onChange={(e) => {this.setState({password:e.target.value})} } required/>
                <button type="submit">Login</button>
                <RegistrationLink />
            </form>
        </div>
         ) }
}

export default Login