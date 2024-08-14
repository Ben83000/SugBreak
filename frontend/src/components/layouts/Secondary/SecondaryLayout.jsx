import propTypes from "prop-types";
import bgImage from "@/assets/images/bg-login.jpg";
import { useContext } from "react";
import AuthContext from "@/contexts/authContext";
import Loader from "@/components/common/Loader";

function SecondaryLayout({ children }) {
  const { loading } = useContext(AuthContext);

  return (
    
    <section className="flex flex-col min-h-screen font-lato">
      {loading && <Loader />}
      <img
        src={bgImage}
        alt="background image"
        className="object-cover fixed h-full w-full"
      />
      <div className="fixed w-full h-full bg-black/40"></div>
      <section className="flex flex-grow justify-center items-center relative">
        {children}
      </section>
    </section>
  );
}

SecondaryLayout.propTypes = {
  children: propTypes.node,
};

export default SecondaryLayout;
