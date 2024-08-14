import { useRef, useState } from "react";
import Delivery from "@/components/pages/Checkout/CheckoutForm/Informations";
import Payment from "@/components/pages/Checkout/CheckoutForm/Payment";
import logo from "@/assets/images/logo.png";
import cn from "classnames";
import Shipping from "./Livraison";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function CheckoutForm() {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const steps = ["1.Informations", "2.Livraison", "3.Paiement"];
  const [checkoutData, setCheckoutData] = useState(null);

  const handleStep = (value) => {
    value !== undefined ? setStep(value) : setStep((prevStep) => prevStep + 1);
  };

  const handleClick = () => {
    navigate("/online-ordering");
  };

  return (
    <section className="flex flex-col bg-amber-100 col-span-3 gap-2 flex-grow overflow-y-auto">
      <div className="w-fit pt-8 pl-8">
        <img
          src={logo}
          className="h-24 object-contain self-start cursor-pointer"
          alt="logo"
          onClick={handleClick}
        />
      </div>

      <div className="flex w-full justify-around">
        {steps.map((item, index) => (
          <h2
            className={cn(`text-xl font-semibold`, {
              "cursor-pointer text-amber-900": index <= step,
              "text-amber-900/70": index > step,
            })}
            key={item}
            onClick={index < step ? () => handleStep(index) : null}
          >
            {item}
          </h2>
        ))}
      </div>
      <motion.div
        className="h-1 min-h-1 relative bg-gradient-to-r from-amber-200 via-pink-500 to-amber-900"
        initial={{ width: "0" }}
        animate={{
          width: step === 0 ? "17%" : step === 1 ? "52%" : "84%",
          transition: { type: "spring" },
        }}
      >
        <FontAwesomeIcon
          className="absolute -right-4 -top-1.5 text-pink-600"
          icon={faCircleDot}
        />
      </motion.div>
      {step === 0 ? (
        <Delivery
          handleStep={handleStep}
          setCheckoutData={setCheckoutData}
          checkoutData={checkoutData}
        />
      ) : step === 1 ? (
        <Shipping
          handleStep={handleStep}
          setCheckoutData={setCheckoutData}
          checkoutData={checkoutData}
        />
      ) : step === 2 ? (
        <Payment
          setCheckoutData={setCheckoutData}
          checkoutData={checkoutData}
        />
      ) : null}
    </section>
  );
}

export default CheckoutForm;
