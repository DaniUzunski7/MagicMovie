import express from 'express';
import { castServices } from '../services/castService.js';

const castController = express.Router();

castController.get('/create', (req, res) => {
    res.render('casts/create')
})

castController.post('/create', async (req, res) => {
    const newCast = req.body;

    await castServices.create(newCast);

    res.redirect('/');
})

export default castController;