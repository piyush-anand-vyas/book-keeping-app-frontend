import React, {useState, useEffect} from "react";
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { makeStyles } from "@mui/styles";
import { FaSave } from "react-icons/fa";
import { RiArrowGoBackLine } from "react-icons/ri";
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #ba021a 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});

export default function EditCustomerProfile(props) {
  const classes = useStyles();
  const history = useHistory();
  const [customer, setCustomer] = useState("");
  const host = "https://book-keeping-app-backend.herokuapp.com";

  const getCustomer = async()=>{
    const response = await fetch(`${host}/api/customers/getCustomer/${props.location.state.detail}`, {
        method: 'GET', 
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token')
        }
      });
      let customer = await response.json();
      setCustomer(customer);
  }

  const handleChange = (e)=>{
    e.preventDefault();
    setCustomer({...customer, [e.target.name]: e.target.value});
  }

  const handleUpdate = async()=>{
    const response = await fetch(`${host}/api/customers/updateCustomer/${props.location.state.detail}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify(customer)
    });
    let updatedCustomer = await response.json();
    console.log(updatedCustomer);
    history.push({
      pathname: '/customerProfile',
      search: `?id=${customer._id}`,
      state: { detail: customer._id }
    })  
  }

  const handleBack = ()=>{
    history.push({
      pathname: '/customerProfile',
      search: `?id=${customer._id}`,
      state: { detail: customer._id }
    })
  }

  useEffect(() => {
    getCustomer();
  }, []);
  

  return (
    <div className="container text-center my-5">
      <div className="row">
        <div className="col-md-2"></div>
        <div className=" col-md-8 card shadow p-3 mb-5 bg-white rounded ">
          <h4 style={{ color: "#ba021a" }}> Edit Profile</h4>
          <hr />
          <div>
            <img
              src="./avatar.jpg"
              height="90px"
              width="90px"
              className="text-center"
              alt="avatar"
            />
          </div>

          <div>
            <div className="form-row d-flex">
              <div className="form-group col-md-12">
                <label
                  className="d-flex justify-content-start"
                  for="inputEmail4"
                >
                  <strong> Full Name:</strong>
                </label>
                <input
                  name="name"
                  type="text"
                  className="form-control"
                  id="inputEmail4"
                  value={customer.name}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label className="d-flex justify-content-start" for="inputCity">
                  <strong>Email:</strong>
                </label>
                <input
                  name="email"
                  type="text"
                  className="form-control"
                  id="inputCity"
                  value={customer.email}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group col-md-6">
                <label className="d-flex justify-content-start" for="inputCity">
                  <strong> Mobile Number:</strong>
                </label>
                <input
                  name="mobileno"
                  type="text"
                  className="form-control"
                  id="inputCity"
                  value={customer.mobileno}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group col-md-12">
                <label className="d-flex justify-content-start" for="inputCity">
                  <strong>Address:</strong>
                </label>
                <textarea
                  name="address"
                  class="form-control"
                  id="exampleFormControlTextarea1"
                  rows="2"
                  value={customer.address}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div class="form-group"></div>
            </div>
            <br />
            <button className={`btn ${classes.root}`} onClick={handleUpdate}>
              Save Changes{" "}
              <i>
                <FaSave fontSize="large" />
              </i>
            </button>
            &nbsp;
            <button className={`btn ${classes.root}`} onClick={handleBack}>
              <i>
                <RiArrowGoBackLine fontSize="large" />
              </i>{" "}
              Back to Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
