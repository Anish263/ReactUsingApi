import React, { Component } from 'react';

import '../styles/users.css'
import '../styles/home.css'
import { Link } from 'react-router-dom';
import {Popover  } from 'react-tiny-popover';

class User extends Component {
    constructor() {
        super();
        
        this.state = {
            users:[],
            pop:false,
            filterUsers:[],
            singleuser:{},
            flag:1,
            display:1
        }
        this.handleClick=this.handleClick.bind(this)
        this.handleHide=this.handleHide.bind(this)
        this.handleSearch=this.handleSearch.bind(this)
        this.deleteUser=this.deleteUser.bind(this)
    }
   componentDidMount(){
    const token=localStorage.getItem("auth");
    
    if(token){
        fetch('http://localhost:8000/auth/fetchall/', {
                method:"GET",
                headers:{
                    'Content-Type': 'application/json',
                }
            }).then((result)=>{
                result.json()
                .then((resp)=>{
                    this.setState((state) => ({
                      users:resp.users,
                      filterUsers:resp.users
                    }))
                })   
            })
    .catch(err => {
        console.log(err);
           alert('Invalid')
   })
    
        
    }else{
        this.setState((state)=>({
            flag:0,
        display:0}))
        
        }}
    handleClick(id){
        let u = this.state.users.filter((user) => user.id === id)
        console.log(u);
        this.setState((state) => ({
            pop:true,
            singleuser:u[0]
         
           }))

    }
    handleHide(){
        this.setState((state) => ({
            pop:false
           }))
    }
    handleSearch(event){
        event.preventDefault();
        let str = event.target.value;
        this.setState({
            filterUsers: this.state.users.filter((user) => user.username.toLowerCase().includes(str.toLowerCase()))
        })
    }
  async   deleteUser(id){
        let token=localStorage.getItem("auth");
          let result=await  fetch(`http://localhost:8000/auth/delete/${id}`, {
                method:"DELETE",
                headers:{
                    Authorization:'Bearer '+JSON.parse(token)
                },
            })
            result=await result.json()
                    alert('user deleted');
                    this.state.filterUsers.map((user, index) =>{
                        if(id===user.id){
                            localStorage.clear();
                        }
                    })
                    

                    
                    this.props.history.push('/users');
                    console.log(result);
            
            
            
        }
    logoutHandler(){
        localStorage.clear()
       
        localStorage.removeItem('auth');
        localStorage.removeItem('id');
        console.log("token",localStorage.getItem("auth"));
        
    }
    
    render() { 
        return <div>
            {this.state.flag===0 &&<div> <h1 className="error">Need to login first</h1> <Link to="/Login">Click here to Login..</Link> </div>}
            {this.state.display===1 && <div>
            <ul>
            <Link to="/AddUser"> <li><a  href="/AddUser">AddUser</a></li></Link>
 
  <Link to="/"><li onClick={this.logoutHandler} className="Logout"><a href="/">Logout</a></li></Link>

  <Link to="/users"> <li><a href="/users">Users</a></li> </Link>


</ul>


            <h3> All users </h3>
            <input className="search-input" type="text" name="search" placeholder="Search .." onChange={this.handleSearch}/>
                    

            <table>
                
                <thead>
                    <th>Username</th>
                   
                    <th>Email</th>
                    <th>Description</th>
                    <th colSpan="3">Actions</th>
                </thead>
                <tbody>
                {this.state.filterUsers.map((user, index) =>
                 <tr key={index} >
                    <td onClick = {() => {
                    this.handleClick(user.id);
                }}>{user.username}</td>
                   
                    <td onClick = {() => {
                    this.handleClick(user.id);
                }}>{user.email}</td>
                    <td onClick = {() => {
                    this.handleClick(user.id);
                }}>{user.description}</td>
<td><Link to={{ pathname:`/Update/${user.id}`}}><button>edit</button></Link></td>
                <td><button onClick={()=>{this.deleteUser(user.id)}}>Delete</button></td>
                </tr>)}
                </tbody>
            </table>
            <div>  
                      <Popover   isOpen={Boolean(this.state.pop) } 
                  positions={['top', 'right']}
                  padding={10}
                  reposition={true}
                  onClickOutside={() => this.setState((state) => ({
                    pop:false
                   }))}
                 content={()=>(
                  
                  
                    <div className="popover-block" style={{background:"grey"}} >
                        
                        <button style={{float:"left", background:"grey"}}  onClick={this.handleHide}>X</button>
                    <h2 style={{padding:"20px"}}>User Info</h2>
                   
                          
                    <ul   className="PopOver" >
                        <li style={{padding:"20px",border:"1px solid"}}>  Username : {this.state.singleuser.username}</li>
                        <li  style={{padding:"20px",border:"1px solid"}}>   Email : {this.state.singleuser.email}</li>
                        <li style={{padding:"20px",border:"1px solid"}}> About : {this.state.singleuser.description}  </li>
                     </ul>
                      </div> )} >
                          <div></div>
                  </Popover></div>
                  </div>}     </div>
      
    }
}
 
export default User;