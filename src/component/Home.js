import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../styles/home.css'
class Home extends Component{
    constructor() {
        super();
        this.state = {
            id:Number,
            loginuser: {},
            username:''
        };
    }

    componentDidMount() {
        let url = window.location.href;
        let id = Number(url.split("/")[4]);
        let token = localStorage.getItem('auth');
        console.log(JSON.parse(token));
        fetch(`http://localhost:8000/auth/check/${id}`, {
            method:"GET",
            headers:{
                'Content-Type': 'application/json',
                Authorization:'Bearer '+JSON.parse(token)
}}
).then((result)=>{
    result.json().then((resp)=>{
        console.log(resp);
        this.setState((state) => ({
          username:resp.user.username,
             id:resp.user.id
        }))
    })
})
.catch(err => {
    console.log(err);
alert('Invalid User')

})

    }
    
    render() { 
        return <div>

<ul>
  <li><a  href="/">Home</a></li>
 <Link  to={{ pathname:`/Update/${this.state.id}`}}>
     <li className="a">Profile</li></Link>
 
  <Link to="/"><li className="Logout"><a href="/">Logout</a></li></Link>

  <Link to="/users"> <li><a href="/users">Users</a></li> </Link>


</ul>
            <div className="header-body">
                <h3>Hi, {this.state.username}</h3>
               
                
               

      
            </div>
        </div>;
    }


}
export default Home