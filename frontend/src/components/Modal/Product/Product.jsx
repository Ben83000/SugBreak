import { motion, AnimatePresence } from 'framer-motion';
import variants from '@/components/Modal/animations.js';
import formatPrice from '@/tools/formatPrice';
import WaffleForm from './WaffleForm';
import { useContext, useState } from 'react';
import { CartContext } from '@/contexts/cartContext';
import { ModalContext } from '@/contexts/modalContext';

function Product({ product }) {
  const { container, child, image } = variants;
  const { name, description, imageUrl, category, _id, price } = product;
  const { addToCart } = useContext(CartContext);
  const { closeModal } = useContext(ModalContext);
  const [totalPrice, setTotalPrice] = useState(price);

  console.log(product);

  const handleClick = () => {
    addToCart(product);
    closeModal();
  };

  const handlePrice = (value) => {
    setTotalPrice(price + value);
  };

  return (
    <section className="flex max-sm:flex-col w-full h-full p-4 gap-4 select-none ">
      <div className="w-full bg-white flex items-center justify-center rounded-xl">
        <motion.img
          variants={image}
          initial="hidden"
          animate="visible"
          src={imageUrl ?? `/images/default/${category}.jpg`}
          alt="Image du produit"
          className="product-contain h-full rounded-xl max-w-80"
        />
      </div>

      <motion.section
        variants={container}
        initial="hidden"
        animate="visible"
        className="flex flex-col flex-grow gap-1 w-full">
        <motion.h1 variants={child} className="text-5xl text-amber-900">
          {name}
        </motion.h1>
        <motion.p variants={child} className="text-xl leading-tight">
          {description}
        </motion.p>
        <AnimatePresence mode="wait">
          <motion.p
            key={totalPrice} // Utiliser totalPrice comme clé pour réinitialiser l'animation à chaque changement de prix
            variants={child}
            className="text-3xl text-amber-900">
            {formatPrice(totalPrice)}€
          </motion.p>
        </AnimatePresence>

        {category === 'waffle' ? (
          <WaffleForm product={product} handlePrice={handlePrice} totalPrice={totalPrice} />
        ) : (
          <motion.button
            onClick={handleClick}
            variants={child}
            tabIndex="2"
            className="bg-amber-800/70 hover:bg-amber-800 mt-auto p-1 text-xl text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-800 focus:ring-offset-amber-100">
            Ajouter au Panier
          </motion.button>
        )}
      </motion.section>
    </section>
  );
}

export default Product;
