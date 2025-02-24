import bcrypt from "bcrypt"; //11
import User from "../models/User.js"; //8
import { generateToken } from "../utils/authUtils.js"; //14

//!Login
export const login = async (email, password) => {
  //Validate user/email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid user or password");
  }

  //Validate password
  const isValid = await bcrypt.compare(password, user.password); //11
  if (!isValid) {
    throw new Error("Invalid user or password");
  }

  const token = generateToken(user); //14
  return token;
};

//!Registration
export const register = async (userData) => {
  //7
  // Проверяваме дали полетата са попълнени   //!
  if (!userData.email || !userData.name || !userData.password || !userData.confirmPassword) {
    throw new Error("All fields are required!");
  }

  //Проверяваме паролаата дали съвпада
  if (userData.password !== userData.confirmPassword) {
    throw new Error("Password missmatch!");
  }

  //Проверяваме дали потрибителя съществува
  const user = await User.findOne({ email: userData.email }).select({ _id: 1 });
  console.log(user);

  if (user) {
    throw new Error("User already exists!"); //throw = Прекратява
  }

  const createdUser = await User.create(userData); //8   //Използваме модела за да се създаде в базата данни
  const token = generateToken(createdUser);
  return token;
};

//Показваме какви функции имаме
const authService = {
  //7
  register,
  login,
};

export default authService; //7
