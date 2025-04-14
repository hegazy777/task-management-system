import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import {
  FaAngleLeft,
  FaAngleRight,
  FaUser,
  FaProjectDiagram,
  FaTasks,
  FaHome,
} from "react-icons/fa";
import { Button } from "react-bootstrap";
import { AuthContext } from "../../../contexts/AuthContext";

export default function SideBar() {
  const { logout, isManager } = useContext(AuthContext);
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="sidebar-container">
      <Sidebar collapsed={collapsed}>
        <div
          className="sidebar-header"
          style={{
            position: "relative",
            padding: "10px",
            marginBottom: "20px",
          }}
        >
          <Button
            variant="warning"
            className="toggle-btn"
            onClick={() => setCollapsed(!collapsed)}
            style={{
              height: "45px",
              position: "absolute",
              top: "10px",
              right: "-15px",
              borderRadius: "20%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              border: "none",
            }}
          >
            {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
          </Button>
        </div>
        <Menu>
          <MenuItem component={<Link to="" />}>
            <FaHome style={{ marginRight: "10px" }} /> Home
          </MenuItem>

          {isManager && (
            <MenuItem component={<Link to="users" />}>
              <FaUser style={{ marginRight: "10px" }} /> Users
            </MenuItem>
          )}

          <MenuItem component={<Link to="projects" />}>
            <FaProjectDiagram style={{ marginRight: "10px" }} /> Projects
          </MenuItem>
          {isManager && (
            <MenuItem component={<Link to="all-tasks" />}>
              <FaTasks style={{ marginRight: "10px" }} /> Tasks
            </MenuItem>
          )}
                    {!isManager && (
            <MenuItem component={<Link to="TaskBoard" />}>
            <FaTasks style={{ marginRight: "10px" }} /> Task Board
          </MenuItem>
          )}
          
          <MenuItem onClick={() => logout()}>
            <FaTasks style={{ marginRight: "10px" }} />
            LogOut
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
