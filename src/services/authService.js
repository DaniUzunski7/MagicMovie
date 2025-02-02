import User from "../models/User.js"

function register(userData){
    
    const newUser = User.create(userData);

    return newUser;
}


export const authServices = {
    register
}