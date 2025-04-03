import { Container, Row, Col } from "react-bootstrap";

import { Outlet } from "react-router-dom";
import SideBar from "../SideBar/SideBar";
import NavBar from "../NavBar/NavBar";

const Layout = () => {
  return (
   <>

<div className="">
   
   <div className="sidebar-container bg-warning">
     
     <NavBar />
   </div>
   </div>


   <div className="content-container d-flex flex-column flex-grow-1">
   <div className="d-flex vh-100">

   <div className="sidebar-container">
     
   <SideBar />
   </div>
   
     <div className="flex-grow-1 p-3">
       <Outlet />
     </div>
   </div>
 </div>
   </>

  );
};

export default Layout;
