import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

const Layout = () => {
  return (
    <>
      <div className="w-100">
        <NavBar />
      </div>
      <div className="d-flex" style={{ height: "auto", minHeight: "100%" }}>
        <SideBar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
