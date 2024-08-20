import PropTypes from 'prop-types';
import { useContext } from 'react';
import { Button } from '@/components/ui/button';
import cn from 'classnames';
import { ModalContext } from '@/contexts/modalContext';
import { CartContext } from '@/contexts/cartContext';
import AuthContext from '@/contexts/authContext';
import formatPrice from '@/tools/formatPrice';
import Product from '@/components/Modal/Product/Product';
import CustomProduct from '@/components/Modal/CustomProduct/CustomProduct';
import { AdminContext } from '@/contexts/adminContext';
import { ProductContext } from '@/contexts/productContext';

ProductCard.propTypes = {
  name: PropTypes.string,
  alt: PropTypes.string,
  img: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
  id: PropTypes.string,
  custom: PropTypes.bool,
};

function ProductCard({ product }) {
  const { openModal } = useContext(ModalContext);
  const { auth } = useContext(AuthContext);
  const { adminMode } = useContext(AdminContext);
  const { addToCart } = useContext(CartContext);
  const { handleProductToModify } = useContext(ProductContext);
  // eslint-disable-next-line react/prop-types
  const { name, imageUrl, alt, description, category, _id, price, custom } = product;

  const handleClick = (e) => {
    if (adminMode) {
      handleProductToModify(product);
    } else {
      !custom
        ? openModal(<Product product={product} />, e.clientX, e.clientY)
        : openModal(<CustomProduct product={product} />, e.clientX, e.clientY, 2);
    }
  };

  return (
    <section
      onClick={handleClick}
      className={cn(
        'select-none relative grid grid-cols-3 w-full min-w-72 h-36 text-slate-800 gap-1 p-2 bg-white shadow-custom-lg hover:shadow-custom-dark rounded-xl cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105'
      )}>
        <img
          src={imageUrl ?? `/images/default/${category}.jpg`}
          alt={alt}
          className="h-32 aspect-square"
        />


      <div className="flex flex-grow col-span-2 gap-1 h-full">
        <div className="h-full flex flex-col">
          <h2 className="text-3xl text-amber-900 leading-tight">{name}</h2>
          <p className="text-wrap leading-[1.20rem] text-lg truncate-multiline">{description}</p>
          <p className="text-2xl text-amber-900 mt-auto">{formatPrice(price)}€</p>
        </div>
        <Button
          onClick={(e) => {
            e.stopPropagation();

            custom
              ? openModal(<CustomProduct product={product} />, e.clientX, e.clientY, 2)
              : category === 'waffle'
                ? openModal(<Product product={product} />, e.clientX, e.clientY)
                : addToCart(product);
          }}
          className="h-full ml-auto bg-amber-800/70 hover:bg-amber-800 text-white text-5xl p-1 rounded-lg ">
          +
        </Button>
      </div>
    </section>
  );
}

export default ProductCard;
