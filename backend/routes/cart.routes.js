import express from 'express';
import userModel from '../models/user.model.js';
import productModel from '../models/product.model.js';
import { isAuthentificated } from '../auth/auth.js';

const router = express.Router();

router.get('/', isAuthentificated, async (req, res) => {
  try {
    const userId = req.user._id;
    if (userId) {
      const user = await userModel.findById(userId);
      if (user) {
        res.status(200).json(user.cart);
      } else {
        res.status(404).json({ message: "L'utilisateur n'a pas été trouvé." });
      }
    } else {
      res.status(404).json({ message: 'Aucun id utilisateur.' });
    }
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

// Route pour les produits custom
router.post('/add/custom/:id/:totalPrice', isAuthentificated, async (req, res) => {
  try {
    const customisation = req.body;
    const { id, totalPrice } = req.params;
    const userId = req.user._id;
    let productToAdd = await productModel.findById(id);
    if (totalPrice !== undefined) productToAdd.price = totalPrice;
    if (userId) {
      let updatedUser;
      updatedUser = await userModel.findOneAndUpdate(
        { _id: userId },
        {
          $push: {
            cart: {
              product: productToAdd,
              quantity: 1,
              customisation: customisation,
            },
          },
        },
        { new: true }
      );
      res.status(200).json({ message: "Ajouté au panier.", cart: updatedUser.cart });
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

// route pour les produits normaux
router.post('/add/:id/:base/:totalPrice', isAuthentificated, async (req, res) => {
  try {
    const { id, base, totalPrice } = req.params;
    let productToAdd = await productModel.findById(id);
    if (totalPrice !== undefined) productToAdd.price = totalPrice;
    const userId = req.user._id;
    if (userId) {
      const user = await userModel.findById(userId);
      if (user) {
        let updatedUser;
        // Si le produit à ajouter est une crêpe ou une gaufre
        if (base === 'Gaufre' || base === 'Crepe') {
          const existingItem = await user.cart.find(
            (item) => item.product._id.toString() === productToAdd._id.toString() && item.base === base
          );
          // S'il y a un produit qui a meme id + meme base dans le panier de l'utilisateur, alors on augmente sa quantité de 1
          if (existingItem) {
            updatedUser = await userModel.findOneAndUpdate(
              {
                _id: userId,
                'cart._id': existingItem._id,
              },
              { $inc: { 'cart.$.quantity': 1 } },
              { new: true }
            );
          }
          // Sinon si pas de produit avec meme id + base, alors on le rajoute au panier
          else {
            updatedUser = await userModel.findOneAndUpdate(
              { _id: userId },
              {
                $push: {
                  cart: { product: productToAdd, quantity: 1, base: base },
                },
              },
              { new: true }
            );
          }
        }
        // Sinon si le produit n'est pas une crepe/gaufre
        else {
          const index = user.cart.findIndex((item) => {
            return item.product._id.toString() === productToAdd._id.toString();
          });
          // Si on ne trouve pas de produit avec cet id dans le panier de l'utilisateur, alors on le rajoute
          if (index === -1) {
            updatedUser = await userModel.findOneAndUpdate(
              { _id: userId },
              {
                $push: {
                  cart: {
                    product: productToAdd,
                    quantity: 1,
                    base: productToAdd.category === 'waffle' ? base : null,
                  },
                },
              },
              { new: true }
            );
          } // Sinon s'il existe déja un produit avec cet _id dans le panier de l'utilisateur, alors on augmente juste sa quantité de 1
          else {
            updatedUser = await userModel.findOneAndUpdate(
              { _id: userId, 'cart._id': user.cart[index]._id },
              { $inc: { 'cart.$.quantity': 1 } },
              { new: true }
            );
          }
        }
        res.status(200).json({ message: 'Ajouté au panier.', cart: updatedUser.cart });
      } else {
        res.status(500).json({ message: 'Utilisateur introuvable, veuillez réessayer.' });
      }
    }
  } catch (error) {
    res.status(500).json({
      message: 'Erreur lors de la sauvegarde du panier.',
      error: error,
    });
  }
});

router.patch('/:id/:action', isAuthentificated, async (req, res) => {
  try {
    const { id, action } = req.params; // id du produit a modifier et action a realiser sur la quantité + ou -
    const userId = req.user._id; // userId recup par le middleware de verif d'auth isAuthentificated
    const user = await userModel.findById(userId); // recup du document user pour effectuer les modif
    // si user non trouvé
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé.' });
    }
    // on recup le produit a modifier
    const cartProductToModifyQuantity = user.cart.find((item) => item.product._id.toString() === id);
    let updatedUser;
    // Si le produit à modifier a deja une quantité de 1 et que l'utilisateur souhaite diminuer, alors on supprime le produit
    if (cartProductToModifyQuantity.quantity === 1 && action === 'less') {
      updatedUser = await userModel.findOneAndUpdate(
        { _id: userId },
        { $pull: { cart: { _id: cartProductToModifyQuantity._id } } },
        { new: true }
      );
    }
    // Sinon on modifie simplement la quantité du produit
    else {
      updatedUser = await userModel.findOneAndUpdate(
        { _id: userId, 'cart._id': cartProductToModifyQuantity._id },
        { $inc: { 'cart.$.quantity': action === 'more' ? 1 : -1 } },
        { new: true }
      );
    }
    res.status(200).json({ cart: updatedUser.cart });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur, veuillez réessayer.', error: error });
  }
});

router.patch('/clean', isAuthentificated, async (req, res) => {
  const id = req.user._id;
  const userUpdated = await userModel.findOneAndUpdate({ _id: id }, { $set: { cart: [] } }, { new: true });
  if (!userUpdated) {
    res.status(404).json({ message: 'Utilisateur non trouvé' });
  } else {
    res.status(200).json({ message: 'Panier vidé' });
  }
});

export default router;
