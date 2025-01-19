import express from 'express';
import { movieServices } from '../services/movieService.js';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.get('/:id/details', (req, res) => {
    const movieId = req.params.id;
    const movie = movieServices.getMovie(movieId);
    console.log(movie);
    
    res.render('details', {movie});
})

export default movieController;