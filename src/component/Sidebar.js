
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import "../styles/sidebar.css";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { IconContext } from 'react-icons';

class Sidebar extends Component {

    constructor() {
        super();
        this.state = {
            sidebar:false
        }
        this.handleLogout = this.handleLogout.bind(this);
        this.showSidebar = this.showSidebar.bind(this);
    }

    handleLogout(){
        localStorage.removeItem('auth');
       localStorage.clear();
        localStorage.removeItem('id');
        console.log(localStorage);
    }

    showSidebar(){
        const sb = this.state.sidebar;
        this.setState(state => ({
            sidebar: !sb
        }))
    }
    render() { 
        return (    <div className="main">
            <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={this.showSidebar} />
          </Link>
        </div>
        <nav className={this.state.sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={this.showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
                <li className="nav-text"><Link to={{pathname: `/Update/${this.props.id}`}}><span><span>Profile</span> </span></Link></li><br/>
                <li className="nav-text"> <Link to="/AddUser"><span>AddUser</span></Link></li>
                <li className="nav-text"> <Link to="/users"><span><span> <a href="/users">User</a></span></span> </Link></li>
                <li className="nav-text">  <Link to="/Login"><span><span onClick={this.handleLogout} >Logout</span></span></Link></li>

          </ul>
        </nav>
      </IconContext.Provider>
      
        </div>  );
    }

}

export default Sidebar;