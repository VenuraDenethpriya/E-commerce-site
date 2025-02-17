import mongoose from "mongoose";

const OrderProductSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: false },
  description: { type: String, required: true },
});

const ItemSchema = new mongoose.Schema({
  product: { type: OrderProductSchema, required: true },
  quantity: { type: Number, required: true },
});

const OrderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  addressId: { type: String, required: true },
  items: {
    type: [ItemSchema],
    required: true,
  },
  orderStatus: { 
    type: String, 
    enum: ["PENDING", "CONFIRMED", "PROCESSING", "SHIPPED", "DELIVERED"],
    default: "PENDING",
    required: true 
  },
  paymentStatus: {
    type: String,
    enum: ["PENDING", "PAID"],
    default: "PENDING",
    required: true,
  },
});

const Order = mongoose.model("Order", OrderSchema);

export default Order;