import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import '../styles/home.css'
import Sidebar from './Sidebar';
import ImageSlider from './ImageSlider';
import { SliderData } from '../data/SliderData';
class Home extends Component{
    constructor() {
        super();
     
       
        this.state = {
            id:Number,
            loginuser: {},
            username:'',
            isAuth:true,
            flag:1,
            display:1

        };
    }
 
 
    componentDidMount() {
        let url = window.location.href;
        let id = Number(url.split("/")[4]);
        let token = localStorage.getItem('auth');
        console.log(JSON.parse(token));
        if(token){
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
    else{
        this.setState((state)=>({
            flag:0,
        display:0}))
        
        }
}
    logoutHandler = () => {
        localStorage.clear()
       
        localStorage.removeItem('auth');
        localStorage.removeItem('id');
        console.log(">>>isauth",this.state.isAuth)
        console.log("token",localStorage.getItem("auth"));
      };

    
    render() { 
        return <div>
{this.state.flag===0 &&<div> <h1 className="error">Need to login first</h1> <Link to="/Login">Click here to Login..</Link> </div>}
            {this.state.display===1 && <div>
                <div className="side">
<Sidebar id={this.state.id}/>
</div>
            <div className="header-body">
                <h3>Hi, {this.state.username}</h3>
                <ImageSlider slides={SliderData} />
                </div>
               

      
            </div>
    }</div>;
    }


}
export default Home