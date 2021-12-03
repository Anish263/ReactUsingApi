import React, { Component } from 'react';

import '../styles/users.css'
import '../styles/home.css'
import { Link } from 'react-router-dom';
class User extends Component {
    constructor() {
        super();
        this.state = {
            users:[]
        }
    }
    componentDidMount(){
        fetch('http://localhost:8000/auth/fetchall/', {
                method:"GET",
                headers:{
                    'Content-Type': 'application/json',
                }
            }).then((result)=>{
                result.json().then((resp)=>{
                    this.setState((state) => ({
                      users:resp.users
                    }))
                })   
            })
    .catch(err => {
        console.log(err);
           alert('Invalid')
   })
    }
    render() { 
        return <div>
            <ul>
  <li><a  href="/">Home</a></li>
 
 
  <Link to="/"><li className="Logout"><a href="/">Logout</a></li></Link>

  <Link to="/users"> <li><a href="/users">Users</a></li> </Link>


</ul>
            <h3> All users </h3>
            <table>
                <thead>
                    <th>Username</th>
                   
                    <th>Email</th>
                    <th>Description</th>
                </thead>
                <tbody>
                {this.state.users.map((user, index) => <tr key={index}>
                    <td>{user.username}</td>
                   
                    <td>{user.email}</td>
                    <td>{user.description}</td>
                </tr>)}
                </tbody>
            </table>
         
        </div>;
    }
}
 
export default User;