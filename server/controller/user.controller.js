import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";
import UserModel from "../model/user.model.js";

export const test = (req, res) => {
  res.json({ message: "create user" });
};

export const updateUser = async (req, res, next) => {
  const { id } = req.params;

  const {
    username,
    email,
    password: updatePassword,
    profilePicture,
  } = req.body;

  if (req.user.id !== id) {
    return next(errorHandler(401, "kindly login"));
  }
  try {
    let hashPassword;
    if (updatePassword) {
      hashPassword = bcryptjs.hashSync(updatePassword, 10);
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      id,

      {
        username,
        email,
        password: hashPassword,
        profilePicture,
      },

      { new: true }
    );
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "kindly login"));
  }
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    next(error);
  }
};
