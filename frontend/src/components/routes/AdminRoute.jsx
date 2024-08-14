import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "@/contexts/authContext";

function AdminRoute({ children, redirectTo }) {
  const { admin, loading } = useContext(AuthContext);

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : admin ? (
        children
      ) : (
        <Navigate to={redirectTo} />
      )}
    </>
  );
}

export default AdminRoute;
