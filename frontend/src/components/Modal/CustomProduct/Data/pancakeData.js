import { array, object } from "yup";

const transformToObjects = (items, cost) => {
  return items.map((item) => ({ label: item, cost }));
};

export const iceCream = transformToObjects(
  [
    "Fraise",
    "Vanille",
    "Chocolat",
    "Pistache",
    "Banoffee",
    "Noix de Coco",
    "Barbe à Papa",
    "Spéculoos",
    "Praliné Noisette",
    "Caramel salé",
    "Bubble Gum",
    "Brisure d'Oréo",
    "Fleur de Lait",
    "Sorbet Citron",
    "Sorbet Passion",
    "Sorbet Mangue",
  ],
  1
);

export const toppings = transformToObjects(
  [
    "Galak",
    "Crunch",
    "Chocolat au lait",
    "Kinder",
    "Snickers",
    "Granola",
    "Lion",
    "M&m's",
    "Cacahuète",
    "Chamallow",
    "Tagada",
    "Spéculoos",
    "Brownie",
    "Mars",
    "Twix",
    "Daim",
    "Kitkat",
    "Oréo",
    "Bounty",
    "Coco",
  ],
  0.8
);

export const fruits = transformToObjects(["Fraise", "Banane", "Mangue"], 1);

export const coulis = transformToObjects(
  [
    "Fruits rouges",
    "Chocolat",
    "Caramel",
    "Chocolat blanc",
    "Exotique",
    "Spéculoos",
    "Nutella",
    "Peanut Butter",
    "Sirop d'érable",
  ],
  0.6
);

export const pancakeSteps = {
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
      { label: "Supplément chantilly", value: "Oui", cost: 1 },
    ],
  },
};

export const pancakeStepsKey = Object.keys(pancakeSteps);

export const pancakeSchema = object({
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

export const handleCheckPancake = (index, setValues, values, options, name) => {
  if (name === "chantilly") {
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
