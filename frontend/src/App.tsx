import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, BrowserRouter as Router, Navigate, useNavigate} from 'react-router-dom'
import Home from './Pages/Home';
import About from './Pages/About';
import Search from './Pages/Search';
import Settings from './Pages/Settings';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import Profile from './Pages/Profile';
import Forgot from './Pages/Forgot';
import ResetPassword from './Pages/ResetPassword'
import Verify from './Pages/Verify';
import Script from './Pages/Script';
import RecordTrack from './Pages/RecordTrack';
// import SliceProvider from './Redux/SliceProvider';
import { userJWT } from './JWT'
import { useEffect, useState } from 'react';

function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // const user = useState(userJWT);
  
  const checkUserToken = () => {
    const userToken = userJWT;
	  if (userToken == undefined) {
		  setIsLoggedIn(false);
	  }
		setIsLoggedIn(true);
  }

  useEffect(() => {
	  let res = checkUserToken();
  }, [isLoggedIn]);
  
  


  return (
    <div className='bg'>
      
      <Router>
        {/* <Sidebar> */}
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/search' element={<Search />} />
            <Route path='/track-settings' element={<Settings />} />
            <Route path='/script-settings' element={<Script />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<SignUp />} />
            <Route path='/forgot' element={<Forgot />} />
            <Route path='/verify' element={<Verify />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/record' element={<RecordTrack />} />
            {/* { */}
              {/* // isLoggedIn?  */}
              <Route path='/profile' element={<Profile />} />
              {/* // : */}
              {/* // <Route path='/profile' element={<Navigate to='/login'/>} /> */}
            {/* // } */}
            {/* <Route path='/Login' element={user ? <Navigate to='/' /> : <Login />}/>
            <Route path='/Signup' element={user ? <Home /> :<Signup />} /> */}

            {/* <Route path='/Profile' element={user ? <Profile /> : <Navigate to='/Login' />} /> */}

            {/* <Route path='/Record' element={<Record />} /> */}
            {/* <Route path='/Search' element={<Search />} />
            <Route path='/Playlist' element={<Playlists />} />
            <Route path='/Playlist/:pid' element={<Playlist />} /> */}
            {/* <Route path='/Forgot' element={<Forgot />} />
            <Route path='/Test' element={<Test />} />
            <Route path='/About' element={<AboutUs />} /> */}
          </Routes>
        {/* </Sidebar> */}
      </Router>
    </div>
    
    
    
  );
}

export default App;