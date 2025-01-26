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

function getAllMovies(filters = {}){
    let query = Movie.find({});
    
    if (filters.search){
        //TODO: fix partial case insensitive search
        query = query.find({title: filters.search});
    }

    if (filters.genre){
        //TODO: add case insensitive search
        query = query.find({genre: filters.genre})
    }

    if (filters.year){
        query = query.find({year: Number(filters.year)})
    }

    return query;
}

export const movieServices = {
    getMovie,
    createMovie,
    getAllMovies
}