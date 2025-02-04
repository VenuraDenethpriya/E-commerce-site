import  Mongoose  from "mongoose";

const addressSchema = new Mongoose.Schema({
    name: String,
    phoneNumber: String,
    address: String,
    city: String,
    state: String,
    zipCode: String
})

export default Mongoose.model("Address", addressSchema);