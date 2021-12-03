
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
            loggedinUser: {}
        }
        this.updateUser=this.updateUser.bind(this)
        this.handleChange=this.handleChange.bind(this)
        this.deleteUser=this.deleteUser.bind(this);
    }


    componentDidMount() {
        let url = window.location.href;
        let id = Number(url.split("/")[4]);
        let token = localStorage.getItem('auth');
fetch(`http://localhost:8000/auth/check/${id}`, {
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                Authorization:'Bearer '+JSON.parse(token)
            }
        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp);
                this.setState((state) => ({
                 loggedinUser:resp.user,
                id:resp.user.id
    }))
                })
        })
        .catch(err => {
            console.log(err);
            alert('Invalid User')
        })
    }
    deleteUser() {
        let url = window.location.href;
        let id = Number(url.split("/")[4]);
        let token = localStorage.getItem('auth');
        fetch(`http://localhost:8000/auth/delete/${id}`, {
            method:"DELETE",
            headers:{
                Authorization:'Bearer '+JSON.parse(token)
            },
        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp);
                alert('user deleted');
                this.props.history.push('/');
            })
        })
        .catch(err => {
            console.log(err);
    alert('Invalid User')
               })

    }


    handleChange(event){
       // console.log(event.target.value);
        this.setState({
            value: event.target.value})
    }
updateUser(event){
    event.preventDefault();
    let url = window.location.href;
        let id = Number(url.split("/")[4]);
        let token = localStorage.getItem('auth');
        fetch(`http://localhost:8000/auth/update/${id}`, {
            method:"PUT",
            headers:{
                'Content-Type': 'application/json',
                Authorization:'Bearer '+JSON.parse(token)
            },
            body:JSON.stringify(this.state.loggedinUser)
        }).then((result)=>{
            result.json().then((resp)=>{
                console.log(resp);
                alert('user updated login again to see changes');
                this.props.history.push('/LoginSuccess/'+id);
            })
       })
        .catch(err => {
        console.log(err);
           alert('Invalid User')
        })
}
    render(){
       
return <div className="login-Container">
           
            <ul><li><a  href="/">Home</a></li>
 <Link  to={{ pathname:`/Update/${this.state.id}`,}}>
      <li className="a">Profile</li></Link>
 
  <Link to="/"><li className="Logout"><a href="/">Logout</a></li></Link>

  <Link to="/users"> <li><a href="/users">Users</a></li> </Link>

  
</ul>
Welcome to profile
            <form className="login-Container-form" name="profile">
               
                    
                
               
                <div>
                    <strong>User Name:</strong>
                    <input  type="text" placeholder="Username" name="username"defaultValue={this.state.loggedinUser && this.state.loggedinUser.username}  onChange={(e) => this.setState((state) => {this.state.loggedinUser.username = e.target.value})} required/>                </div>

                

                
                <div>
                <strong>Description:</strong>
                <input  type="text" placeholder="About Yourself" name="description" defaultValue={this.state.loggedinUser && this.state.loggedinUser.description}  onChange={(e) => this.setState((state) => {this.state.loggedinUser.description = e.target.value})} required/>
                </div>
                
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