import express from 'express';
import { movieServices } from '../services/movieService.js';
import { castServices } from '../services/castService.js';
import Movie from '../models/Movie.js';

const movieController = express.Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async(req, res) => {
    const newMovie = req.body;
    const userId = req.user?.id;

    await movieServices.createMovie(newMovie, userId);

    res.redirect('/');
})

movieController.get('/:id/details', async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieServices.getMovie(movieId).populate('casts');
    const isCreator = movie.creator && movie.creator?.toString() === req.user?.id;

    console.log(movie.creator?.toString());
    console.log(req.user?.id);

    res.render('movie/details', {movie, isCreator});
})

movieController.get('/search', async (req, res) => {
    const filters = req.query;
    
    const movies = await movieServices.getAllMovies(filters);
    
    res.render('search', {movies, filters});
});

movieController.get('/:id/attach-cast', async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieServices.getMovie(movieId);
    const casts = await castServices.getCasts({exclude: [movie.casts]});
    
    res.render('movie/attach-cast', {movie, casts})
})

movieController.post('/:id/attach-cast', async(req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.id;
    
    await movieServices.attachCast(castId, movieId);
    
    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:id/delete', async (req, res) => {
    const movieId = req.params.id;
    const movie = await movieServices.getMovie(movieId);

    if(movie.creator?.toString() !== req.user?.id){
        return res.redirect('/404');
    }
    
    await movieServices.deleteMovie(movieId);
    res.redirect('/');
})

export default movieController;