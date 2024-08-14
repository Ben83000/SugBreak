import { CartContext } from "@/contexts/cartContext";
import { faEye, faMinus, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import { useContext } from "react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import HoverCompoCard from "@/components/pages/Ordering/cart/HoverCompoCard";
import cn from "classnames";

function CartProduct({
  id,
  img,
  category,
  name,
  price,
  quantity,
  base,
  customisation,
  dark
}) {
  const { handleQuantity } = useContext(CartContext);

  return (
    <section
      className={cn(" gap-1 rounded-lg overflow-hidden p-1 shadow-custom-light hover:shadow-custom-dark flex min-h-20 h-20", 
        dark ? "bg-pink-600 text-white" : "bg-white text-slate-900"
      )}
    >
      <img
        src={img || `/images/default/${category}.jpg`}
        alt="Image du produit"
        className="rounded-lg"
      />
      <div className="flex flex-col text-xl leading-none">
        <div className="flex gap-1 items-baseline">
          <p className="text-wrap text-2xl leading-none capitalize">
            {customisation
              ? category === "icecream"
                ? "Glace Perso"
                : category + " perso"
              : name}
          </p>
        </div>

        {customisation && (
          <HoverCard>
            <HoverCardTrigger className="text-2xl leading-none text-amber-700 cursor-pointer">
              Composition
              <FontAwesomeIcon icon={faEye} className="ml-1 text-lg" />{" "}
            </HoverCardTrigger>
            <HoverCardContent className="bg-amber-100/80 backdrop-blur-sm rounded-xl overflow-hidden shadow-custom-dark">
              <HoverCompoCard customisation={customisation} />
            </HoverCardContent>
          </HoverCard>
        )}
        <div className="flex mt-auto gap-1">
          <p className=" text-amber-900">{price}€</p>
          {base && <p>{base}</p>}
        </div>
      </div>
      <div
        className="bg-pink-100 flex flex-col w-6 min-w-6 ml-auto self-center items-center justify-center rounded-full overflow-hidden divide-y-2 divide-dotted divide-white
      "
      >
        <button
          onClick={() => handleQuantity(id, "more")}
          className="flex w-full py-1 items-center justify-center"
        >
          <FontAwesomeIcon className="text-sm" icon={faPlus} />
        </button>
        <p className="text-lg text-pink-800 text-center leading-tight w-full">
          {quantity}
        </p>
        <button
          onClick={() => handleQuantity(id, "less")}
          className="flex w-full py-1 items-center justify-center"
        >
          <FontAwesomeIcon className="text-sm" icon={faMinus} />
        </button>
      </div>
    </section>
  );
}

CartProduct.propTypes = {
  id: PropTypes.string,
  img: PropTypes.string,
  category: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  quantity: PropTypes.number,
};

export default CartProduct;
