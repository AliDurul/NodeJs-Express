const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      trim: true,
      unique: true,
      required:[true, 'Email field must be required. '],
    },
    password: {
        type: String,
        trim: true,
        required:[true, 'passwrod field must be required. '],
    },
  },
  {
    collection: "user",
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema)
