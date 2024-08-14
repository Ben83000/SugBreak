import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

function Payment({ handleStep, checkoutData, setCheckoutData }) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    const fetchPkStripe = async () => {
      const response = await fetch("http://localhost:5000/stripe/config");
      const { publishableKey } = await response.json();
      setStripePromise(loadStripe(publishableKey));
    };
    fetchPkStripe();
  }, []);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      const response = await fetch(
        "http://localhost:5000/stripe/create-payment-intent",
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify({}),
        }
      );
      const { clientSecret } = await response.json();
      setClientSecret(clientSecret);
    };
    fetchPaymentIntent();
  }, []);

  return (
    <div>
      {stripePromise && clientSecret && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <PaymentForm checkoutData={checkoutData} setCheckoutData={setCheckoutData} />
        </Elements>
      )}
    </div>
  );
}

export default Payment;
