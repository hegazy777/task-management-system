import React from "react";
import { Container, Row, Col } from "react-bootstrap";

import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

const Layout = () => {
  return (
    <Container fluid>
      <Row>
        <Col xs={12} md={3} lg={2} className="bg-light vh-100 w-25 bg-warning">
          <SideBar />
        </Col>
        <Col xs={12} md={9} lg={10} className="p-0 w-75">
          <NavBar />
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default Layout;
