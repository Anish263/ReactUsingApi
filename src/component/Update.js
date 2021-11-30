
import React from 'react';
import { Component } from "react";
import { Link } from 'react-router-dom';
import Home from './Home'
import '../styles/Profile.css';
import '../styles/home.css'
class Update extends Component{

    constructor() {
        super();
        this.state = {
            id:Number,
            loginuser: {}
        }
        this.updateUser=this.updateUser.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.deleteUser=this.deleteUser.bind(this);
    }


    componentDidMount() {
        let path = window.location.href;
        path = Number(path.split("/")[4]);
        console.log(this.props.users);
        let users=this.props.users
        console.log(users);
        let user = users.filter((user) => user.id === path);
        console.log(user[0]);
        this.setState({
            loginuser: user[0],
            id:path
        });
    }
    deleteUser() {
        this.props.onDelete(this.state.id)

    }


    handleChange(event){
       // console.log(event.target.value);
        this.setState({
            value: event.target.value})
    }
updateUser(event){
    event.preventDefault();
console.log(this.state.loginuser);
//this.props.onUpdate(this.state.loginuser,this.state.id)
alert("helllo");
this.props.history.push('/login')
}
    render(){
       
return <div className="login-Container">
            Welcome to profile
            <ul>
  <li><a  href="/">Home</a></li>
 <Link  to={{

pathname:`/Update/${this.state.id}`,



}}> <li className="a">Profile</li></Link>
 
  <Link to="/"><li className="Logout"><a href="/">Logout</a></li></Link>

  <Link to="/users"> <li><a href="/users">Users</a></li> </Link>


</ul>
            <form className="login-Container-form" name="profile">
                <div>
                    <strong>Full Name:</strong>
                    <input type="text" name="fullName" defaultValue={this.state.loginuser && this.state.loginuser.fullName} onChange={(e) => this.setState((state) => {this.state.loginuser.fullName = e.target.value})} required/>
                </div>
 
                <div>
                    <strong>Email:</strong>
                    <input type="email" name="email" defaultValue={this.state.loginuser && this.state.loginuser.email} onChange={(e) => this.setState((state) => {this.state.loginuser.email = e.target.value})} required/>
                </div>
               
                <div>
                    <strong>User Name:</strong>
                    <input type="text" name="userName" defaultValue={this.state.loginuser.userName} onChange={(e) => this.setState((state) => {this.state.loginuser.userName = e.target.value})} required/>
                </div>

                <div>
                    <strong>Password:</strong>
                    <input type="password" name="password" defaultValue={this.state.loginuser.password} onChange={(e) => this.setState((state) => {this.state.loginuser.password = e.target.value})} required/>
                </div>

                
                <div></div>
                
                <div>
                    <button type="submit" onClick={this.updateUser}>Update</button>
                </div>
               
                <div>
                    <Link to="/Login">
                        <button type="submit" onClick={this.deleteUser} >Delete User</button>
                    </Link>
                </div>

            </form>




        </div>
    }
}
export default Update