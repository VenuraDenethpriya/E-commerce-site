import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,  
        ref: 'Category',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    stripePriceId:{
        type: String,
    },
    description: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
    }
});

export default mongoose.model('Product', ProductSchema);
