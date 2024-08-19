import { useContext, useState } from "react";
import { CartContext } from "@/contexts/cartContext";
import CartProduct from "./CartProduct";
import { Button } from "@/components/ui/button";
import { ModalContext } from "@/contexts/modalContext";
import CrossSell from "@/components/Modal/CrossSell/CrossSell";
import { useNavigate } from "react-router-dom";
import TotalPrice from "@/components/common/TotalPrice";

function Cart() {
  const { cartContent, cartValue } = useContext(CartContext);
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    cartValue >= 15
      ? openModal(
          <CrossSell />,
          e.clientX,
          e.clientY,
          3
        )
      : navigate("/checkout");
  };

  return (
    <section className="bg-slate-200 md:flex md:flex-col hidden select-none font-rancho min-w-72 shadow-deep-shadow z-20 max-h-[calc(100vh-3.5rem)] sticky top-14">
      <div className="text-3xl flex bg-pink-600 p-3 text-slate-100 h-14">
        <p className="">Prix total</p>
        <TotalPrice className="ml-auto" />
      </div>
      {cartContent.length > 0 ? (
        <>
          <section className="max-h-[calc(100vh-7rem)] overflow-y-auto flex flex-col p-2 gap-2">
            {cartContent.map((item, index) => {
              const formattedPrice = item?.product?.price
                .toFixed(2)
                .replace(".", ",");
              return (
                <CartProduct
                  key={index}
                  id={item.product._id}
                  price={formattedPrice}
                  name={item.product.name}
                  category={item.product.category}
                  quantity={item.quantity}
                  img={item.product.imageUrl}
                  base={item.base}
                  customisation={item.customisation}
                />
              );
            })}
          </section>
          <div className="h-16 min-h-16 bg-slate-200 z-50 mt-auto flex items-center justify-center p-2 shadow-custom-admin">
            <Button
              onClick={handleClick}
              className="w-full h-full text-2xl p-0"
            >
              Finaliser la commande
            </Button>
          </div>
        </>
      ) : (
        <div className="p-3">
          <p className="text-4xl">Votre panier est vide.</p>
        </div>
      )}
    </section>
  );
}

export default Cart;
