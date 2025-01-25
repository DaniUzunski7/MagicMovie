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

function getAllMovies(filters = {}){
    let result = movies;
    
    if (filters.search){
        result = movies.filter(movie => movie.title.toLocaleLowerCase().includes(filters.search.toLocaleLowerCase()));
    }

    if (filters.genre){
        result = movies.filter(movie => movie.genre.toLocaleLowerCase() === filters.genre.toLocaleLowerCase());
    }

    if (filters.year){
        result = movies.filter(movie => movie.year === filters.year);
    }

    return result;
}

export const movieServices = {
    getMovie,
    createMovie,
    getAllMovies
}