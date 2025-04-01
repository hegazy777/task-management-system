import React from 'react'
import { Navbar, Container, Nav, Image, Dropdown } from "react-bootstrap";
import { FaBell } from "react-icons/fa"
import navLogo from "../../../assets/navLogo.png";
import Ellipse from "../../../assets/Ellipse.png";

export default function NavBar() {
  return (
    <>
      <Navbar bg="white" expand="lg" className="shadow-sm px-3">
        <Container fluid className="d-flex justify-content-between align-items-center">
          <Navbar.Brand className="d-flex align-items-center">
            <Image src={navLogo} alt="Logo" height={40} className="me-2" />
          </Navbar.Brand>

      
          <Nav className="d-flex align-items-center">
          
            <FaBell className="text-warning fs-4 me-4 cursor-pointer" />

       
            <Dropdown align="end">
              <Dropdown.Toggle variant="white" className="d-flex align-items-center border-0">
                <Image src={Ellipse} roundedCircle width={40} height={40} className="me-2" />
                <div className="text-start d-none d-md-block">
                  <strong>Upskilling</strong>
                  <br />
                  <small className="text-muted">upskilling.eg1@gmail.com</small>
                </div>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item href="#">Profile</Dropdown.Item>
                <Dropdown.Item href="#">Settings</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#logout" className="text-danger">Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}
