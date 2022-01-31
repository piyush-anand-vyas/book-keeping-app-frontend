import React, {useState, useEffect} from 'react';
import { ToastsContainer, ToastsStore } from 'react-toasts';

function NetBalance(props) {

  const [userBalance, setUserBalance] = useState("");
  const [netBalance, setNetBalance] = useState("");
  const [customerBalances, setCustomerBalances] = useState("");
  const [isTransactionAdded, setIsTransactionAdded] = useState();
  const [user, setUser] = useState("");

  const host = "https://book-keeping-app-backend.herokuapp.com";

  const getUserDetails = async()=>{
    console.log("Inside get user")
    const response = await fetch(`${host}/api/auth/getUser`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    let user = await response.json();
    console.log(user);
    setUser(user);

  }

  const getUserBalance = async()=>{
    const response = await fetch(`${host}/api/userBalance/getUserBalance`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    let balance = await response.json();
    console.log(balance); 
    setUserBalance(balance);
    setNetBalance(balance.amount);
  }

  const getCustomerBalance = async()=>{
    const response = await fetch(`${host}/api/customerBalance/user/getCustomerBalances`, {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    });
    let customerBalance = await response.json();
    let send = [];
    let receive = [];
    for (let index = 0; index < customerBalance.length; index++) {
      if(customerBalance[index].amount > 0){
        send.push(customerBalance[index].amount);
      }
      else{
        receive.push(customerBalance[index].amount);
      }  
    }
    let sumSend = 0;
    for (let index = 0; index < send.length; index++) {
      sumSend += send[index];
    }
    let sumReceive = 0;
    for (let index = 0; index < receive.length; index++) {
      sumReceive += receive[index];
    }
    setCustomerBalances({send: sumSend, receive: sumReceive});
  }

  useEffect(async() => {
    getUserBalance();
    getUserDetails();
    //getCustomerBalance();
    setIsTransactionAdded(props.isTransactionAdded);
  }, [props.isTransactionAdded]);
  
  useEffect(async() => {
    getCustomerBalance();
    setIsTransactionAdded(props.isTransactionAdded);
  }, [props.isTransactionAdded]);

  return (
      <>
    <div className="card shadow p-3 mb-5 bg-white rounded" style={{width: "100%"}}>
    <div className="card-body">
      <h5 className="card-title text-center"><img width="25%" height="25%" src="./netBalance.svg" /></h5>
      <h5 className="card-subtitle mb-2 text-center"><strong>Net Balance</strong></h5>
      <h3 className="card-subtitle mb-2 text-center"><strong>{userBalance.amount ? Math.abs(userBalance.amount) : "0"}</strong></h3>
      <h6 className="card-subtitle mb-2 text-muted text-center">{userBalance.amount>=0 ? "You'll Give": "You'll Receive"}</h6>
      <p className="card-text">
          <div className="container">
              <div className="row">
                  <div className="col-md-6 text-center">
                    <h6 className="text-muted">You'll Give</h6>
                    <h2 style={{color:"#ba021a"}}>{customerBalances.send}</h2>
                  </div>
                  
                  <div className="col-md-6 text-center">
                      <h6 className="text-muted">You'll Receive</h6> 
                      <h2 style={{color:"green"}}>{Math.abs(customerBalances.receive)}</h2>
                  </div>
              </div>
          </div>
      </p>
    </div>
  </div>
  <div className="card shadow p-3 mb-5 bg-white rounded" style={{width: "100%"}}>
  <div className="card-body">
    <h5 className="card-title">Logged in User Details</h5>
    <h6 className="card-subtitle mb-2">Name: {user.name}</h6>
    <p className="card-text">Email: {user.email}</p>
    {/* <a href="#" className="card-link">Card link</a>
    <a href="#" className="card-link">Another link</a> */}
  </div>
</div>
</>
  );
}

export default NetBalance;
