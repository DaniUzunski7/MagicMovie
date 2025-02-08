import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        unique: true,
        lowercase: true, //lower case sanitizer
        required: [true, 'Email is reqiured!'],
        minLength: [10, 'Email should be at least 10 characters long!'],
        match: /\@([\w-]+\.)+[\w-]{2,4}$/
    },
    password: {
        type: String,
        required: [true, 'Password is required!'],
        match: /^[a-zA-z0-9]+$/,
        minLength: [6, 'Password should be at least 6 characters long!'],
    }
});

userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 10);
})

const User = model('User', userSchema);

export default User;
