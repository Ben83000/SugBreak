import { useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

const BackButton = ({className}) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1)
  }

  return (
    <button onClick={handleClick} className={cn(`underline select-none text-2xl gap-1 flex justify-center items-center w-fit h-fit, ${className}`)}>
      <FontAwesomeIcon icon={faAngleLeft} />
      Retour
    </button>
  );
};

export default BackButton;
