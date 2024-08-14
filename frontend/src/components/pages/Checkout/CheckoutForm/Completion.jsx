import { CartContext } from "@/contexts/cartContext";
import React, { useContext, useEffect } from "react";

function Completion() {
  const { updateCart } = useContext(CartContext);
  useEffect(() => {
    updateCart([]);
  }, []);

  return (
    <div>
      <h2>Paiement réussi !</h2>
      <p>Un mail de confirmation vient de vous être envoyé </p>
    </div>
  );
}

export default Completion;
