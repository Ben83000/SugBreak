import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';

const PrevArrow = ({ onClick, size }) => {
  return (
    <FontAwesomeIcon
      className="absolute bg-white/80 backdrop-blur-sm left-2 z-10 top-1/2 -translate-y-1/2 text-amber-900/70 hover:text-amber-900 cursor-pointer rounded-full p-1"
      onClick={onClick}
      icon={faArrowLeft}
      size={size}
    />
  );
};

PrevArrow.propTypes = {
  onClick: PropTypes.func,
  size: PropTypes.string,
};

export default PrevArrow;
