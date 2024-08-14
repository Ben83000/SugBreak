import { array, object } from "yup";
import { sirup, poppingBoba } from "./data";

export const bubbleTeaSteps = {
  taille: {
    title: "Choisissez votre taille",
    options: [
      { label: "Moyen", value: "Moyen" },
      { label: "Grand", value: "Grand", cost: 1 },
    ],
  },
  sirop: {
    title: "Choisissez votre sirop",
    options: [
      ...sirup.map((item) => ({ label: item.label, value: item.label })),
    ],
  },
  popping: {
    title: "Choisissez votre popping boba",
    options: [
      ...poppingBoba.map((item) => ({ label: item.label, value: item.label })),
    ],
  },
};

export const bubbleTeaStepsKey = Object.keys(bubbleTeaSteps);

export const bubbleTeaSchema = object({
  taille: array()
    .required("Veuillez faire un choix.")
    .min(1, "Veuillez faire un choix."),
  sirop: array()
    .required("Veuillez faire un choix.")
    .min(1, "Veuillez faire un choix."),
  popping: array()
    .required("Veuillez faire un choix.")
    .min(1, "Veuillez faire un choix."),
});

export const handleCheckBubbleTea = (index,  setValues,  values,  options,  name) => {
  setValues([options[index]]);
};
