import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  return (
    <div>
      Dashboard
      {/* <button className="btn btn-danger" onClick={() => logout()}>
        Logout
      </button> */}
    </div>
  );
}
