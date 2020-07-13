import { adSchema } from "../Schema/adSchema";
import { dynamoConfigureInstance } from "../config/dbConfig";
import { success, failure } from "../utils/apiResponse";
import * as dynamoose from "dynamoose";
export async function updateAd(event, context, callback) {
  await dynamoConfigureInstance();
  try {
    const AdModel = dynamoose.model("Ads", adSchema, { create: false });
    // const decodedUser = jwt_decode(event.headers.Authorization);
    // console.log(decodedUser, "userrr");
    const data = JSON.parse(event.body);
    let Newdata = await AdModel.update(
      { id: event.pathParameters.id },
      { ...data }
    );
    return callback(
      null,
      success({ isSuccess: true, data: Newdata, status: 200 })
    );
  } catch (e) {
    console.log(e);

    return callback(null, failure({ isSuccess: true, data: e, status: 400 }));
  }
}
