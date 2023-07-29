import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import validator from "validator";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "A user must have a User-Name"],
      min: 6,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "A user must have a Email"],
      unique: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    role: {
      type: String,
      enum: ["user", "employee", "admin"],
      default: "user",
    },
    password: {
      type: String,
      required: [true, "A user must have a password"],
      min: 8,
    },
    myFile: {
      type: String,
    },
  },
  { timeStamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
///match password on login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Bcrypt pasword encyption
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = new mongoose.model("User", userSchema);
export default User;
