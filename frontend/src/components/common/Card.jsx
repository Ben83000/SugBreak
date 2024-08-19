import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

function Card({ children }) {
  return (
    <section className="flex flex-col text-white fixed select-none rounded-3xl bg-pink-950/85 shadow-inner shadow-pink-500 backdrop-blur-sm p-6 py-4 gap-1.5 w-full sm:w-1/3 sm:min-w-96">
      <Link to="/online-ordering" className="self-center">
        <FontAwesomeIcon
          icon={faX}
          size="md"
          className="text-pink-800 bg-white w-fit rounded-full py-1 px-1.5 cursor-pointer hover:bg-pink-300"
        />
      </Link>
      {children}
    </section>
  );
}

Card.propTypes = {
  children: propTypes.node,
};

export default Card;
