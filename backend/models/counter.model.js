import mongoose from "mongoose";

const counterSchema = mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  sequence_value: {
    type: Number,
    required: true,
    default: 1,
  },
  yearMonth: {
    type: String,
    required: true,
  },
});

const Counter = mongoose.model("Counter", counterSchema);

export default Counter;
