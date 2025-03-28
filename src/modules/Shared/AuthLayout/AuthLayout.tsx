import { Outlet, Navigate } from "react-router-dom";

import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Container } from "react-bootstrap";
export default function AuthLayer() {
  const { token } = useContext(AuthContext);
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="auth-containe">
      <Container fluid className="">
        <div className="container-fluid w-50 bg-whit rounded col-md-5 px-5 py-3">
          <Outlet />
        </div>
      </Container>
    </div>
  );
}
