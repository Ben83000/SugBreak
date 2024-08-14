import express from "express";
import cors from "cors";
import { connectDB } from "./db/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes.js";
import productRoutes from "./routes/product.routes.js";
import cartRoutes from "./routes/cart.routes.js";
import stripeRoutes from "./routes/stripe.routes.js"
import orderRoutes from "./routes/order.routes.js"

const app = express();
const port = 5000;

connectDB();



app.use(
  cors({
    origin: "http://localhost:5173",
    methos: ["GET", "PUT", "DELETE", "POST", "PATCH"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRoutes); 
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/stripe", stripeRoutes);
app.use("/order", orderRoutes);


app.listen(port, () => console.log(`Server started on port ${port}`)); 
