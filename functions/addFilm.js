const mongoose = require("mongoose");
const dbConnect = require("./db/dbConnect");
const models = require("./db/models");

exports.handler = async (event, context) => {
  const databaseConnected = await dbConnect();
  if (databaseConnected) {
    try {
      const data = JSON.parse(event.body);
      const newFilm = new models.Film({
        ...data,
      });
      await newFilm.save();
      return {
        statusCode: 200,
        body: JSON.stringify(data),
      };
    } catch (error) {
      console.error("Error writing into the database: ", error);
      return {
        statusCode: 500,
        body: "Error writing into the database, see function log for details",
      };
    }
  }
  return {
    statusCode: 500,
    body: "Database connection failed, see function log for details",
  };
};
