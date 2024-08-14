import { array, object } from "yup";
import { baseSmoothie, fruitSmoothie } from "./data";

export const smoothieSteps = {
  base: {
    title: "Choisissez votre base",
    options: [
      ...baseSmoothie.map((item) => ({ label: item.label, value: item.label, cost: item.cost })),
    ],
  },
  extraFruit : {
    title: "Fruit(s) supplémentaire(s) ?",
    options: [
      { label: "Non, merci.", value: "Non" },
      ...fruitSmoothie.map((item) => ({ label: item.label, value: item.label, cost: item.cost })),
    ],
  },
};

export const smoothieStepsKey = Object.keys(smoothieSteps);

export const smoothieSchema = object({
  base: array()
    .required("Veuillez faire un choix.")
    .min(1, "Veuillez faire un choix."),
  extraFruit: array()
    .required("Veuillez faire un choix.")
    .min(1, "Veuillez faire un choix."),
});

export const handleCheckSmoothie = (index, setValues, values, options, name) => {
      if (name === "base") {
        setValues([options[index]]);
      } else {
        if (!values?.some(item => item.value === options[index].value)) {
          if (options[index].value === "Non") {
            setValues([options[index]]);
          } else {
            if (values?.some(item => item.value === "Non")) {
              setValues([options[index]]);
            } else {
              setValues((prevValues) => [...prevValues, options[index]]);
            }
          }
        } else {
          setValues(values?.filter((item) => item.value !== options[index].value));
        }
      }
    };
