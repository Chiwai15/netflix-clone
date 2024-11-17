import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { useDispatch, useSelector, Provider } from 'react-redux';
import store from './redux/store';
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './utils/firebase'
import { useNavigate, useLocation} from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './animations.css'; // Include custom animations
import { login, logout } from './redux/authSlice'; 


const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition key={location.key} classNames="fade" timeout={300}>
        <Routes location={location}>
            <Route path='/' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/player/:id' element={<Player/>}/>
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
};


const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (!isAuthenticated) {
          dispatch(login());
          console.log("login")
          navigate('/'); // Navigate to home only on first login
        }
      } else {
        if (isAuthenticated){
          dispatch(logout());
          console.log("logout")
          navigate('/login');
        }
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, [dispatch, navigate]);

  return (
    <div>
      <ToastContainer theme='dark' 
        position="top-right"
        autoClose={800}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <AnimatedRoutes />
    </div>
  )
}

export default App
