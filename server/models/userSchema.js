const mongoose = require("mongoose");
const { Schema } = mongoose;

const registrationScheam = Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    collection: "user-data",
  }
);

const RegistrationModel = mongoose.model(
  "RegistrationModel",
  registrationScheam
);
module.exports = RegistrationModel;
