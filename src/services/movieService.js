import movies from '../moviesData.js'
import {v4 as uuid} from 'uuid';

function getMovie(id){
    //What if movie is missing
    const result = movies.find(movie => movie.id === id);

    return result;
}

function createMovie(movieData){
    const newId = uuid();
    
    movies.push({
        id: newId,
        ...movieData,
        rating: Number(...movieData.rating)
    });
    
    return newId; 
}

function getAllMovies(){
    return movies;
}

export const movieServices = {
    getMovie,
    createMovie,
    getAllMovies
}