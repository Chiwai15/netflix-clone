import React, { useEffect } from 'react'
import Home from './pages/Home/Home'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login/Login'
import Player from './pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    onAuthStateChanged(auth, async (user) => {
      if(user){
        // console.log(JSON.stringify(user)); 
        // console.log("Logged In");
        // toast.success('Welcome Back!', {
        //   position: "top-right",
        //   autoClose: 800,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   });
        navigate('/');
      }else{
        console.log("Logged Out");
        navigate('/login');
      }
    })
  }, [])

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
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/player/:id' element={<Player/>}/>
      </Routes>
    </div>
  )
}

export default App
