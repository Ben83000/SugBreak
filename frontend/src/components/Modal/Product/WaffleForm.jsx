import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { array, object } from "yup";
import { useContext } from "react";
import { CartContext } from "@/contexts/cartContext";
import CustomProductFormSection from "../CustomProduct/CustomProductFormSection";
import { waffleSteps } from "../CustomProduct/Data/waffleData";
import { ModalContext } from "@/contexts/modalContext";

const waffleSchema = object({
  base: array()
    .required("Veuillez choisir une base.")
    .min(1, "Veuillez faire un choix"),
});

function WaffleForm({ product, handlePrice, totalPrice }) {
  const { addToCart } = useContext(CartContext);
  const { closeModal } = useContext(ModalContext);
  const {
    handleSubmit,
    setValue,
    trigger,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(waffleSchema),
  });

  const onSubmit = (data) => {
    addToCart(product, data.base[0].value, totalPrice);
    closeModal();
  };

  const calculateTotalCost = (obj) => {
    let totalCost = 0;
    Object.values(obj).forEach((array) => {
      array.forEach((item) => {
        if (item.cost !== undefined) {
          totalCost += item.cost;
        }
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

  const handleCheck = (index, setValues, values, options, name) => {
    setValues([options[index]]);
  };

  return (
    <form
      className="flex flex-col flex-grow"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CustomProductFormSection
        getValues={getValues}
        name="base"
        options={waffleSteps["base"].options}
        title={waffleSteps["base"].title}
        handleForm={handleForm}
        handleCheck={handleCheck}
        errors={errors.base?.message} // message d'erreur du champs
      />
    </form>
  );
}

export default WaffleForm;
