import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Last Name is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
    },
    country: {
        type: String,
        required: [true, 'Country is required'],
    },
    state: {
        type: String,
        required: [true, 'State is required'],
    },
    city: {
        type: String,
        required: [true, 'City is required'],
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    dob: {
        type: Date,
        requred: [true, 'Date Of Birth is required'],
    },
    age: {
        type: Number,
        min: [14, 'Age must be  14 OR above'],
        max: [99, 'Age must be 99 OR below'],
    }
}, { timeStamp: true })


const userModel = mongoose.model('user', userSchema);

export default userModel;