const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const DataSchema = mongoose.Schema(
  {
    FirstName: { type: "string" },
    LastName: { type: "string" },
    EmailAddress: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (v) => {
          return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
            v
          );
        },
      },
    },
    MobileNumber: {
      type: String,
      unique: true,
      validate: {
        validator: (v) => {
          if (v.length === 11) {
            return true;
          } else {
            return false;
          }
        },
        message: "Enter 11 digit BD number",
      },
    },
    City: { type: String },
    UserName: { type: String, unique: true },
    Password: { type: String, required: true },
  },
  { versionKey: false }
);

const profileModel = mongoose.model("profiles", DataSchema);
module.exports = profileModel;
