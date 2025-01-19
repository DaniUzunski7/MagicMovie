import express from 'express';

const router = express.Router();

router.get('/create', (req, res) => {
    res.render('create');
});

export default router;