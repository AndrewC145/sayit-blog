import { useAuth } from "@/context/AuthContext";
import ErrorPage from "./ErrorPage";

type ProtectedRouteProps = {
  children: React.ReactNode;
  allowedRoles?: string[];
};

function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user } = useAuth();
  console.log("User in ProtectedRoute:", user);

  if (
    user === null ||
    user === undefined ||
    !allowedRoles?.includes(user.role)
  ) {
    return <ErrorPage />;
  }

  return children;
}

export default ProtectedRoute;
