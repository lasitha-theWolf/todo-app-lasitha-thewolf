import React from "react";
import { Link } from "react-router-dom";
import "./css/sidebar.css"; // Import the external CSS file
import DashboardIcon from "./img/Icon.png"; // Import the icon


function Sidebar() {
  return (
    <div className="container ">
          <nav id="sidebar" className="sidebar">
        <div className="sidebar-header">
          <h3 className="sidebar-heading">Acmy Solutions</h3>
        </div>
        <ul className="sidebar-list list-unstyled">
          <li className="sidebar-item">
            
            <Link to="/" className="sidebar-link active" aria-current="page">
              <img src={DashboardIcon} alt="Dashboard Icon" /> Dashboard
            </Link>
          </li>
        </ul>
      </nav>
      
    </div>
  );
}

export default Sidebar;
