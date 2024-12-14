import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    orderStatus: {
        type: String,
        required: true,
        default: "Pending",
        enum: ["Pending", "Shipped", "Declined", "Cancelled", "Delivered", "Packing"]
    },
    TotalAmount: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
},{timestamps: true});

export default mongoose.model("Order", OrderSchema);