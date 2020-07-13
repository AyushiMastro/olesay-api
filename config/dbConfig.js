import * as dynamoose from "dynamoose";

export const dynamoConfigureInstance = () => {
  return new Promise((res, rej) => {
    try {
      let ddb = new dynamoose.aws.sdk.DynamoDB({
        accessKeyId: "AKIAT4VBNA2DRCN3RRWX",
        secretAccessKey: "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",
        region: "us-east-2",
      });
      dynamoose.aws.ddb.set(ddb);
      res();
    } catch (e) {
      rej(e);
    }
  });
};
