import React, { useState } from "react";
import { ToastsContainer, ToastsStore } from 'react-toasts';
import useStyles from "../../styles/styles";
import { BsArrowReturnRight, BsArrowReturnLeft } from "react-icons/bs";
import { FaUserAlt, FaAddressCard } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import {BsFillTelephoneFill} from 'react-icons/bs';
import { BsShieldLockFill } from "react-icons/bs";
import { Link, useHistory } from "react-router-dom";

export default function AddCustomer() {
  const history = useHistory();
  const classes = useStyles();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileno, setMobileno] = useState("");
  const [address, setAddress] = useState("");
  const host = "https://book-keeping-app-backend.herokuapp.com";

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "mobileno") {
      setMobileno(e.target.value);
    } else {
      setAddress(e.target.value);
    }
  };

  const handleAddCustomer = async () => {
    const customerDetails = { name, email, mobileno, address };
    const response = await fetch(`${host}/api/customers/addCustomer`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify(customerDetails),
    });
    let customer = await response.json();
    console.log(customer);
    localStorage.setItem("customer-id", customer.id);
    history.push("/landingPage");
  };

  const handleBackToHome = ()=>{
      history.push('/landingPage');
  }

  return (
    <div>
      <section className="vh-100 mt-2">
        <div className="mask d-flex align-items-center h-100 gradient-custom-3">
          <div className="container h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                <div className="card" style={{ borderRadius: "15px" }}>
                  <div className="card-body p-5">
                    <h2
                      style={{ color: "#ba021a" }}
                      className={`text-uppercase text-center mb-5`}
                    >
                      Add Customer
                    </h2>

                    <form>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i>
                          <FaUserAlt fontSize="1.5em" /> &nbsp;
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
                          <BsFillTelephoneFill fontSize="1.5em" /> &nbsp;
                        </i>
                        <div className="form-outline flex-fill mb-0">
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control form-control-lg"
                            placeholder="Mobile Number"
                            name="mobileno"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i>
                          <FaAddressCard fontSize="1.5em" /> &nbsp;
                        </i>
                        <div className="form-outline flex-fill mb-0">
                          <textarea
                            class="form-control form-control-lg"
                            id="exampleFormControlTextarea1"
                            rows="3"
                            name="address"
                            placeholder="Enter your complete address here"
                            onChange={handleChange}
                          ></textarea>
                        </div>
                      </div>

                      <div className="d-flex justify-content-center">
                        <button
                          type="button"
                          className={`btn ${classes.root} mx-3`}
                          onClick={handleAddCustomer}
                        >
                          Add Customer &nbsp;
                          <i>
                            <BsArrowReturnRight />
                          </i>
                        </button>
                        <button
                          type="button"
                          className={`btn ${classes.root}`}
                          onClick={handleBackToHome}
                        >
                          Back to Home &nbsp;
                          <i>
                            <BsArrowReturnLeft />
                          </i>
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
