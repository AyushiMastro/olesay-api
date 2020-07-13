const dynamoose = require("dynamoose");

const { Schema } = dynamoose;
export const adSchema = new Schema({
  id: String,
  productName: String,
  description: String,
  productPrice: Number,
  condition: String,
  adRating: Number,
  userId: String,
  adType: String,
});
