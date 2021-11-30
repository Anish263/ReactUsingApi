import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../styles/home.css'
class Home extends Component{
    constructor() {
        super();
        this.state = {
            id:Number,
            loginuser: {}
        };
    }

    componentDidMount() {
        let path = window.location.href;
        console.log(path);
        path = Number(path.split("/")[4]);
        console.log(path);
        let user = this.props.users.filter((user) => user.id === path);
        console.log(this.props.users);
        console.log(...user);
        this.setState((state) => ({
            loginuser: user[0],id:path
        }));
    }
    
    render() { 
        return <div>

<ul>
  <li><a  href="/">Home</a></li>
 <Link  to={{

pathname:`/Update/${this.state.id}`,



}}> <li className="a">Profile</li></Link>
 
  <Link to="/"><li className="Logout"><a href="/">Logout</a></li></Link>

  <Link to="/users"> <li><a href="/users">Users</a></li> </Link>


</ul>
            <div className="header-body">
                <h3>Hi, {this.state.loginuser.fullName}</h3>
               
                
               

      
            </div>
        </div>;
    }


}
export default Home