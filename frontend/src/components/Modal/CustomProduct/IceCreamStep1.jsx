import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import variants from "../animations";

const IceCreamStep1 = React.forwardRef(
  (
    {
      options,
      title,
      name,
      handleForm,
      step,
      steps,
      handleStep,
      errors,
      getValues,
    },
    ref
  ) => {
    const [values, setValues] = useState([]);
    const [scoops, setScoops] = useState(null); // Nombre de boules choisi
    const { containerCustom, child } = variants;

    // Sert a récupérer les options precédemment choisis si l'utilisateur revient en arriere dans les etapes de custom
    useEffect(() => {
      const data = getValues(name);
      if (data !== undefined && data?.length > 0) {
        setValues(data);
      }
      if (name === "saveurs") {
        const scoopsNumber = getValues("boules");
        setScoops(scoopsNumber[0]?.value);
      }
    }, [step]);

    // recupère la valeur selectionnée
    useEffect(() => {
      if (values.length > 0) {
        handleForm(values, name);
      }
    }, [values]);

    const handleSelectChange = (index, value) => {
      setValues((prevData) => {
        const newData = [...prevData];
        newData[index] = value;
        return newData;
      });
    };

    return (
      <AnimatePresence mode="popLayout">
        {step === 1 && <motion.section
          key={name}
          variants={containerCustom}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="flex flex-col select-none h-full bg-green-200"
        >
          <motion.h2 variants={child} className="text-3xl mb-2 leading-none">
            {title}
          </motion.h2>
          <AnimatePresence mode="popLayout">
            {errors && (
              <motion.p
                key="errorMessage"
                variants={child}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="text-red-600 leading-none -mt-2 my-0.5"
              >
                {errors}
              </motion.p>
            )}
          </AnimatePresence>
          <div className="flex flex-col flex-wrap h-[236px] gap-1 ">
            {Array.from({ length: scoops }).map((_, index) => {
              return (
                <motion.div variants={child} key={index} className="grid grid-cols-3 gap-2">
                  <p className="text-xl">Saveur {index +1}</p>
                  <select
                    className="w-full col-span-2 rounded-lg p-0.5 text-lg"
                    onChange={(e) => handleSelectChange(index, e.target.value)}
                  >
                    <option value="">Choisissez une saveur</option>
                    {options.map((option, i) => {
                      return (
                        <option key={i} value={option.value}>
                          {option.label}
                        </option>
                      );
                    })}
                  </select>
                </motion.div>
              );
            })}
          </div>
          <section className="flex w-full mt-auto gap-2">
            {step > 0 && (
              <motion.button
                key="prevButton"
                type="button"
                onClick={() => handleStep("prev")}
                variants={child}
                className="bg-amber-800/70 hover:bg-amber-800 mt-auto p-1 text-xl w-full text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-800 focus:ring-offset-amber-100"
              >
                Étape précedente
              </motion.button>
            )}
            {step < steps ? (
              <motion.button
                key="nextButton"
                type="button"
                onClick={() => handleStep("next")}
                variants={child}
                className="bg-amber-800/70 hover:bg-amber-800 mt-auto p-1 text-xl w-full text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-800 focus:ring-offset-amber-100"
              >
                Étape suivante
              </motion.button>
            ) : (
              <motion.button
                key="addToCartButton"
                variants={child}
                className="bg-amber-800/70 hover:bg-amber-800 mt-auto p-1 text-xl w-full text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-800 focus:ring-offset-amber-100"
              >
                Ajouter au panier
              </motion.button>
            )}
          </section>
        </motion.section>}
      </AnimatePresence>
    );
  }
);

IceCreamStep1.displayName = "IceCreamStep1";

export default IceCreamStep1;
