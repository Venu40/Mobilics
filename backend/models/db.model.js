import mongoose from "mongoose";
const dbSchema = new mongoose.Schema({
  id: Number,
  first_name: String,
  last_name: String,
  email: String,
  income: String,
  city: String,
  car: String,
  quote: String,
  phone_price: String,
});
export default mongoose.model("data", dbSchema);
