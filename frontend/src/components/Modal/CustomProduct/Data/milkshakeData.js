import { array, object } from "yup";
import { baseMilkshake, toppings, coulis, fruits } from "./data";

export const milkshakeSteps = {
  base: {
    title: "Choisissez votre base",
    options: [
      ...baseMilkshake.map((item) => ({
        label: item.label,
        value: item.label,
        cost: item.cost,
      })),
    ],
  },
  coulis: {
    title: "Choisissez votre coulis",
    options: [
      { label: "Non, merci.", value: "Non" },
      ...coulis.map((item) => ({
        label: item.label,
        value: item.label,
        cost: item.cost,
      })),
    ],
  },
  gourmandise: {
    title: "Choisissez votre gourmandise",
    options: [
      { label: "Non, merci.", value: "Non" },
      ...toppings.map((item) => ({
        label: item.label,
        value: item.label,
        cost: item.cost,
      })),
    ],
  },
  fruit: {
    title: "Choisissez votre fruit",
    options: [
      { label: "Non, merci.", value: "Non" },
      ...fruits.map((item) => ({
        label: item.label,
        value: item.label,
        cost: item.cost,
      })),
    ],
  },
  chantilly: {
    title: "Supplément chantilly ? (Offerte)",
    options: [
      { label: "Non, merci.", value: "Non" },
      { label: "Supplément chantilly", value: "Oui" },
    ],
  },
};

export const milkshakeStepsKey = Object.keys(milkshakeSteps);

export const milkshakeSchema = object({
  base: array()
    .required("Veuillez faire un choix.")
    .min(1, "Veuillez faire un choix."),
  coulis: array()
    .required("Veuillez faire un choix.")
    .min(1, "Veuillez faire un choix."),
  gourmandise: array()
    .required("Veuillez faire un choix.")
    .min(1, "Veuillez faire un choix."),
  fruit: array()
    .required("Veuillez faire un choix.")
    .min(1, "Veuillez faire un choix."),
  chantilly: array()
    .required("Veuillez faire un choix.")
    .min(1, "Veuillez faire un choix."),
});

export const handleCheckMilkshake = (
  index,
  setValues,
  values,
  options,
  name
) => {
  if (name === "chantilly" || name === "base") {
    setValues([options[index]]);
  } else {
    if (!values?.some((item) => item.value === options[index].value)) {
      if (options[index].value === "Non") {
        setValues([options[index]]);
      } else {
        if (values?.some((item) => item.value === "Non")) {
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
