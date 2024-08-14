import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext, useState } from "react";
import { CartContext } from "@/contexts/cartContext";
import CustomProductFormSection from "./CustomProductFormSection";
import { ModalContext } from "@/contexts/modalContext";
import { useNavigate } from "react-router-dom";

function CustomProductForm({
  product,
  handlePrice,
  totalPrice,
  steps,
  stepsKey,
  schema,
  handleCheck,
  category,
  crossSell,
}) {
  const [step, setStep] = useState(0);
  const { closeModal } = useContext(ModalContext);
  const { addToCartCustom } = useContext(CartContext);
  const navigate = useNavigate();
  const {
    handleSubmit,
    trigger,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    addToCartCustom(product, data, totalPrice);
    closeModal();
    if (crossSell) {
      navigate("/checkout");
    }
  };

  const handleStep = async (action) => {
    const field = stepsKey[step];
    if (action === "next" && field !== null) {
      const valid = await validateField(field);
      valid && setStep(step + 1);
    } else if (action === "prev") {
      setStep(step - 1);
    }
  };

  const validateField = async (field) => {
    const valid = await trigger(field);
    return valid;
  };

  const calculateTotalCost = (obj) => {
    let totalCost = 0;

    Object.values(obj).forEach((array) => {
      array.forEach((item) => {
        item.cost !== undefined ? (totalCost += item.cost) : -1;
      });
    });

    return totalCost;
  };

  const handleForm = async (values, name) => {
    setValue(name, values);
    // Si une erreur était affichée, on relance la validation pour qu'elle s'enlève si pu d'erreur
    if (errors[name]?.message) {
      await trigger(name);
    }
    const datas = getValues();
    const totalCost = calculateTotalCost(datas);
    handlePrice(totalCost);
  };

  return (
    <form
      className="bg-amber-200 flex flex-col rounded-2xl overflow-hidden h-full p-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      {stepsKey.map((key, index) => {
        if (step === index) {
          return (
            <CustomProductFormSection
              key={key}
              handleForm={handleForm} //
              title={steps[key]?.title} // titre du champs (ex: Choissisez votre base, coulis, etc)
              options={steps[key]?.options} // Options du champs en question
              name={key} // Nom du champs
              step={step} // Etape en cours
              steps={stepsKey?.length - 1} // Nombre d'étapes du formulaire de customisation
              handleStep={handleStep}
              errors={errors[key]?.message} // message d'erreur du champs
              getValues={getValues}
              handleCheck={handleCheck}
              category={category}
              crossSell={crossSell}
            />
          );
        }
      })}
    </form>
  );
}

export default CustomProductForm;
