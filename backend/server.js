import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import { Server as socketIo } from 'socket.io';
import http from 'http';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Routes
import userRoutes from './routes/user.routes.js';
import productRoutes from './routes/product.routes.js';
import cartRoutes from './routes/cart.routes.js';
import stripeRoutes from './routes/stripe.routes.js';
import orderRoutes from './routes/order.routes.js';

// Chargement des variables d'environnement
dotenv.config();

// Ces lignes permettent de recréer `__dirname` et `__filename`
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');


const app = express();
const port = process.env.PORT || 5000;

// Créer un serveur HTTP
const server = http.createServer(app);

// Initialise Socket.IO avec le serveur HTTP
const io = new socketIo(server, {
  cors: {
    origin: 'https://gentle-citadel-85847-6ce2d6bf71ee.herokuapp.com/',
    methods: ['GET', 'POST'],
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
    changeStream.on('change', (change) => {
      // "change" est le changement effectué (par ex pour une insertion, cest le nouveau doc)
      if (change.operationType === 'insert') {
        const newOrder = change.fullDocument; // on recup le nouveau doc
        // on diffuse la nouvelle commande à tous les clients Socket.IO
        io.emit('newOrder', newOrder); // on l'envoie a tous les clients (front) qui ecoute les emissions nommées 'newOrder'
      }
    });
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// Middlewares express
app.use(
  cors({
    origin: 'https://gentle-citadel-85847-6ce2d6bf71ee.herokuapp.com',
    methods: ['GET', 'PUT', 'DELETE', 'POST', 'PATCH'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

// Configurer les routes
app.use('/user', userRoutes);
app.use('/product', productRoutes);
app.use('/cart', cartRoutes);
app.use('/stripe', stripeRoutes);
app.use('/order', orderRoutes);

if (process.env.NODE_ENV === 'production') {
  console.log("la")
  app.use(express.static(path.join(projectRoot, 'frontend', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(projectRoot, 'frontend', 'dist', 'index.html'));
  });
} else {
  console.log("ici")
  app.get("/", (req, res) => {
    res.send("Api running..")
  })
}

// Démarre le serveur HTTP et Socket.IO sur le port
server.listen(port, () => {
  console.log(`Server and Socket.IO running on https://gentle-citadel-85847-6ce2d6bf71ee.herokuapp.com`);
});

// Appeler connectDB pour établir la connexion avec la base de données
connectDB();
