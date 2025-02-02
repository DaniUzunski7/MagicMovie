import express from "express";
import { authServices } from "../services/authService.js";

const authController = express.Router();

authController.get('/register', (req, res) => {
  res.render("auth/register");
});

authController.post('/register', async (req, res) => {
  let userData = req.body;

  await authServices.register(userData);

  res.redirect('/');
});

authController.get('/login', (req, res) => {
  res.render("auth/login");
});

authController.post('/login', async (req, res) => {
  const { email, password } = req.body;
    console.log(email, password);
    
  try {
      const token = await authServices.login(email, password);
      console.log(token);
      
  } catch (error) {
    console.log(error.message);
    return res.redirect('/404')
    
  }

  res.redirect('/');
});

export default authController;
