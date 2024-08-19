import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import cn from "classnames";
import { ModalContext } from "@/contexts/modalContext";
import { CartContext } from "@/contexts/cartContext";
import AuthContext from "@/contexts/authContext";
import formatPrice from "@/tools/formatPrice";
import Product from "@/components/Modal/Product/Product";
import CustomProduct from "@/components/Modal/CustomProduct/CustomProduct";

ProductCrossSell.propTypes = {
  name: PropTypes.string,
  alt: PropTypes.string,
  img: PropTypes.string,
  description: PropTypes.string,
  price: PropTypes.number,
  category: PropTypes.string,
  id: PropTypes.string,
  custom: PropTypes.bool,
};

function ProductCrossSell({ product, reduc }) {
  const { openModal } = useContext(ModalContext);
  const [oldPrice, setOldPrice] = useState(0);
  const { name, imageUrl, description, category, price } = product;

 useEffect(() => {
  setOldPrice(product?.price);
  
 }, [])

  const handleClick = (e) => {
    e.stopPropagation();
    const reducedPrice = price - 1;
    openModal(<CustomProduct crossSell product={{...product, price: reducedPrice}} />, e.clientX, e.clientY, 2);
  };

  return (
    <section
      onClick={handleClick}
      className={cn(
        "select-none relative flex w-full h-36 text-slate-800 gap-1 p-2 bg-white shadow-custom-lg hover:shadow-custom-dark rounded-xl cursor-pointer overflow-hidden transition-transform duration-300 hover:scale-105"
      )}
    >
      <img
        src={imageUrl ?? `/images/default/${category}.jpg`}
        alt={name}
        className="object-contain aspect-square w-fit"
      />
      <div className="flex flex-grow gap-1 h-full">
        <div className="h-full flex flex-col">
          <h2 className="text-3xl text-amber-900">{name}</h2>
          <p className="text-wrap leading-[1.20rem] text-lg truncate-multiline">{description}</p>
          <div className="flex">
            <p className="text-3xl text-amber-800 mr-1">
              {formatPrice(price - reduc)}€
            </p>
            <p className="line-through text-2xl">{formatPrice(price)}€</p>
          </div>
        </div>
        <Button
          onClick={handleClick}
          className="h-full ml-auto bg-amber-800/70 hover:bg-amber-800 text-white text-5xl p-1 rounded-lg "
        >
          +
        </Button>
      </div>
    </section>
  );
}

export default ProductCrossSell;
