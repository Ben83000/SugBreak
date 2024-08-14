import express from 'express';
import { getPaymentMethodDetails } from './stripe.routes.js';
import orderModel from '../models/order.model.js';
import { sendConfirmationOrderEmail } from '../auth/sendEmail.js';
import { isAuthentificated } from '../auth/auth.js';

const router = express.Router();

// Route de creation d'une nouvelle commande
router.post('/add', async (req, res) => {
  try {
    const data = req.body; // content, owner, paymentMethod, totalAmount
    const paymentDetailsDecrypted = await getPaymentMethodDetails(data.paymentMethod); // on décrypte le jeton pour recup les infos de paiement pour recuperer le .type (methode de paiement)
    const orderToCreate = {
      ...data,
      paymentMethod: paymentDetailsDecrypted.type,
    };
    const orderCreated = await orderModel.create(orderToCreate); // on crée et on recupère la commande créée
    await sendConfirmationOrderEmail(orderCreated.content, orderCreated.owner, orderCreated.id); // Envoi un mail de confirmation de commande à l'utilisateur
    res.status(200).json({ orderCreated });
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

// Route pour recuperer toutes les commandes
router.get('/all', async (req, res) => {
  try {
    const orders = await orderModel.find();
    if (orders) {
      res.status(200).json({ orders: orders });
    } else {
      res.status(200).json({ message: 'Aucune commande..' });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Problème serveur, veuillez réessayer.',
      error: error,
    });
  }
});

// Route pour recup les commandes d'un user
router.get('/user', isAuthentificated, async (req, res) => {
  try {
    const id = req.user._id; // on recup l'id du user grace au middleware
    const orders = await orderModel.find({ 'owner._id': id.toString() }); // on cherche les orders qui ont l'id de l'utilisateur connecté
    // si des commandes sont trouvées avec son id, on les renvoie
    if (orders) {
      res.status(200).json({
        orders: orders,
      });
    } else {
      res.status(200).json({ message: "Vous n'avez pas encore commandé chez nous.." });
    }
  } catch (error) {
    res.status(500).json({ message: 'Problème serveur, veuillez réessayer.', error: error });
  }
});

export default router;
