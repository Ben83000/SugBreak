import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "@/contexts/authContext";

function ProtectedRoute({ children, redirectTo }) {
  const { auth, loading } = useContext(AuthContext);
  return (
    <>
      {loading ? (
        children
      ) : auth ? (
        children
      ) : (
        <Navigate to={redirectTo} />
      )}
    </>
  );
}

export default ProtectedRoute;
