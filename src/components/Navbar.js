import React, {useState, useEffect} from 'react';
import { ToastsContainer, ToastsStore } from 'react-toasts';
import useStyles from '../styles/styles';
import {useHistory} from 'react-router-dom';
import Login from './Login';

export default function Navbar() {
    const classes = useStyles();
    const history = useHistory();

    const handleLogout = ()=>{
      localStorage.removeItem('token');
      localStorage.removeItem('isLogin');
      window.localStorage.clear();
      history.push('/login');
    }

  return (
    <>
    <nav className={`navbar navbar-expand-lg`} style={{backgroundColor: "#ba021a", color:"white"}}>
    <div className="container-fluid">
      <h4 className="text-center">Eccounting</h4>
    </div>
    <div className="d-flex flex-row-reverse">
      <button type="button" className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
    </div>
  </nav>
    </>
  );
}
