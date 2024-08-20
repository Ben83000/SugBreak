import React, { useContext, useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import PaymentForm from './PaymentForm';
import { CartContext } from '@/contexts/cartContext';
import config from '@/config/config';

function Payment({ handleStep, checkoutData, setCheckoutData }) {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const { cartValue } = useContext(CartContext);

  useEffect(() => {
    const fetchPkStripe = async () => {
      const response = await fetch(`${config.apiUrl}/stripe/config`);
      const { publishableKey } = await response.json();
      setStripePromise(loadStripe(publishableKey));
    };
    fetchPkStripe();
  }, []);

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      const response = await fetch(`${config.apiUrl}/stripe/create-payment-intent`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({amount: cartValue}),
      });
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
