import React, { useState, useEffect } from "react";
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { MdDelete } from "react-icons/md";
import { RiEdit2Fill, RiArrowGoBackLine } from "react-icons/ri";
import moment from 'moment';
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {useHistory} from 'react-router-dom';

const useStyles = makeStyles({

  iconHover: {
    '&:hover': {
      fontSize: "1.8em",
    }
  },
  root: {
    background: 'linear-gradient(45deg, #ba021a 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 35,
    padding: '0 30px',
  },
});


export default function Transaction(props) {  
  const host = "https://book-keeping-app-backend.herokuapp.com";

  const history = useHistory();

  const classes = useStyles();

  const refClose = React.useRef(null);

  const [transactions, setTransactions] = useState("");
  const [customerDetails, setCustomerDetails] = useState("");
  const [open, setOpen] = useState(false);
  const [tran, setTran] = useState("");
  const [customerBalance, setCustomerBalance] = useState("");
  const [balance, setBalance] = useState(false);

  const getTransactions = async() => {
    const response = await fetch(`${host}/api/transactions/getCustomerTransactions`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        "customer-id": props.location.state.detail,
      },
    });
    let transactions = await response.json();
    console.log(transactions);
    setTransactions(transactions);
  };

  const getCustomerDetails = async()=>{
    const response = await fetch(`${host}/api/customers/getCustomer/${props.location.state.detail}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token")
      },
    });
    let customerDetails = await response.json();
    setCustomerDetails(customerDetails);
  }

  const getCustomerBalance = async()=>{
    setBalance(false);
    const response = await fetch(`${host}/api/customerBalance/getCustomerBalances`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
        'customer-id': props.location.state.detail
      }
    });
    let customerBalance = await response.json();
    setCustomerBalance(customerBalance);
    setBalance(true);
  }

  const handleDeleteTransaction = async(id)=>{
    const response = await fetch(`${host}/api/transactions/deleteTransaction/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
        'customer-id': props.location.state.detail
      }
    });
    //const notes = await response.json();
    //console.log(notes);
    const updatedTransactions = transactions.filter((transaction)=>transaction._id!==id);
    setTransactions(updatedTransactions);
  }

  const handleChange = (e)=>{
    setTran({...tran, [e.target.name]: e.target.value});
  }

  const handleUpdateTransaction = async()=>{
    const response = await fetch(`${host}/api/transactions/updateTransaction/${tran._id}`, {
      method: 'PUT', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
        'customer-id': props.location.state.detail
      },
      body: JSON.stringify(tran)
    });
    //let transaction = await response.json();
    const newTransactions = JSON.parse(JSON.stringify(transactions));
    console.log("Before for");
        for (let index = 0; index < newTransactions.length; index++) {
          if(newTransactions[index]._id === tran._id){
            newTransactions[index].amount = tran.amount;
            newTransactions[index].details = tran.details;
            break;
          }
        }
        console.log("New", newTransactions);
        setTransactions(newTransactions);
  }

  const handleOpen = (id)=>{
    let filteredTransaction = transactions.filter((transaction)=>transaction._id.includes(id))
    setTran(filteredTransaction[0]);
    console.log(tran);
    setOpen(true);
  }

  const handleClose = ()=>{
    handleUpdateTransaction();
    setOpen(false);
  }

  const handleBack = ()=>{
    history.push('/landingPage');
  }

  useEffect(() => {
    getTransactions();
    getCustomerDetails();
    setTran(transactions);
  }, []);

  useEffect(() => {
    getCustomerBalance();
  }, [balance]);
  
  
  let count = 1;
  return (
    <>
      <div className="container my-5">
        <div className="row">
          <div className="col-md-8">
            <div className="card shadow p-3 mb-5 bg-white rounded" style={{ width: "100%" }}>
              <div className="card-body">
                <h4 className="card-title">{customerDetails.name}</h4>
                <h6 className="card-subtitle mb-4 text-muted">{customerDetails.mobileno}</h6>
                <p className="card-text">
                  {transactions!= "" ? 
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Details</th>
                        <th scope="col">Date</th>
                        <th scope="col">You Sent</th>
                        <th scope="col">You Received</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.length > 0 &&
                        transactions.map((transaction) => (
                          <>
                            <tr>
                              <th scope="row">{count++}</th>
                              <td>{transaction.details}</td>
                              <td>{moment(transaction.date).format("DD-MMM-YYYY")}</td>
                              <td style={{backgroundColor: transaction.type === "Send" ? "#FCBCB6" : ""}}><strong>{transaction.type === "Send" ? transaction.amount : ""}</strong></td>
                              <td style={{backgroundColor: transaction.type === "Receive" ? "#B8FCB6" : ""}}><strong>{transaction.type === "Receive" ? transaction.amount : ""}</strong></td>
                              <td>
                                <RiEdit2Fill className={classes.iconHover} style={{ color: "#686e6a" }} fontSize="1.5em" onClick={()=>{handleOpen(transaction._id)}} /> &nbsp; <MdDelete className={classes.iconHover} style={{ color: "#ba021a" }} fontSize="1.5em" onClick={()=>{handleDeleteTransaction(transaction._id)}} />
                              </td>
                            </tr> 
                          </>
                        ))}
                    </tbody>
                  </table>
: <h5>No Transactions</h5>}
                </p>
                <p className="card-link d-flex flex-row-reverse">
                <button className={`btn btn-sm ${classes.root}`} onClick={handleBack}>
              <i>
                <RiArrowGoBackLine fontSize="large" />
              </i>{" "}
              Back
            </button>
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
        <div className="card shadow p-3 mb-5 bg-white rounded text-center" style={{width: "100%"}}>
  <div className="card-body">
  <h5 className="card-title text-center"><img width="25%" height="25%" src="./netBalance.svg" /></h5>
  <h5 className="card-subtitle mb-2 text-center"><strong>Balance</strong></h5>
    <h6 className="card-subtitle mb-2 text-muted">{customerBalance.amount >=0 ? "You'll Give" : "You'll Receive"}</h6>
    <h5 className="card-subtitle mb-2 text-center" style={{color: customerBalance.amount >=0 ? "#ba021a" : "green"}}><strong>{customerBalance.amount ? Math.abs(customerBalance.amount) : "0"}</strong></h5>
    {/* <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a> */}
  </div>
</div>
        </div>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Transaction</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Amount"
            type="text"
            fullWidth
            variant="standard"
            name="amount"
            onChange={handleChange}
            value={tran.amount}
          />
          <TextField
            margin="dense"
            id="name"
            label="Details"
            type="text"
            fullWidth
            variant="standard"
            name="details"
            onChange={handleChange}
            value={tran.details}
          />
          {/* <FormControl variant="standard" sx={{ m: 1, minWidth: "50%" }}>
        <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={type}
          onChange={handleChange}
          label="Type"
          name="type"
          placeholder="Select type of transaction"
        >
          
          <MenuItem value="Send">Send</MenuItem>
          <MenuItem value="Receive">Receive</MenuItem>
        </Select>
      </FormControl> */}
        </DialogContent>
        <DialogActions>
          <Button ref={refClose} onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>


    </>
  );
}
