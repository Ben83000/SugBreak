import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRET;

export const isAuthentificated = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    console.log("pas de token");
    return res.sendStatus(401);
  } else if (token) {
    try {
      const decodedUser = jwt.verify(token, secretKey);
      const user = await userModel.findOne({ email: decodedUser.email });
      if (user) {
        const userWithoutPassword = { ...user.toObject(), password: undefined };
        req.user = userWithoutPassword;
        next();
      } else if (!user) {
        return res.status(404).json({
          Message:
            "Token existant mais impossible de trouver l'utilisateur en base de données. (Compte supprimée)",
        });
      }
    } catch (error) {
      res.status(500).json({ Error: error });
    }
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Accès refusé" });
  }
};
