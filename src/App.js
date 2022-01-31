import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import Routes from './routes/routeConfigs';
import Navigation from './components/SideBar/Navigation';
import Registration from './components/Registration';

export default function App() {
  // const [isLogin, setIsLogin] = useState(false);

  // useEffect(() => {
  //   if(localStorage.getItem('token')!=null){
  //     setIsLogin(true);
  //   }
  //   else{
  //     setIsLogin(false);
  //   }
  // }, [isLogin]);
  // const [progress, setProgress] = useState(0)

  return (
  <div>
    {/* { isLogin && */}
    <Router>
    <Routes/>
    </Router>
    
  </div> 
  );
}
