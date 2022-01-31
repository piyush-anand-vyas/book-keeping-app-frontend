import React, { useState } from "react";
import { ToastsContainer, ToastsStore } from 'react-toasts';
// import { makeStyles } from '@mui/styles';
import { BsKeyFill } from "react-icons/bs";
import useStyles from "../styles/styles";
import {Link, useHistory} from 'react-router-dom';

export default function Login() {
  const history = useHistory();
  const host = "https://book-keeping-app-backend.herokuapp.com";
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    if (e.target.name === "email") {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!pattern.test(e.target.value)) {
                setError(true)
            } else {
                setError(false)
            }
      setEmail(e.target.value);
    } else {
      setPassword(e.target.value);
    }
  };

  const handleLogin = async () => {
    let userDetails = { email, password };
    const response = await fetch(`${host}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    if(response.status === 200){
      ToastsStore.success("Login Successful");
    }
    else{
      ToastsStore.error("Something went wrong!");
    }
    let token = await response.json();
    localStorage.setItem("token", token.authToken);
    localStorage.setItem("isLogin", true);
    history.push("/landingPage");
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4" style={{color: "#ba021a"}}>Welcome to Eccounting</h1>
      <h6 className="text-center">A cloud based Bookkeeping App</h6>
      <grid className="card">
        <section className="vh-auto ">
          <div
            className="container h-custom shadow-lg p-3 mb-5 bg-white rounded my-5"
            style={{ position: "static" }}
          >
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-md-9 col-lg-6 col-xl-5">
                <img
                  src="../../login.jpg"
                  className="img-fluid"
                  alt="Sample image"
                />
              </div>
              <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                <form>
                  <div className="form-outline mb-4">
                    <input
                      type="email"
                      id="form3Example3"
                      className={`form-control form-control-lg `}
                      placeholder="Email address"
                      name="email"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-outline mb-3">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      name="password"
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex justify-content-between align-items-center">
                    <div className="form-check mb-0">
                      {/* <input
                      className="form-check-input me-2"
                      type="checkbox"
                      value=""
                      id="form2Example3"
                    /> */}
                      {/* <label className="checkbox checkbox-circle checkbox-red" for="form2Example3">
                      Remember me
                    </label> */}
                    </div>
                    {/* <a href="#!" className=" link-danger">
                      Forgot password?
                    </a> */}
                  </div>

                  <div className="text-center text-lg-start mt-4 pt-2">
                    <button
                      type="button"
                      className={`btn ${classes.root}`}
                      onClick={handleLogin}
                    >
                      Login
                      <i>
                        {" "}
                        <BsKeyFill />
                      </i>
                    </button>
                    <p className="small fw-bold mt-2 pt-1 mb-0">
                      Don't have an account?{" "}
                      <Link to="/register" className="link-danger">
                        Register
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </grid>
      <ToastsContainer store={ToastsStore} />
    </div>
  );
}
