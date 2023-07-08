import { Navigate } from "react-router-dom";
import { getUserInfo } from "../pages/Authentication/services";

export function PublicRoute({ children }: { children: React.ReactNode }) {
  const user = getUserInfo();
  if (user) return <Navigate to={"/"} replace />;
  return <>{children}</>;
}
