import ProductCard from "@/components/pages/Ordering/Menu/ProductCard";
import { ProductContext } from "@/contexts/productContext";
import { useContext, useEffect, useState } from "react";
import ProductCrossSell from "./ProductCrossSell";
import { Link } from "react-router-dom";
import { ModalContext } from "@/contexts/modalContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import Loader from "@/components/common/Loader";

function CrossSell() {
  const { getProduct, loading } = useContext(ProductContext);
  const { closeModal } = useContext(ModalContext);
  const [product, setProduct] = useState({});

  console.log(loading)

  useEffect(() => {
    const getBubbleTea = async () => {
      const bubbletea = await getProduct("category", "bubbletea");
      setProduct(bubbletea);
    };
    getBubbleTea();
  }, []);

  return (
    <section className="h-full w-full p-2 flex flex-col gap-2 max-sm:justify-center">
      <h1 className="text-4xl text-center">Une offre à ne pas rater !</h1>
      {loading ? <Loader /> : <ProductCrossSell product={product} reduc={1} />}
      <Link
        to="/checkout"
        onClick={closeModal}
        className="text-2xl underline flex gap-1 justify-center items-center"
      >
        Continuer vers le paiement
        <FontAwesomeIcon icon={faArrowRight} className="text-lg" />
      </Link>
    </section>
  );
}

export default CrossSell;
