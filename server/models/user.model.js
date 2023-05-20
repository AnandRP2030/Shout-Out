const mongoose = require("mongoose");
const { Schema } = mongoose;

const registrationSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },
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
    collection: "registration",
  }
);

const RegistrationModel = mongoose.model(
  "RegistrationModel",
  registrationSchema
);
module.exports = RegistrationModel;
