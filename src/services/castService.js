import Cast from "../models/Cast.js";

function create(castData) {

    return Cast.create(castData);
}

function getCasts(){
    return Cast.find({});
}

export const castServices = {
    create,
    getCasts
}