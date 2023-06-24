import { Navigate } from "react-router-dom";
import { getUserInfo } from "../pages/Authentication/services";

export function PrivateRoute({ children }: { children: React.ReactNode }) {
  const user = getUserInfo();
  if (!user) return <Navigate to={"/auth/signin"} replace />;
  return <>{children}</>;
}
