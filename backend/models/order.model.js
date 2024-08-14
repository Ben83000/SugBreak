import mongoose from "mongoose";
import Counter from "./counter.model.js";

// Fonction pour generer le numero de la commande grace à un document mongoose pour assurer son unicité (eviter 2 commandes avec le meme numero)
const getNextSequenceValue = async (sequenceName) => {
  const now = new Date(); // genere la date
  const yearMonth = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, "0")}`; // extrait l'année, le mois et rajoute un 0 en debut de chaine si le mois est entre 1 et 9 (pour avoir un format '202401')

  const sequenceDocument = await Counter.findOneAndUpdate(
    { _id: sequenceName, yearMonth: yearMonth },
    { $inc: { sequence_value: 1 } }, // incremente la valeur de 1
    { new: true } // renvoie le nouveau doc, cree le doc s'il n'est pas déja créé,
  );

  // Si un nouveau document a été créé, initialisez sequence_value à 1
  if (!sequenceDocument) {
    const documentToCreate = {
      _id: sequenceName,
      sequence_value: 1,
      yearMonth: yearMonth,
    };
    const documentCreated = await Counter.create(documentToCreate);
    return documentCreated.sequence_value;
  }

  return sequenceDocument.sequence_value;
};

/*
id: generé automatiquement à la creation d'un nouveau document 'order' par la fonction getNextSequenceValue()
content: envoyé depuis le front (cartContent du context)
date: generé automatiquement à la création (default: Date.now)
owner: envoyé depuis le front (checkoutData)
status: automatiquement a "pending" à la creation
totalAmount: envoyé depuis front (cartvalue)
paymentInfos: envoyé depuis le front (paymentIntent.payment_method)
*/
const orderSchema = mongoose.Schema({
  id: {
    type: Number,
  },
  content: {
    type: Object,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  owner: {
    type: Object,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "preparing", "completed", "cancelled"],
    default: "pending",
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
  },
});

 // Middleware mongoose pour obtenir un numero de commande unique et l'assigner de suite a l'id de la commande
orderSchema.pre('save', async function (next) {
  if (this.isNew) {
    const now = new Date();
    this.yearMonth = `${now.getFullYear()}${(now.getMonth() + 1).toString().padStart(2, '0')}`;
    this.id = await getNextSequenceValue('orderId');
  }
  next();
});

const Order = mongoose.model("Order", orderSchema);

export default Order;
