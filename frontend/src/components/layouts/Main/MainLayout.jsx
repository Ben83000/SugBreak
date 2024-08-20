import { useContext } from "react";
import Nav from "@/components/layouts/Main/Nav/Nav.jsx";
import propTypes from "prop-types";
import AuthContext from "@/contexts/authContext";
import Loader from "@/components/common/Loader.jsx";
import AdminPanel from "@/components/layouts/Main/AdminPanel/AdminPanel";

function MainLayout({ children }) {
  const { loading } = useContext(AuthContext);

  return (
    <>
      <section className="font-rancho flex flex-col min-h-screen bg-amber-100">
        {loading && <Loader />}
        <Nav />
        {/* <div className="h-14 min-h-14 max-h-14">
        </div> */}
        {children}
        <AdminPanel />
      </section>
    </>
  );
}

MainLayout.propTypes = {
  children: propTypes.node,
};

export default MainLayout;
