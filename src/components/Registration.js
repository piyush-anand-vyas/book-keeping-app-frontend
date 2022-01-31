import React, {useState} from "react";
import { ToastsContainer, ToastsStore } from 'react-toasts';
import useStyles from '../styles/styles'
import {BsArrowReturnRight} from  'react-icons/bs';
import {FaUserAlt, FaKey} from 'react-icons/fa';
import {MdEmail} from 'react-icons/md';
import {BsShieldLockFill} from 'react-icons/bs';
import {Link, useHistory} from 'react-router-dom';

export default function Registration() {
    const history = useHistory();
    const classes = useStyles();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rpassword, setRPassword] = useState("");
    const host = "https://book-keeping-app-backend.herokuapp.com"

    const handleChange = (e)=>{
        if(e.target.name === "name"){
            setName(e.target.value);
        }
        else if(e.target.name === "email"){
            setEmail(e.target.value);
        }
        else if(e.target.name === "password"){
            setPassword(e.target.value);
        }
        else{
            setRPassword(e.target.value);
        }
    }

    const handleRegister = async ()=>{
        const userDetails = {name,email,password}
        const response = await fetch(`${host}/api/auth/createUser`, {
            method: 'POST', 
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userDetails)
          });
          if(response.status === 200){
            ToastsStore.success("Registered Successfully");
          }
          else{
            ToastsStore.error("Something went wrong!");
          }
          let token = await response.json();
          console.log(token);
          localStorage.setItem('token', token.authToken);
          history.push("/login");
    }

  return (
    <div>
      <h1 className="text-center mt-4" style={{color: "#ba021a"}}>Welcome to Eccounting</h1>
      <h6 className="text-center mb-2">A cloud based Bookkeeping App</h6>
      <section
        className="vh-100"
        
      >
        <div className="mask d-flex align-items-center h-90 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{borderRadius: "15px"}}>
                  <div className="card-body p-5">
                    <h2 style={{color:"#ba021a"}} className={`text-uppercase text-center mb-5`}>
                      Create an account
                    </h2>

                    <form>
                      <div className="d-flex flex-row align-items-center mb-4">
                      <i>
                          <FaUserAlt fontSize="1.5em"/> &nbsp;
                        </i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control form-control-lg"
                            placeholder="Full Name"
                            name="name"
                          onChange={handleChange}
                          />
                          </div>
                          </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                      <i>
                          <MdEmail fontSize="1.5em" /> &nbsp;
                        </i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="email"
                            id="form3Example1c"
                            className="form-control form-control-lg"
                            placeholder="Email"
                            name="email"
                          onChange={handleChange}
                          />
                          </div>
                          </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                      <i>
                          <BsShieldLockFill fontSize="1.5em" /> &nbsp;
                        </i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example1c"
                            className="form-control form-control-lg"
                            placeholder="Password"
                            name="password"
                          onChange={handleChange}
                          />
                          </div>
                          </div>


                      {/* <div className="d-flex flex-row align-items-center mb-4">
                      <i>
                          <FaKey fontSize="1.5em" /> &nbsp;
                        </i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="password"
                            id="form3Example1c"
                            className="form-control form-control-lg"
                            placeholder="Repeat your password"
                            name="rpassword"
                          onChange={handleChange}
                          />
                          </div>
                          </div> */}
                   

                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className={`btn ${classes.root}`}
                          onClick={handleRegister}
                        >
                          Register &nbsp;
                          <i><BsArrowReturnRight/></i>
                        </button>
                      </div>

                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                        <Link to="/login" className="fw-bold text-body ">
                          <u className="link-danger">Login here</u>
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
       
<ToastsContainer store={ToastsStore} />
    </div>
  );
}
