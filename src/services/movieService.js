import movies from '../moviesData.js'
import Movie from '../models/Movie.js';

function getMovie(id){
    //*What if movie is missing
    const result = Movie.findById(id)

    return result;
}

function createMovie(movieData){
    
    const result = Movie.create({
        ...movieData,
        rating: Number(...movieData.rating),
        year: Number(...movieData.year)
    });
    
    return result; 
}

async function getAllMovies(filters = {}){
    let result = await Movie.find({});
    
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