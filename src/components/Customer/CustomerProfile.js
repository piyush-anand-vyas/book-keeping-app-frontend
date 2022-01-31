import React, {useEffect, useState} from "react";
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { makeStyles } from "@mui/styles";
import {FiEdit} from 'react-icons/fi'
import {RiArrowGoBackLine} from 'react-icons/ri';
import {useHistory} from 'react-router-dom';
import moment from 'moment';

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

export default function CustomerProfile(props) {
    const history = useHistory();
  const classes = useStyles();
  const host = "https://book-keeping-app-backend.herokuapp.com";
  
  const handleProfile = () => {
    history.push({
        pathname: '/editCustomer',
        search: `?id=${customer._id}`,
        state: { detail: customer._id }
      })  
  };

  const [customer, setCustomer] = useState("");

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

  const handleBack = ()=>{
    history.push('/landingPage');
  }

  useEffect(() => {
    getCustomer();
  }, []);
  

  return (
    <div className="container text-center my-5">
      <div className="row">
        <div className="col-md-3"></div>
        <div className=" col-md-6 card shadow p-3 mb-5 bg-white rounded">
          <div>
            <h1>Customer Profile</h1>
          </div>
          <hr />
          <div>
            <img
              src="./avatar.jpg"
              height="180px"
              width="180px"
              className="text-center"
              alt="avatar"
            />
          </div>
          <div>
            <br />
            <h2>{customer.name}</h2>
          </div>
          <div>
            Email :{" "}
            <strong style={{ color: "#ba021a" }}>{customer.email}</strong>
            <p style={{ fontSize: "15px" }}>Mobile number : <strong> {customer.mobileno}</strong> </p>
          </div>
          <div>
            <br />
            <button
              type="button"
              className={`btn btn-dark ${classes.root}`}
              onClick={handleProfile}
            >
              Edit Profile &nbsp;
              <i><FiEdit fontSize="large"/></i>
            </button> &nbsp;
            <button className={`btn ${classes.root}`} onClick={handleBack}>
              <i>
                <RiArrowGoBackLine fontSize="large" />
              </i>{" "}
              Back to Home
            </button>
          </div>
          <div>
            <br />
          Date of adding {customer.name} in list is : {moment(customer.date).format("DD-MMM-YYYY")}
          </div>
        </div>
        <div className="col-md-3"></div>

      </div>
    </div>
  );
}
