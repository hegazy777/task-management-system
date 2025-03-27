import { Outlet } from "react-router-dom";
import { Container } from "react-bootstrap";

export default function AuthLayout() {
  return (
    <div className="auth-container">
      <Container fluid className="">
        <Outlet />
      </Container>
    </div>
  );
}
