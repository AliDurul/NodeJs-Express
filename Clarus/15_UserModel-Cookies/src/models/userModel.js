const mongoose = require("mongoose");
const passwordEncrypt =  require('../helpers/passwordEncrypt')

const userSchema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is Required !"],
      validate: [
        (email) => {
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          return emailRegex.test(email);
        },
        "Enter a valid email !",
      ],
    },
    password: {
      type: String,
      trim: true,
      required: [true, "Password is Required !"],
      set: (password) => passwordEncrypt(password)
    },
  },
  { collection: "Users", timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
