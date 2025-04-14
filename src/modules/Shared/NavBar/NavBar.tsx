import { useContext, useEffect, useState } from "react";
import { Navbar, Container, Nav, Image, Dropdown } from "react-bootstrap";
import { FaBell } from "react-icons/fa";
import navLogo from "../../../assets/navLogo.png";
import Ellipse from "../../../assets/Ellipse.png";
import { AuthContext } from "../../../contexts/AuthContext";
import { imageURL } from "../../../services/api/apiConfig";
import DarkMode from "../DarkMode/DarkMode";

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const [isDark, setIsDark] = useState(false);
  const handleDarkModeChange = () => {
    setIsDark(!isDark);
  };
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDark]);
  return (
    <Navbar bg="white" expand="lg" className="shadow-sm px-3">
      <Container
        fluid
        className="d-flex justify-content-between align-items-center"
      >
        <Navbar.Brand className="d-flex align-items-center">
          <Image
            src={user?.imagePath ? imageURL + user?.imagePath : navLogo}
            alt="Logo"
            height={40}
            className="me-2"
          />
        </Navbar.Brand>

        <Nav className="d-flex align-items-center al">
        
          <DarkMode handleChange={handleDarkModeChange} isChecked={isDark} />
       
          <FaBell className="text-warning fs-4 me-4 cursor-pointer" />
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="white"
              className="d-flex align-items-center border-0"
            >
              <Image
                src={Ellipse}
                roundedCircle
                width={40}
                height={40}
                className="me-2"
              />
              <div className="text-start d-none d-md-block user">
                <strong>{user?.userName}</strong>
                <br />
                <small className=" user">{user?.email}</small>
              </div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#">Profile</Dropdown.Item>
              <Dropdown.Item href="#">Settings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                href="#logout"
                className="text-danger"
                onClick={logout}
              >
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}
