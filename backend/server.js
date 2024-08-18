// server.js

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { Server as socketIo } from 'socket.io'; // Correct import
import http from 'http';
import dotenv from 'dotenv';

// Routes importées
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import stripeRoutes from './routes/stripe.routes.js';
import orderRoutes from './routes/order.routes.js';

// Chargement des variables d'environnement
dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Créer un serveur HTTP
const server = http.createServer(app);

// Initialiser Socket.IO avec le serveur HTTP
const io = new socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});
 
// Connexion à MongoDB
const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(process.env.API);
    console.log('MongoDB connected');

    // Gérer les connexions Socket.IO
    io.on('connection', (socket) => {
      console.log('Client Socket.IO connecté');

      socket.on('disconnect', () => {
        console.log('Client Socket.IO déconnecté');
      });
    });

    // se connecte et Surveille la collection 'orders' dans mongodb
    const orderCollection = mongoose.connection.collection('orders');
    const changeStream = orderCollection.watch();

    // dés qu'un changement est detecté dans la collection orders..
    changeStream.on('change', (change) => { // "change" est le changement effectué (par ex pour une insertion, cest le nouveau doc)
      if (change.operationType === 'insert') {
        const newOrder = change.fullDocument; // on recup le nouveau doc
        // Diffuser la nouvelle commande à tous les clients Socket.IO
        io.emit('newOrder', newOrder); // on l'envoie a tous les clients (front) qui ecoute les emissions nommées 'newOrder'
      }
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Configurer les middlewares Express
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "PUT", "DELETE", "POST", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Configurer les routes
app.use("/user", userRoutes); 
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/stripe", stripeRoutes);
app.use("/order", orderRoutes);

// Démarrer le serveur HTTP et Socket.IO
server.listen(port, () => {
  console.log(`Server and Socket.IO running on http://localhost:${port}`);
});

// Appeler connectDB pour établir la connexion avec la base de données
connectDB();
