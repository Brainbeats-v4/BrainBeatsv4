import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useRecoilState } from 'recoil';
import { userJWT, userModeState } from "../../JWT";

const Navbar = () => {
    const user = useRecoilValue(userModeState);
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
    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">
        {/* If there isn't a user signed in, prompt them to do so */}
        {!user && <ul className="navbar-nav ml-auto">
            <form className="form-inline" id="formID">
                <button className="btn btn-sm btn-outline-secondary mx-2" onClick={() => doNavigate('/Register')} type="button" id="signUpBtn">Sign Up</button>
                <button className="btn btn-sm btn-outline-secondary mx-2" onClick={() => doNavigate('/Login')} type="button" id="loginBtn">Login</button>
            </form>    
        </ul>}
        {user && <ul className="navbar-nav ml-auto">
            <form className="form-inline" id="formID">
                <button className="btn btn-sm btn-outline-secondary mx-2" onClick={() => doLogout()} type="button" id="signUpBtn">Sign Out</button>
                <button className="btn btn-sm btn-outline-secondary mx-2" onClick={() => doNavigate("/Profile")} type="button" id="signUpBtn">Profile</button>
            </form>    
        </ul>
        }
    </div>
  )
}

export default Navbar;