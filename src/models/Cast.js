import { Schema, model } from "mongoose";

const castSchema = {
    name: {
        type: String,
        requied: [true, 'Name is required!'],
        minLength: [5, 'Name should be at least 5 charaacters long!'],
        match: [/^[a-zA-Z 0-9]+$/, 'Name should be alphanumeric, digits, and whitespaces only!']
    },
    age: {
        type: Number,
        min: 0,
        max: 120
    },
    born: {
        type: String,
        minLength: [10, 'Birth place should be at least 10 characters long!'],
        match: [/^[a-zA-Z 0-9]+$/, 'Born should be alphanumeric, digits, and whitespaces only!']
    },
    imageUrl: {
        type: String,
        requied: [true, 'Image url is required!'],
        validator: function(v) {
            return /^https?:\/\//.test(v)
        },
        message: (props) => `${props.value} is invalid image url!`
    },
}

const Cast = model('Cast', castSchema);

export default Cast;