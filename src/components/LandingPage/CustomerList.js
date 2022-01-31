import React, { useEffect, useState } from "react";
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { BiDotsVertical } from "react-icons/bi";
import Avatar from "@material-ui/core/Avatar";
import AddTransaction from "./AddTransaction";
import { useHistory, Link } from "react-router-dom";
import { BiDotsVerticalRounded } from "react-icons/bi";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

function CustomerList(props) {
  const history = useHistory();
  const [customers, setCustomers] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [type, setType] = useState("");

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = (id, customer_id) => {
    if(id===1){
      history.push({
        pathname: "/customerProfile",
        search: `?id=${customer_id}`,
        state: { detail: customer_id },
      })
    }
    setAnchorEl(null);

    //redirect to the page
  };

  const getCustomers = async () => {
    const response = await fetch(`${host}/api/customers/getCustomers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    let customers = await response.json();
    console.log(customers);
    setCustomers(customers);
  };

  const getCustomerBalance = async (customer_id) => {
    const response = await fetch(`${host}/api/customerBalance/getCustomerBalances`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFmMGQ1NjU4YzlkOGRhNDgzMzEwMzBhIn0sImlhdCI6MTY0MzQ1MTgyM30.bZjZW2X_pjmRaPw74SvHQEfmsRB048eYI4Ca69QPtBc",
        "customer-id": customer_id,
      },
    });
    let custBalance = await response.json();
    //console.log(custBalance);
    //setCustomerBalance(custBalance);
    return custBalance;
  };

  useEffect(async () => {
    getCustomers();
    // getCustomerBalance();
  }, []);

  const handleOpenModal = (id, customer_id) => {
    setOpenModal(true);
    setCustomerId(customer_id);
    if (id === 1) {
      setType("Receive");
    } else {
      setType("Send");
    }
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const host = "https://book-keeping-app-backend.herokuapp.com";
  return (
    <>
      <AddTransaction open={openModal} handleClose={handleClose} id={customerId} type={type} setIsTransactionAdded={props.setIsTransactionAdded} />
      <div className="card shadow p-3 mb-5 bg-white rounded" style={{ width: "100%" }}>
        <div className="card-body">
          <h4 className="card-title">Customers List</h4>
          <hr />

          <p className="card-text">
            {customers.length > 0 ?
              customers.map((customer) => (
                <div key={customer._id}>
                  <div className="row text-center">
                    <div className="col-md-1">
                      <Avatar style={{ backgroundColor: "grey" }}>{customer.name.charAt(0).toUpperCase()}</Avatar>
                    </div>
                    <div className="col-md-4">
                      <strong>{customer.name}</strong> &nbsp;
                      <span style={{ color: "#ba021a" }}>({customer.mobileno})</span>
                    </div>
                    <div className="col-md-2 mb-1">
                      <button
                        type="button"
                        class="btn btn-outline-success"
                        onClick={(e) => {
                          handleOpenModal(1, customer._id);
                        }}
                      >
                        Receive
                      </button>
                    </div>
                    <div className="col-md-2">
                      <button
                        type="button"
                        class="btn btn-outline-danger"
                        onClick={(e) => {
                          handleOpenModal(2, customer._id);
                        }}
                      >
                        Send
                      </button>
                    </div>
                    &nbsp;
                    <div className="col-md-1">
                      {/* <BiDotsVertical fontSize="1.5em" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false"/> */}
                      {/* <Link to="/customerProfile">Profile</Link> */}
                      <Link
                        to={{
                          pathname: "/customerProfile",
                          search: `?id=${customer._id}`,
                          state: { detail: customer._id },
                        }}
                      >
                        <button type="button" className="btn btn-secondary">Profile </button>
                      </Link>
                      </div>
                      &nbsp;&nbsp;&nbsp;
                      <div className="col-md-1">
                      <Link to={{
                          pathname: "/transaction",
                          search: `?id=${customer._id}`,
                          state: { detail: customer._id },
                        }}>
                          <button type="button" className="btn btn-secondary">Details </button>
                        </Link>
                        </div>
                      {/* <div>
                        <BiDotsVerticalRounded fontSize="1.5em" id="demo-positioned-button" aria-controls={open ? "demo-positioned-menu" : undefined} aria-haspopup="true" aria-expanded={open ? "true" : undefined} onClick={handleClick} />

                        <Menu
                          id="demo-positioned-menu"
                          aria-labelledby="demo-positioned-button"
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose1}
                          anchorOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "left",
                          }}
                        >
                          <MenuItem onClick={()=>{handleClose1(1, customer._id)}}>Customer Profile {customer._id}</MenuItem>
                          <MenuItem onClick={()=>{handleClose1(2, customer._id)}}>View all Trasctions</MenuItem>
                          <MenuItem onClick={()=>{handleClose1(3, customer._id)}}>Delete Customer</MenuItem>
                        </Menu>
                      </div> */}
                    
                    <hr />
                  </div>
                </div>
              )) : <h6>No Customers Added</h6>}
          </p>
        </div>
      </div>
    </>
  );
}

export default CustomerList;
