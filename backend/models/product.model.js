import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  imageName: {
    type: String,
  },
  custom: {
    type: Boolean,
  },
  stock: {
    type: Boolean,
    required: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
