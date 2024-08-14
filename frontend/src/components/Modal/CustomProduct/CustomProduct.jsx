import { AnimatePresence, motion } from "framer-motion";
import variants from "@/components/Modal/animations.js";
import formatPrice from "@/tools/formatPrice";
import { useState } from "react";
import CustomProductForm from "./CustomProductForm";
import { categoryData } from "@/components/Modal/CustomProduct/Data/categoryData";

function CustomProduct({ crossSell, product }) {
  const { name, _id, description, price, category } = product;
  const { container, child } = variants;
  const [totalPrice, setTotalPrice] = useState(price);
  const { steps, stepsKey, schema, handleCheck } = categoryData[category] || {};


  const handlePrice = (value) => {
    setTotalPrice(price + value);
  };

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col p-4 gap-2 mx-auto w-full select-none"
    >
      <section>
        <motion.h1
          variants={child}
          className="text-5xl text-center text-amber-900"
        >
          {name}
        </motion.h1>
        <div className="flex items-center gap-1">
          <motion.p variants={child} className="text-xl">
            {description}
          </motion.p>
          <AnimatePresence mode="popLayout">
            <motion.p
              key={totalPrice}
              variants={child}
              className="text-3xl text-amber-900"
            >
              {formatPrice(totalPrice)}€
            </motion.p>
          </AnimatePresence>
        </div>
      </section>

      <CustomProductForm
        product={product}
        totalPrice={totalPrice}
        handlePrice={handlePrice}
        steps={steps}
        stepsKey={stepsKey}
        handleCheck={handleCheck}
        schema={schema}
        category={category}
        crossSell={crossSell}
      />
    </motion.section>
  );
}

export default CustomProduct;
