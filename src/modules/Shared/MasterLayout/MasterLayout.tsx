import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

const Layout = () => {
  return (
    <>
      
        <div className="">
          <NavBar />
        </div>
     

      <div className="d-flex h-100">
        <div className="sidebar-container">
          <SideBar />
        </div>

        <div className="p-3">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
