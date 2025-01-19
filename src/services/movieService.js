import movies from '../moviesData.js'

function getMovie(id){
    //What if movie is missing
    const result = movies.find(movie => movie.id === id);

    return result;
}

export const movieServices = {
    getMovie
}