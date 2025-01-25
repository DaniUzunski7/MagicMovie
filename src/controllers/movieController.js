import express from 'express';
import { movieServices } from '../services/movieService.js';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', (req, res) => {
    const newMovie = req.body;

    movieServices.createMovie(newMovie);

    res.redirect('/');
})

movieController.get('/:id/details', (req, res) => {
    const movieId = req.params.id;
    const movie = movieServices.getMovie(movieId);
    
    res.render('details', {movie});
})

movieController.get('/search', (req, res) => {
    const filters = req.query;
    const movies = movieServices.getAllMovies(filters);
    
    res.render('search', {movies, filters});
})

export default movieController;