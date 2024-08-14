import { useContext } from 'react';
import { CartContext } from '@/contexts/cartContext';
import CartProduct from '@/components/pages/Ordering/cart/CartProduct';
import { Button } from '@/components/ui/button';
import { ModalContext } from '@/contexts/modalContext';
import CrossSell from '@/components/Modal/CrossSell/CrossSell';
import { useNavigate } from 'react-router-dom';
import { SheetClose } from '@/components/ui/sheet';
import TotalPrice from '@/components/common/TotalPrice';

function NavCart() {
  const { cartContent, cartValue } = useContext(CartContext);
  const { openModal } = useContext(ModalContext);
  const navigate = useNavigate();

  const handleClick = (e) => {
    cartValue >= 15 ? openModal(<CrossSell />, e.clientX, e.clientY, 3) : navigate('/checkout');
  };

  return (
    <section className="flex flex-col font-rancho min-w-72 flex-grow">
      {cartContent.length > 0 ? (
        <div className="flex flex-col h-full">
          <section className=" overflow-y-scroll flex flex-col gap-2 flex-grow p-4 h-1">
            {cartContent.map((item, index) => {
              const formattedPrice = item?.product?.price.toFixed(2).replace('.', ',');
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
          <SheetClose className="p-2 bg-amber-100 shadow-custom-admin sticky bottom-0 h-24">
            <div className="flex font-semibold">
              <p className='text-3xl'>Prix total</p>
              <TotalPrice className="ml-auto" />
            </div>

            <Button onClick={handleClick} className="w-full text-2xl h-1/2">
              Finaliser la commande
            </Button>
          </SheetClose>
        </div>
      ) : (
        <div className="p-3">
          <p className="text-4xl">Votre panier est vide.</p>
        </div>
      )}
    </section>
  );
}

export default NavCart;
