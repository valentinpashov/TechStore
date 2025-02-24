import { Router } from "express"; // 6
import authService from "../services/authService.js"; //7
import { AUTH_COOKIE_NAME } from "../config.js"; //15
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUlits.js"; //16

const authController = Router(); // 6

//Вкарваме Login
authController.get("/login",isGuest, (req, res) => {
  res.render("auth/login");
});

//!Взимаме информацията за LOGIN
authController.post("/login",isGuest, async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const token = await authService.login(email, password);

    res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true }); //15    
    res.redirect("/");
  } catch (err) {
    res.render('auth/login', {error: getErrorMessage(err), user:{email} });
  }
});

//Вкарваме Register
authController.get("/register",isGuest, (req, res) => {
  res.render("auth/register");
});

//!Взимаме информацията за REGISTRATION
authController.post("/register",isGuest, async (req, res) => {
  const userData = req.body;
  
  try {
    // Преди да извикаш authService.register(userData), добави проверка за празни полета.
    if (!userData.email || !userData.name || !userData.password || !userData.confirmPassword) {
      throw new Error("All fields are required!");
    }

    
    const token = await authService.register(userData); //7

    res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true }); //15
    res.redirect("/");
  } catch (err) { 
    res.render("auth/register", {error: getErrorMessage(err), user: userData}); //16
  }
});

//! Logout
authController.get("/logout", isAuth, (req, res) => {
  res.clearCookie(AUTH_COOKIE_NAME);
  res.redirect("/");
});

export default authController; // 6
