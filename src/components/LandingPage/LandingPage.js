import React, {useState, useEffect} from "react";
import { ToastsContainer, ToastsStore } from 'react-toasts';
import { BiSearchAlt } from "react-icons/bi";
import { AiOutlineUserAdd } from "react-icons/ai";
import useStyles from "../../styles/styles";
import NetBalance from "./NetBalance";
import CustomerList from "./CustomerList";
import { useHistory } from "react-router-dom";

function LandingPage() {
  const classes = useStyles();
  const history = useHistory();
  const [isTransactionAdded, setIsTransactionAdded] = useState(false);

  useEffect(() => {
    setIsTransactionAdded(false);
  }, [isTransactionAdded]);
  
  return (
    <>
    <div className="container my-4">
      <div className="row">
        <div className="col-md-8">
          <div className="row">
            <div className="col-md-6">
              {/* <div className="input-group mb-3">
                <span className="input-group-text" id="basic-addon1">
                  <BiSearchAlt fontSize="1.5em" />
                </span>
                <input
                  type="search"
                  className="form-control form-control-lg"
                  placeholder="Search"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </div> */}
            </div>
            <div className="col-md-6 mb-3 flex-row-reverse d-flex">
              <button type="button" className={`btn ${classes.root}`} onClick={()=>{history.push('/addCustomer')}}>
                Add Customer
                <i>
                  {" "}
                  <AiOutlineUserAdd fontSize="1.5em" />
                </i>
              </button>
            </div>
          </div>
          <CustomerList setIsTransactionAdded={setIsTransactionAdded}/>
        </div>
        <div className="col-md-4">
            <NetBalance isTransactionAdded={isTransactionAdded}/>
        </div>
      </div>
    </div>
    </>
  );
}

export default LandingPage;
