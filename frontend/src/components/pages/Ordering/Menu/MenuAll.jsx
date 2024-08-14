import { useContext } from "react";
import { Element } from "react-scroll";
import ProductCard from "@/components/pages/Ordering/Menu/ProductCard";
import menuData from "@/tools/menu.json";
import { ProductContext } from "@/contexts/productContext";

function MenuAll() {
  const { products } = useContext(ProductContext);

  const categorizedProducts = products.reduce((acc, product) => {
    const category = product.category; // On recupère la catégorie du produit
    if (!acc[category]) {
      // Si l'objet renvoyé par la methode reduce ne contient pas de clé au nom de la categorie de l'objet, on la crée en lui affectant un tableau vide pour le moment
      acc[category] = [];
    }
    acc[category].push(product); // On pousse le produit dans sa categorie qu'on a recupéré + haut
    return acc;
  }, {});

  return (
    <section className="flex flex-col gap-4 pt-2">
      {menuData.map(
        (
          item,
          index // On crée un tableau contenant chaque categorie et on le parcourt pour créer chaque Element
        ) => (
          <Element
            key={index}
            name={item.category}
            className="flex min-w-full flex-col gap-4"
          >
            <h2 className="text-5xl text-center text-amber-900">{item.name}</h2>
            <section className="grid grid-cols-1 lg:grid-cols-2 h-full justify-start gap-2 xs:p-4 sm:p-6">
              {categorizedProducts[item.category] &&
                categorizedProducts[item.category].map(
                  (
                    product,
                    index // on parcourt le tableau correspondant à la catégorie rendue pour afficher les produits correspondants à celle-ci
                  ) => (
                    <ProductCard
                      key={index}
                      product={product}
                    />
                  )
                )}
            </section>
          </Element>
        )
      )}
    </section>
  );
}

export default MenuAll;
