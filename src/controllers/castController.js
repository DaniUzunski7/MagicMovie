import express from 'express';

const castController = express.Router();

castController.get('/create', (req, res) => {
    res.render('casts/create')
})

export default castController;