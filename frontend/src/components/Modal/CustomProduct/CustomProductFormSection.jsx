import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import variants from "../animations";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import formatPrice from "@/tools/formatPrice";
import cn from "classnames";

const CustomProductFormSection = React.forwardRef(
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
      handleCheck,
      category,
      crossSell
    },
    ref
  ) => {
    const [values, setValues] = useState([]); // valeurs de la page du formulaire en cours qu'on envoie dans data
    const { containerCustom, child } = variants;
    const [scoops, setScoops] = useState(null); // Nombre de boules choisi

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

    // recupère la valeur cochée
    useEffect(() => {
      if (values.length > 0) {
        handleForm(values, name);
      }
    }, [values]);

    // pour recuperer les valeurs des select de icecream step 1 (choix des saveurs)
    const handleSelectChange = (index, value) => {
      setValues((prevData) => {
        const newData = [...prevData]; // copie du tableau 
        newData[index] = value; // on remplace la valeur dans le tableau
        return newData; // on retourne le nouveau tableau
      });
    };

    return (
      <AnimatePresence mode="popLayout">
        <motion.section
          key={name}
          variants={containerCustom}
          initial="hidden"
          animate="visible"
          exit="exit"
          ref={ref}
          className="flex flex-col select-none flex-grow h-full"
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
          {category === "icecream" && step === 1 ? (
            <div className="flex flex-col flex-wrap h-[236px] gap-1 ">
              {Array.from({ length: scoops }).map((_, index) => {
                return (
                  <motion.div
                    variants={child}
                    key={index}
                    className="grid grid-cols-3 gap-2"
                  >
                    <p className="text-xl">Saveur {index + 1}</p>
                    <select
                      className="w-full col-span-2 rounded-lg p-0.5 text-lg"
                      onChange={(e) =>
                        handleSelectChange(index, e.target.value)
                      }
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
          ) : (
            <div className={cn(`flex flex-col flex-wrap  gap-x-2`, {
              "h-[236px]" : category
            })}>
              {options?.map((item, index) => {
                return (
                  <motion.div
                    key={item.value}
                    variants={child}
                    className="flex gap-1.5"
                  >
                    <div
                      onClick={() =>
                        handleCheck(index, setValues, values, options, name)
                      }
                      className="w-4 h-4 aspect-square cursor-pointer bg-white border-2 border-amber-900 rounded-sm flex items-center"
                    >
                      {values.some((value) => value.value === item.value) && (
                        <FontAwesomeIcon
                          icon={faCheck}
                          className="text-lg text-amber-800 mb-0.5"
                        />
                      )}
                    </div>
                    <div className="flex w-full leading-tight ">
                      <p
                        className="cursor-pointer"
                        onClick={() =>
                          handleCheck(index, setValues, values, options, name)
                        }
                      >
                        {item.label}
                      </p>
                      {item.cost && (
                        <p className="ml-auto">+{formatPrice(item.cost)}€</p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
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
            ) : !crossSell ? (
              <motion.button
                key="addToCartButton"
                variants={child}
                className="bg-amber-800/70 hover:bg-amber-800 mt-auto p-1 text-xl w-full text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-800 focus:ring-offset-amber-100"
              >
                Ajouter au panier
              </motion.button>
            ) : (
              <motion.button
                key="finalizeButton"
                variants={child}
                className="bg-amber-800/70 hover:bg-amber-800 mt-auto p-1 text-xl w-full text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-amber-800 focus:ring-offset-amber-100"
              >
                Passer au paiement
              </motion.button>
            )}
          </section>
        </motion.section>
      </AnimatePresence>
    );
  }
);

CustomProductFormSection.displayName = "CustomProductFormSection";

export default CustomProductFormSection;
