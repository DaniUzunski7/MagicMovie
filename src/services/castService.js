import Cast from "../models/Cast.js";

function create(castData) {

    return Cast.create(castData);
}

async function getCasts(filter = {}){
    let query = Cast.find({});
    
    if (filter.exclude){
        query = await query.nin('_id', filter.exclude)
    }
    
    return query;
}

export const castServices = {
    create,
    getCasts
}