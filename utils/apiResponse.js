export function success(body) {
  return buildResponse(200, JSON.stringify(body));
}
export function successGet(body) {
  return buildResponse(200, body);
}
export function failure(body) {
  return buildResponse(500, body);
}
function buildResponse(statusCode, body) {
  let res = {
    statusCode,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: body,
  };
  return res;
}
