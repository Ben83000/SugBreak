import { useContext, useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import AuthContext from "@/contexts/authContext";
import { CartContext } from "@/contexts/cartContext";

function PaymentForm({ handleStep, checkoutData, setCheckoutData }) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user, auth } = useContext(AuthContext);
  const { cartContent, cartValue, cleanCart } = useContext(CartContext);
  console.log(checkoutData);

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      return;
    }
    setIsProcessing(true);
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      redirect: "if_required",
    });
    if (error) {
      setMessage(error.message);
    } else {
      // Si pas d'error, donc paiement reussi..
      const payload = {
        content: cartContent, // contenu du panier
        owner: { ...checkoutData, _id: user?._id || undefined }, // qui a commandé (si authentifé, on envoie aussi le userId, sinon undefined)
        paymentMethod: paymentIntent.payment_method, // methode de paiement (sous forme de jeton pour securiser le transfert de données)
        totalAmount: cartValue, // montant total de la commande
      };
      const response = await fetch("http://localhost:5000/order/add", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
      cleanCart();
      // navigate("/Completion")
    }
    setIsProcessing(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" flex flex-col w-2/3 mx-auto mt-8 gap-4"
    >
      <PaymentElement />
      <button
        disabled={isProcessing}
        className=" bg-slate-900 text-white text-xl p-2 border-none rounded-xl font-semibold hover:bg-slate-950"
      >
        {isProcessing ? "Paiement en cours.." : "Payer"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default PaymentForm;
