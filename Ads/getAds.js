import { adSchema } from "../Schema/adSchema";
import { dynamoConfigureInstance } from "../config/dbConfig";
import { successGet, failure } from "../utils/apiResponse";
import jwt_decode from "jwt-decode";
import * as dynamoose from "dynamoose";

export async function getUserAds(event, context, callback) {
  await dynamoConfigureInstance();
  try {
    const AdModel = dynamoose.model("Ads", adSchema, { create: false });
    const decodedUser = jwt_decode(event.headers.Authorization);
    console.log(decodedUser, "userrr");
    let ads = await AdModel.scan({
      userId: decodedUser.sub,
    }).exec();
    console.log(ads, "adssss");
    return callback(
      null,
      successGet({ isSuccess: true, data: ads, status: 200 })
    );
  } catch (e) {
    console.log(e);
    return callback(
      null,
      failure({ isSuccess: false, data: e.message, status: 400 })
    );
  }
}

export async function getAdById(event, content, callback) {
  await dynamoConfigureInstance();
  try {
    const AdModel = dynamoose.model("Ads", adSchema, { create: false });
    const decodedUser = jwt_decode(event.headers.Authorization);
    console.log(decodedUser, "userrr");
    let ads = await AdModel.get({
      id: event.pathParameters.id,
    }).exec();
    return callback(
      null,
      successGet({ isSuccess: true, data: ads, status: 200 })
    );
  } catch (e) {
    return callback(
      failure({ isSuccess: false, data: e.message, status: 400 })
    );
  }
}
