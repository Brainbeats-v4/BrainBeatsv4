import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userModeState } from "../../JWT";

const Navbar = () => {
    const user = useRecoilValue(userModeState);
    
    const navigate = useNavigate();

    const doNavigate = (route:string) => {
        navigate(route);
    }
    
    function doLogout() {
        // remove jwt, reset other buttons, refresh page 
    }

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
            </form>    
        </ul>
        }
    </div>
  )
}

export default Navbar;