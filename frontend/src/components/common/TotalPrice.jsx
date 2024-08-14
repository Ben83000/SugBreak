import { CartContext } from "@/contexts/cartContext";
import { motion, AnimatePresence } from "framer-motion";
import { useContext } from "react";

function TotalPrice({className}) {
  const { cartValue, lastAction } = useContext(CartContext);
  const formattedCartValue = cartValue?.toFixed(2).replace(".", ",");

  const downAnimationPrice = {
    hidden: {
      opacity: 0,
      scale: 0,
      translateY: "100%",
    },
    visible: {
      opacity: 1,
      translateY: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      scale: 0,
      translateY: "-100%",
    },
  };

  const upAnimationPrice = {
    hidden: {
      opacity: 0,
      translateY: "-100%",
      scale: 0,
    },
    visible: {
      opacity: 1,
      translateY: 0,
      scale: 1,
    },
    exit: {
      opacity: 0,
      translateY: "100%",
      scale: 0,
    },
  };

  return (
    <AnimatePresence mode="popLayout">
      <motion.p
        variants={lastAction === "more" ? upAnimationPrice : downAnimationPrice}
        initial="hidden"
        animate="visible"
        exit="exit"
        key={formattedCartValue}
        className={className}
      >
        {formattedCartValue}€
      </motion.p>
    </AnimatePresence>
  );
}

export default TotalPrice;
