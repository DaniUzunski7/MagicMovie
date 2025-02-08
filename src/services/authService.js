import User from "../models/User.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'BASICSECRET';

async function register(userData){
    if(userData.password !== userData.rePassword){
        throw new Error('Password missmatch!')
    }
    
    const isUniuqeUser = await User.countDocuments({email: userData.email});
    if (isUniuqeUser > 0){
        throw new Error('Email already exists!')
    }

    const newUser = User.create(userData);

    return newUser;
}

async function login(email, password){
    //Checks if user exists
    const user = await User.findOne({email});
    
    if (!user){
        throw new Error('Invalid email or password!');
    }
    
    //Check if password is correct
    const isValid = await bcrypt.compare(password, user.password);
    
    if (!isValid){
        throw new Error('Invalid email or password!')
    }
    
    //Generate token
    const payload = {
        id: user.id,
        email: user.email
    }
    const token = jwt.sign(payload, SECRET, {expiresIn: '2h'});

    return token;
}

export const authServices = {
    register,
    login
}