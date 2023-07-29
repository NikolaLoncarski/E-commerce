import User from "../models/userModel.js";
import { asyncHandler } from "../util/handleAsync.js";

import signToken from "../util/signToken.js";

const registerUser = asyncHandler(async (req, res, next) => {
  console.log(req.body);
  const { userName, email, password, myFile } = req.body;

  const userAlreadyExists = await User.findOne({ email });

  if (userAlreadyExists) {
    res.status(400);
    throw new Error("User Already Exists!");
  }

  const user = await User.create({
    userName,
    email,
    password,
    myFile,
  });
  console.log(user);
  if (user) {
    signToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.userName,
      email: user.email,
      myFile: user.myFile,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user Data");
  }
});

const signUp = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    signToken(res, user._id);

    res.status(200).json({
      message: "User Loged in",
      _id: user._id,
      userName: user.userName,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const logoutUser = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "Logout Succesfull" });
});

const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    message: "sucess",
    data: users,
  });
});

const restrictAccess = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      res.status(403);
      throw new Error("You do not have permission to access this route");
    }
    next();
  };
};

export { registerUser, signUp, logoutUser, getAllUsers, restrictAccess };
