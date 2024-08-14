import Stripe from "stripe";
import express from "express";

const stripe = new Stripe(process.env.SECRET_KEY_STRIPE_TEST);
const router = express.Router();

// Methode pour recuperer les infos de paiement (methode de paiement, etc) d'une transaction
export const getPaymentMethodDetails = async (paymentMethodId) => {
  try {
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);
    return paymentMethod;
  } catch (error) {
    console.log(
      "Erreur lors de la récupération des détails de paiement:",
      error
    );
  }
};

// Route de recupération de la clé stripe public
router.get("/config", (req, res) => {
  const key = process.env.PUBLIC_KEY_STRIPE_TEST;
  res.send({
    publishableKey: key,
  });
});

// Route de création d'intention de paiement
router.post("/create-payment-intent", async (req, res) => {
  try {
    const total = req.body.amount; // on recup le montant de la commande
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "eur",
      amount: total * 100,
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
