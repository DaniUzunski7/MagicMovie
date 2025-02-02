import express from 'express';
import { authServices } from '../services/authService.js';

const authController = express.Router();

authController.get('/register', (req, res) => {    
    res.render('auth/register');
})

authController.post('/register', async (req, res) => {
    let userData = req.body;

    await authServices.register(userData);

    res.redirect('/');
});

authController.get('/login', (req, res) => {
    res.render('auth/login');
})

export default authController;