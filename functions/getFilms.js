const mongoose = require("mongoose");
const dbConnect = require("./db/dbConnect");
const models = require("./db/models");

exports.handler = async (event, context) => {
  const databaseConnected = await dbConnect();
  if (databaseConnected) {
    const results = await models.Film.find({});
    return {
      statusCode: 200,
      body: JSON.stringify(results),
    };
  }
  return {
    statusCode: 500,
    body: "Database connection failed, see function log for details",
  };
};
