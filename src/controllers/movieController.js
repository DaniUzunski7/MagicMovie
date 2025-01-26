import express from 'express';
import { movieServices } from '../services/movieService.js';
import { castServices } from '../services/castService.js';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async(req, res) => {
    const newMovie = req.body;
    
    await movieServices.createMovie(newMovie);

    res.redirect('/');
})

movieController.get('/:id/details', async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieServices.getMovie(movieId);
    
    res.render('movie/details', {movie});
})

movieController.get('/search', async (req, res) => {
    const filters = req.query;
    console.log(filters);
    
    const movies = await movieServices.getAllMovies(filters);
    console.log(movies);
    
    res.render('search', {movies, filters});
});

movieController.get('/:id/attach-cast', async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieServices.getMovie(movieId);
    const casts = await castServices.getCasts();
    
    res.render('movie/attach-cast', {movie, casts})
})

export default movieController;