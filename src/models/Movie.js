import { Schema, Types, model } from "mongoose";

//Create schema
const movieSchema = new Schema({
    title: {
        type: String,
        requied: [true, 'Title is required!'],
        minLength: [3, 'Title should be at least 3 characters long!'],
        maxLength: 100,
        match: [/^[a-zA-Z 0-9]+$/, 'Title should be alphanumeric, digits, and whitespaces only!']

    },
    category: {
        type: String,
        minLength: [3, 'Category should be at least 3 characters long!']
    },
    genre: {
        type: String,
        required: true,
        match: [/^[a-zA-Z 0-9]+$/, 'Genre should be alphanumeric, digits, and whitespaces only!'],
        minLength: [5, 'Genre should be at least 5 characters long!']
    },
    director: {
        type: String,
        match: [/^[a-zA-Z 0-9]+$/, `Director's name should be alphanumeric, digits, and whitespaces only!`],
        requied: [true, 'Director is required!']
    },
    year: {
        type: Number,
        min: 1900,
        max: 2030,
        requied: [true, 'Year is required!']
    },
    imageUrl: {
        type: String,
        requied: [true, 'Movie poster is required(url)!'],
        match: /^https?:\/\//,
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    description: {
        type: String,
        requied: [true, 'Description is required!'],
        minlength: [20, 'Description should be at least 20 characters long!']
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User'
    }
})

//Create model
const Movie = model('Movie', movieSchema);

export default Movie;