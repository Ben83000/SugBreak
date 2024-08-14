import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "@/contexts/authContext";

function PublicRoute({ children, redirectTo }) {
  const { auth, loading } = useContext(AuthContext);
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : !auth ? (
        children
      ) : (
        <Navigate to={redirectTo} />
      )}
    </>
  );
}

export default PublicRoute;
