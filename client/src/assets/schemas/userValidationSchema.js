import * as Yup from 'yup';

const userDataSchema = Yup.object().shape({
    firstName: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'First name must contain only characters')
        .required('First name is required'),
    lastName: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'Last name must contain only characters')
        .required('Last name is required'),
    email: Yup.string()
        .email('Invalid email format')
        .required('Email is required'),
    gender: Yup.string()
        .oneOf(['Male', 'Female', 'Other'], 'Invalid gender')
        .required('Gender is required'),
    country: Yup.string()
        .required('Country is required'),
    state: Yup.string()
        .required('State is required'),
    city: Yup.string()
        .required('City is required'),
    dob: Yup.date()
        .required('Date of birth is required'),
    age: Yup.number()
        .integer('Age must be an integer')
        .min(14, 'Age must be at least 14')
        .max(99, 'Age must be at most 99')
        .required('Age is required')
});

export default userDataSchema;
