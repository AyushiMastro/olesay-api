import * as AWS from "aws-sdk";

export const to = (promise) =>
  promise.then((data) => [null, data]).catch((err) => [pe(err)]);

export const handleErr = (error, statusCode = 500) => {
  console.error(" => ERROR:", error.stack);

  return {
    statusCode,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ error }),
  };
};

export const checkTable = (tableName) => {
  status = false;
  console.log("Check table: " + tableName);
  var params = {
    TableName: tableName /* required */,
  };
  let dynamo = new AWS.DynamoDB.DocumentClient();
  dynamo.describeTable(params, function (err, data) {
    if (err) {
      status = "false";
      console.log(err, err.stack); // an error occurred
    } else {
      status = "true";
      console.log(data); // successful response
    }
    console.log("STATUS===========>" + status);
    callback(status);
  });
  return status;
};
