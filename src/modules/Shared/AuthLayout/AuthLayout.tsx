import { Outlet, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import AuthLogo from "../AuthLogo/AuthLogo";
export default function AuthLayer() {
  const { token } = useContext(AuthContext);
  if (token) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="auth">
      <div className="w-50">
        <div className="d-flex justify-content-center">
          <AuthLogo />
        </div>
        <Outlet />
      </div>
    </div>
  );
}
