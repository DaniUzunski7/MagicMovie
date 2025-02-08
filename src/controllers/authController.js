import express from 'express';
import { authServices } from '../services/authService.js';
import { isAuth } from '../middlewares/authMiddleware.js';
import { getErrorMessage } from '../utils/errors.js';

const authController = express.Router();

authController.get('/register', (req, res) => {
  res.render('auth/register');
});

authController.post('/register', async (req, res) => {
  let userData = req.body;

  try {
    await authServices.register(userData);
  } catch (err) {
    const error = getErrorMessage(err)
    return res.render('auth/register', { error });
  }


  res.redirect('/');
});

authController.get('/login', (req, res) => {
  res.render('auth/login');
});

authController.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await authServices.login(email, password);
    
    res.cookie('auth', token, {httpOnly: true});
    res.redirect('/');

  } catch (err) {
    return res.redirect('/404');
  }
});

authController.get('/logout', isAuth, (req, res) => {
  res.clearCookie('auth');

  res.redirect('/')
})

export default authController;
