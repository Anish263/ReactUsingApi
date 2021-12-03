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
    
}

componentDidMount(){
  
}

      
 
render(){
  return (<div>
   
                  <Route exact path="/" render = {({history}) => (
                              <div>
                                  <Registeration history={history}/>
                              </div>
                          )}/>


              


                  <Route path="/Login" render={({history})=>(
                  <div>
                   
                    <Login   history={history}/>
                    </div>
                )}/>

                <Route path="/LoginSuccess/" render={({history})=>{
                return  <Home  history= {history}/>
                }}/>

                <Route path="/Update" render={({history})=>{
                  return <Update   history={history} />
                }} />

<Route path="/users" render={({history})=>{
                return  <User  history= {history}/>
                }}/>
  </div>)
}
}
export default App;