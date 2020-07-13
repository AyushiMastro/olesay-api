import { adSchema } from "../Schema/adSchema";
import { v1 as uuid } from "uuid";
import { dynamoConfigureInstance } from "../config/dbConfig";
import { success, failure } from "../utils/apiResponse";
import jwt_decode from "jwt-decode";
import * as dynamoose from "dynamoose";

export async function createAdd(event, context, callback) {
  await dynamoConfigureInstance();
  try {
    const decodedUser = jwt_decode(event.headers.Authorization);
    const data = JSON.parse(event.body);
    const AdModel = dynamoose.model("Ads", adSchema, { create: true });
    let newAdd = await AdModel.create({
      id: uuid(),
      productName: data.productName,
      description: data.description,
      productPrice: data.productPrice,
      condition: data.condition,
      adRating: data.adRating,
      userId: decodedUser.sub,
    });
    // let Newdata = await newAdd.save({ create: false });
    console.log(newAdd, "NewDadad");
    return callback(
      null,
      success({
        isSuccess: true,
        data: newAdd,
        status: 200,
      })
    );
  } catch (e) {
    console.log(e, "eeeee");
    return callback(failure({ isSuccess: true, data: e, status: 400 }));
  }
}
