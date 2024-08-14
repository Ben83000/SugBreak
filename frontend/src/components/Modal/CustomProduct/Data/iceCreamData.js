import { array, object, string } from "yup";
import { iceCream } from "@/components/Modal/CustomProduct/Data/data";

export const iceCreamSteps = {
  boules: {
    title: "Nombre de boules",
    options: [
      { label: "2 Boules", value: 2 },
      { label: "3 Boules", value: 3, cost: 1.5 },
      { label: "4 Boules", value: 4, cost: 3.5 },
      { label: "5 Boules", value: 5, cost: 5.5 },
    ],
  },
  saveurs: {
    title: "Choisissez vos saveurs",
    options: [
      ...iceCream.map((item) => ({ label: item.label, value: item.label })),
    ],
  },
};

export const iceCreamStepsKey = Object.keys(iceCreamSteps);

export const iceCreamSchema = object({
  boules: array()
    .required("Veuillez faire un choix.")
    .min(1, "Veuillez faire un choix."),
  saveurs: array()
    .required("Veuillez faire un choix.")
    .min(1, "Veuillez faire un choix."),
});

export const handleCheckIceCream = (index, setValues, values, options, name) => {
  if (name === "boules") {
    setValues([options[index]]);
  } else {
    if (!values?.some((item) => item.value === options[index].value)) {
      if (values?.some((item) => item.value === "Non")) {
        setValues([options[index]]);
      } else {
        setValues((prevValues) => [...prevValues, options[index]]);
      }
    } else {
      setValues(values?.filter((item) => item.value !== options[index].value));
    }
  }
};
