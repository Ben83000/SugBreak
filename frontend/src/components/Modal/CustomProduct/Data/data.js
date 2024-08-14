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
  2
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

export const baseMilkshake = transformToObjects([
  "Fleur de lait",
  "Vanille",
  "Chocolat",
  "Fraise",
]);

export const baseSmoothie = transformToObjects([
  "Ananas",
  "Banane",
  "Citron vert",
  "Fraise",
  "Mangue",
  "Passion",
]);

export const fruitSmoothie = transformToObjects(
  ["Ananas", "Banane", "Citron vert", "Fraise", "Mangue", "Passion"],
  1
);

export const sirup = transformToObjects([
  "Fruit de la passion",
  "Mangue",
  "Framboise",
  "Pomme verte",
  "Pêche blanche",
  "Pastèque",
  "Myrtille",
]);

export const poppingBoba = transformToObjects([
  "Fraise",
  "Kiwi",
  "Ananas",
  "Citron",
  "Passion",
  "Mangue",
  "Litchi",
]);

export const softDrink = transformToObjects([
  "Iced Tea",
  ""
])
