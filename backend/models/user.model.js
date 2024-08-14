import mongoose from "mongoose";

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%._*-]).*$/;
const EMAIL_REGEX = /\S+@\S+\.\S+/;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    match: EMAIL_REGEX,
  },
  password: {
    type: String,
    minLength: 6,
    match: PWD_REGEX,
  },
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  city: {
    type: String,
  },
  adress: {
    type: String,
  },
  phone: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
  isAdmin: {
    type: Boolean,
  },
  cart: [
    {
      product: Object,
      quantity: Number, 
      base: String,
      customisation: Object,
    },
  ],
  
});

const User = mongoose.model("User", userSchema);

export default User;
