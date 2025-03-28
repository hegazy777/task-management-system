import { Navigate } from "react-router-dom";
import { useContext, ReactNode } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { token } = useContext(AuthContext);
  return token ? children : <Navigate to="/" />;
}
