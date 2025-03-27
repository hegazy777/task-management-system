import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

export default function MasterLayer() {
  return (
    <div className="master-container">
      <Container fluid className="">
        <Outlet />
      </Container>
    </div>
  );
}
