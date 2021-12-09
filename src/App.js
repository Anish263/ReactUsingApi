import React,{useState,useEffect, useMemo} from 'react';
import {Route} from 'react-router-dom';
import Registeration from './component/Registeration';
import Login from './/component/Login';
import Home from './component/Home';
import User from './component/User'
import Update from './component/Update';
import AddUser from './component/AddUser'
import ImageSlider from './component/ImageSlider';
import { SliderData } from './data/SliderData';
// import LoginLink from './component/LoginLink';

function App(){

  const[count,setCount]=useState(0);
 // const[data,setdata]=useState(100);
//   useEffect(()=>{
// console.warn(Math.random());
//   },[data])
const norender=useMemo(()=>{
  return <div>
 <h2 style={{color:'red'}}>no rerender {count} </h2>
  </div>
},[])
  return (<div>
  {/* {norender}
   <button onClick={()=>setCount(count+2)}>count</button>
   {/* <button onClick={()=>setdata(data+10)}>data</button> */}
   {/* <h2>rerender {count}</h2> */} 

   
                  <Route exact path="/" render = {({history}) => (
                              <div>
                                  <Registeration history={history}/>
                              </div>
                          )}/>

                  <Route exact path="/AddUser" render={({history})=>{
                    return(
                    <div>
                      <AddUser history={history}/>
                      </div>)
                  }}
              />


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

export default App;