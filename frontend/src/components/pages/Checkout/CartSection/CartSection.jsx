import { CartContext } from "@/contexts/cartContext";
import { useContext } from "react";
import CartProduct from "../../Ordering/cart/CartProduct";
import { Separator } from "@/components/ui/separator";
import TotalPrice from "@/components/common/TotalPrice";

function CartSection() {
  const { cartContent } = useContext(CartContext);

  return (
    <section className="max-md:hidden flex flex-col col-span-2 max-h-full sticky top-0 font-rancho overflow-hidden">
      <div className="bg-amber-100 h-14 min-h-14 flex justify-center items-center sticky">
        <h2 className="text-4xl font-semibold text-center uppercase">
          Votre commande
        </h2>
      </div>
      <section className="flex flex-col p-4 gap-2 h-full overflow-y-auto rounded-tl-2xl bg-amber-50 overflow-hidden">
        <div className="flex flex-col gap-2">
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
        </div>
      </section>
      <div className="flex flex-col text-4xl font-semibold bg-amber-50 h-24 mt-auto sticky p-4">
        <Separator className="" />
        <div className="flex w-full mt-auto">
          <p className="uppercase">Prix total</p>
          <TotalPrice className="ml-auto"/>
        </div>
      </div>
    </section>
  );
}

export default CartSection;
