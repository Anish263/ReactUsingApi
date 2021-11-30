import React,{Component} from 'react';
import {Route} from 'react-router-dom';
import Registeration from './component/Registeration';
import Login from './/component/Login';
import Home from './component/Home';
import { Link } from 'react-router-dom';
import User from './component/User'
import Update from './component/Update';
// import LoginLink from './component/LoginLink';

class App extends Component{

  constructor() {
    super();
    this.state = {
        users: []
    }
    this.addUser = this.addUser.bind(this);
    this.deleteUser=this.deleteUser.bind(this);
}

componentDidMount(){
  
  let users=require('./data/users.json');

    console.log(users);
  this.setState({
    users:users
  });
}
deleteUser(id){
  this.setState((state) => ({
    users: state.users.filter((user) => user.id !== id)
}));
console.log(this.state.users);
}
addUser(user) {
  console.log(user);
  this.setState((state) => ({
      users: state.users.concat(user)
      
  }));
  console.log(this.state.users);
}
render(){
  return (<div>
   
                  <Route exact path="/" render = {({history}) => (
                              <div>
                                  <Registeration onAddUser = {(user) => {
                                      this.addUser(user);
                                      console.log(this.state.users);
                                      history.push('/Login');
                                  }}/>
                              </div>
                          )}/>


              


                  <Route path="/Login" render={({history})=>(
                  <div>
                   
                    <Login  users={this.state.users} history={history}/>
                    </div>
                )}/>

                <Route path="/LoginSuccess/" render={({history})=>{
                return  <Home users={this.state.users} history= {history}/>
                }}/>

                <Route path="/Update" render={({history})=>{
                  return <Update  users={this.state.users} onDelete= {(id) => {
                                            this.deleteUser(id);}} 
                                            history={history} />
                }} />

<Route path="/users" render={({history})=>{
                return  <User users={this.state.users} history= {history}/>
                }}/>
  </div>)
}
}
export default App;