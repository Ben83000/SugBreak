import Stripe from "stripe";
import express from "express";

const stripe = new Stripe(process.env.SECRET_KEY_STRIPE_TEST);
const router = express.Router();

export const getPaymentMethodDetails = async (paymentMethodId) => {
  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    console.log(paymentMethod);
    return paymentMethod;
  } catch (error) {
    console.log(
      "Erreur lors de la récupération des détails de la méthode de paiement:",
      error
    );
  }
};

router.get("/config", (req, res) => {
  const key = process.env.PUBLIC_KEY_STRIPE_TEST;
  res.send({
    publishableKey: key,
  });
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "eur",
      amount: 1999,
      automatic_payment_methods: {
        enabled: true,
      },
    });
    res.send({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return res.status(400).send({ error: { message: error.message } });
  }
});

export default router;
