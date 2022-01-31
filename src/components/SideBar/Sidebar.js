import React from "react";
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    sidebar: {
        position: "fixed",
        top: "0",
        bottom: "0",
        left: "0",
        padding: "58px 0 0", /* Height of navbar */
        boxShadow:" 0 2px 5px 0 rgb(0 0 0 / 5%), 0 2px 10px 0 rgb(0 0 0 / 5%)",
        width: "240px",
        zindex: "600"
      },
      
})

export default function Sidebar() {
    const classes = useStyles()
  return <div style={{  backgroundColor: "#fbfbfb" }}>
<header>
  <nav id="sidebarMenu" className={`collapse d-lg-block sidebar collapse bg-white ${classes.sidebar}`}>
    <div className="position-sticky">
      <div className="list-group list-group-flush mx-3 mt-4">
      
       
        <a href="#!" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-lock fa-fw me-3"></i><span>Password</span></a
        >
        <a href="#!" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-chart-line fa-fw me-3"></i><span>Analytics</span></a
        >
        <a href="#!" className="list-group-item list-group-item-action py-2 ripple">
          <i className="fas fa-chart-pie fa-fw me-3"></i><span>SEO</span>
        </a>
        <a href="#!" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-chart-bar fa-fw me-3"></i><span>Orders</span></a
        >
        <a href="#!" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-globe fa-fw me-3"></i><span>International</span></a
        >
        <a href="#!" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-building fa-fw me-3"></i><span>Partners</span></a
        >
        <a href="#!" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-calendar fa-fw me-3"></i><span>Calendar</span></a
        >
        <a href="#!" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-users fa-fw me-3"></i><span>Users</span></a
        >
        <a href="#!" className="list-group-item list-group-item-action py-2 ripple"
          ><i className="fas fa-money-bill fa-fw me-3"></i><span>Sales</span></a
        >
      </div>
    </div>
  </nav>

 
</header>

  </div>;
}
