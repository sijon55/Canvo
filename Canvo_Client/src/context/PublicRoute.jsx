import { Navigate } from "react-router";
import { useAuth } from "../context/AuthProvider";
import LoadingPage from "../componets/LoadingPage";

export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return   <LoadingPage />

  // If logged in → stop access to login/signup
  if (user) return <Navigate to="/chat" replace />;

  return children;
}
