import { getToken } from "../utils/api";
import { Navigate } from "react-router-dom";

export default function RequireAuth({ children }) {
  const authed = Boolean(getToken());
  if (!authed) return <Navigate to="/login" replace />;
  return children;
}


