/* export our lambda function as named "handler" export */
exports.handler = async (event, context) => {
  /* parse the string body into a useable JS object */
  const data = JSON.parse(event.body);
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  };
};
