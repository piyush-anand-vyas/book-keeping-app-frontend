import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from '../components/Login';
import Registration from '../components/Registration';
import Sidebar from '../components/SideBar/Sidebar';
import LandingPage from '../components/LandingPage/LandingPage';
import AddCustomer from '../components/Customer/AddCustomer';
import EditCustomerProfile from '../components/Customer/EditCustomerProfile';
import CustomerProfile from '../components/Customer/CustomerProfile';
import Transaction from "../components/LandingPage/Transaction";
import Navbar from "../components/Navbar";

export default function routeConfigs() {
  return (
      <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Registration} />
        <div>
          <Navbar />
        <Route exact path="/sidenav" component={Sidebar} />
        <Route exact path="/landingPage" component={LandingPage} />
        <Route exact path="/addCustomer" component={AddCustomer} />
        <Route exact path="/editCustomer" component={EditCustomerProfile} />
        <Route exact path="/customerProfile" component={CustomerProfile} />
        <Route exact path="/transaction" component={Transaction} />
        </div>
      </Switch>
  );
}
