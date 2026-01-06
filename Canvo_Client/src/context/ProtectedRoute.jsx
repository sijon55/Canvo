import { Navigate } from "react-router";
import { useAuth } from "../context/AuthProvider";
import LoadingPage from "../componets/LoadingPage";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}
