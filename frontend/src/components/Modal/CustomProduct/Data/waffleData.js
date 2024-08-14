import { array, object } from "yup";
import { toppings, iceCream, fruits, coulis } from "./data";

export const waffleSteps = {
  base: {
    title: "Choisissez votre base",
    options: [
      { label: "Crêpe", value: "Crepe" },
      { label: "Gaufre", value: "Gaufre", cost: 1 },
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
  glace: {
    title: "Supplément boule de glace ?",
    options: [
      { label: "Non, merci.", value: "Non" },
      ...iceCream.map((item) => ({
        label: item.label,
        value: item.label,
        cost: item.cost,
      })),
    ],
  },
  chantilly: {
    title: "Supplément chantilly ?",
    options: [
      { label: "Non, merci.", value: "Non" },
      { label: "Supplément chantilly", value: "Oui", cout: 1 },
    ],
  },
};

export const waffleStepsKey = Object.keys(waffleSteps);

export const waffleSchema = object({
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
  glace: array()
    .required("Veuillez faire un choix.")
    .min(1, "Veuillez faire un choix."),
  chantilly: array()
    .required("Veuillez faire un choix.")
    .min(1, "Veuillez faire un choix."),
});

export const handleCheckWaffle = (index, setValues, values, options, name) => {
  if (name === "base" || name === "chantilly") {
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
