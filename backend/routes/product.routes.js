import express from "express";
import productModel from "../models/product.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await productModel.find();
    if (products) {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors du chargement, veuillez actualiser la page.",
    });
  }
});

router.get("/search", async (req, res) => {
  try {
    const query = req.query;
    if (query) {
      const product = await productModel.findOne(query);
      if (product) {
        res.status(200).json(product);
      } else {
        res
          .status(404)
          .json({ message: "Produit non trouvé, veuillez réessayer." });
      }
    } else {
      res
        .status(404)
        .json({ message: "Mauvaise requête, veuillez réessayer." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur de connexion au serveur, veuillez réessayer.",
      error: error,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id; // id du produit à supprimer
    const productToDelete = await productModel.findById(id); // On recherche le produit pour vérifier s'il existe et stocker son nom
    // Si le produit existe..
    if (productToDelete) {
      const productName = productToDelete.name; // On stocke le nom du produit à supprimer pour l'afficher dans le message de confirmation
      const deletedProduct = await productModel.deleteOne({ _id: id }); // On supprime le produit
      const productsUpdated = await productModel.find(); // On recupère la nouvelle liste de produits pour actualiser directement coté front
      res.status(200).json({
        message: `${productName} a bien été supprimé.`,
        products: productsUpdated,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la suppression du produit, veuilelz réessayer.",
      error: error,
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProduct = req.body;
    const productAdded = await productModel.create(newProduct);
    if (productAdded) {
      res.status(201).json({
        message: `${productAdded.name} a été ajouté avec succés.`,
        product: productAdded,
      });
    } else {
      res.status(500).json({
        message: "Le produit n'a pas pu être ajouté, veuillez réessayer.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Le produit n'a pas pu être ajouté, veuillez réessayer.",
    });
  }
});

router.patch("/update/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;
  try {
    const productToUpdate = await productModel.findOneAndUpdate(
      { _id: id },
      data,
      { new: true }
    );
    if (productToUpdate) {
      const newProducts = await productModel.find();
      res.status(200).json({
        products: newProducts,
        message: "Mise à jour effectuée avec succés.",
      });
    } else {
      res.status(404).json({
        message: "Le produit n'a pas été trouvé, veuillez réessayer.",
      });
    }
  } catch (error) {
    res.json({ error: error });
  }
});

export default router;
