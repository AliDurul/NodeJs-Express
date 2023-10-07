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
      validate: [
        (email) => (email.includes('@') && email.includes('.')), // ValidationCheck
        'Error type is incorrect.'
    ]
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
