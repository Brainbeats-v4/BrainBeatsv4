import './Navbar.css';
import { NavLink, RouteProps, useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userJWT, userModeState } from "../../JWT";

import './Navbar.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

// images
import logo from '../../images/bbLogo.png';

// This component stores both the Navbar and Sidebar.
const Navbar: React.FunctionComponent<RouteProps> = ({children, ...props}) => {  

    const[isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);
    const user = useRecoilValue(userModeState);
    let menuItem;

    if (user) {
      menuItem=[
          {
            path:"/",
            name:"Home",
            icon:<FontAwesomeIcon icon={["fas", "home"]} />
          },
          {
            path:"../profile",
            name:"Profile",
            icon:<FontAwesomeIcon icon={["fas", "user"]} />
          },
          {
            path:"../about",
            name:"About",
            icon:<FontAwesomeIcon icon={["fas", "circle-info"]} />
          },
          {
            path:"../search",
            name:"Search",
            icon:<FontAwesomeIcon icon={["fas", "search"]} />
          },
          {
            path:"../track-settings",
            name:"Create Track",
            icon:<FontAwesomeIcon icon={["fas", "plus"]} />
          },
        ]
      }
    else {
      menuItem=[
        {
          path:"/",
          name:"Home",
          icon:<FontAwesomeIcon icon={["fas", "home"]} />
        },
        {
          path:"../about",
          name:"About",
          icon:<FontAwesomeIcon icon={["fas", "circle-info"]} />
        },
        {
          path:"../search",
          name:"Search",
          icon:<FontAwesomeIcon icon={["fas", "search"]} />
        },
        {
          path:"../track-settings",
          name:"Create Track",
          icon:<FontAwesomeIcon icon={["fas", "plus"]} />
        },
      ]
    }

    
    const [JWT, setJWT] = useRecoilState(userJWT);
    const [userMode, setUserMode] = useRecoilState(userModeState);
    const navigate = useNavigate();

    const doNavigate = (route:string) => {
        navigate(route);
    }
    
    function doLogout() {
        setJWT('');
        setUserMode(null);
        navigate('/login');
    }

    // TODO: Profile button to have duplicate button with pfp as icon in sidebar 

  return (
    <div className="page">
    <header className="header">
      {/* Navbar Component */}
      <div className="header-toggle top_section" id='navbar-ID'>
        <h1 style={{display: isOpen? "block" : "none", color: "white"}} className="logo">BrainBeats</h1> 
        <img style={{display: isOpen? "block" : "none", color: "white"}} src={logo} className="icon-logo"/>
        <div style={{marginLeft: isOpen? "35px" : "0px"}} className="bars">
          <FontAwesomeIcon style={{color: "white"}} icon={["fas", "bars"]} onClick={toggle} />
        </div>

        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
            {/* If there isn't a user signed in, prompt them to do so */}
            {!user && <ul className="navbar-nav ml-auto  nav-btns-div">
                <form className="form-inline nav-btns" id="formID">
                    <button className="btn btn-sm btn-outline-secondary mx-2" onClick={() => doNavigate('/Register')} type="button" id="signUpBtn">Sign Up</button>
                    <button className="btn btn-sm btn-outline-secondary mx-2" onClick={() => doNavigate('/Login')} type="button" id="loginBtn">Login</button>
                </form>    
            </ul>}
            {user && <ul className="navbar-nav ml-auto nav-btns-div">
                <form className="form-inline nav-btns" id="formID">
                    <button className="btn btn-sm btn-outline-secondary mx-2" onClick={() => doLogout()} type="button" id="signOutBtn">
                      <FontAwesomeIcon id='profile-icon' icon={["fas", "right-from-bracket"]} />
                      Sign Out
                    </button>
                    <button className="btn btn-sm btn-outline-secondary mx-2" onClick={() => doNavigate("/Profile")} type="button" id="profileBtn">
                      <FontAwesomeIcon id='profile-icon' icon={["fas", "user"]} />
                      {user.firstName} {user.lastName}
                    </button>
                </form>    
            </ul>}
        </div>
      </div>
    </header> 
    
    {/* Sidebar Component */}
    <div className="sidebar-container" id='sidebar-ID'>
      <div style={{width: isOpen? "200px" : "60px"}} className={`sidebar ${isOpen? "sidebar-open": "sidebar-closed"}`}>
        {
          menuItem.map((item, index)=>(
            <NavLink  to={item.path} key={index} className="link" end>
                <div className="icon">{item.icon}</div>
                <div style={{display: isOpen? "block" : "none"}} className="link_text">{item.name}</div>
            </NavLink>
          ))
        }
      </div>
      <main id="main-page">{children}</main>
    </div>
  </div>
  )
}

export default Navbar;