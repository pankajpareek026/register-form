import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import TextInput from './../components/TextInput';
import SelectInput from './../components/SelectInput';
import RadioInput from './../components/RadioInput';
import DateInput from '../components/DateInput';
import Button from '../components/Button';
import axios from 'axios';
import Loading from './../components/Loading';
import EmailInput from '../components/EmailInput';
import AgeInput from '../components/AgeInput';
import userDataSchema from '../assets/schemas/userValidationSchema';


const RegisterPage = () => {

    const redirectTo = useNavigate()
    // API data
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [formData, setFormData] = useState({
        firstName: null,
        lastName: null,
        email: null,
        gender: null,
        country: null,
        state: null,
        city: null,
        dob: null,
        age: null,
    });


    const [noState, setNostate] = useState(null)
    const [isLoading, setIsLoading] = useState(true);
    const [myCountry, setMyCountry] = useState(null);
    const [myState, setMyState] = useState(null);
    const [myCity, setMyCity] = useState(null);
    const [errors, setErrors] = useState({})


    const getCountries = () => {
        setIsLoading(true);
        return axios.get('https://form-1cx0.onrender.com/api/countries', {
            Headers: {
                "content-type": "application/json"
            }
        }).then(response => {
            const { success, error, message, data } = response.data;
            if (error) {
                alert('API Error: ', message);
                return;
            }
            setCountries(data);
        }).finally(() => setIsLoading(false));
    }

    // get all countries
    const getStates = (country) => {
        setIsLoading(true);
        console.log("counrty data=>", country);
        if (!country?.id) {
            setErrors((current) => ({ ...current, country: "please select your country" }))
            return;
        }

        axios.get(`https://form-1cx0.onrender.com/api/states/${country.id}`, {
            Headers: {
                "content-type": "application/json"
            }
        }).then(response => {

            const { success, error, message, data } = response.data;
            console.log(" state Data=>", data);
            const noState = data[0]?.noState;
            console.log(" noState", noState);
            // if no state in country
            if (noState) {

                const noStateData = [{ id: 999999, name: country.name }]
                // set states and cites default city value
                setCities(noStateData)

                setStates(noStateData);

                setFormData((current) => ({ ...current, state: country.name }))
                setFormData((current) => ({ ...current, city: country.name }))
                setNostate(true)

                return
            }
            else if (error) {
                alert('API Error: ', message);
                return;
            }

            setStates(data)


        })
            .finally(() => setIsLoading(false));
    }

    // get all cites which associated with selected state
    const getCities = (stateData) => {

        setIsLoading(true);
        if (!stateData?.id) {
            setErrors((current) => ({ ...current, state: "please select your state" }))
            setIsLoading(false);
            return;
        }

        axios.get(`https://form-1cx0.onrender.com/api/cities/${myCountry.id}/${stateData.id}`, {
            Headers: {
                "content-type": "application/json"
            }
        }).then(response => {
            const { success, error, message, data } = response.data;
            if (error) {
                alert('API Error: ', message);
                return;
            }

            console.log("city response: ", response.data);
            // if there is no cities in state
            if (data[0]?.noCity) {
                setCities([{ id: 9999, name: stateData.name }])
                setFormData((current) => ({ ...current, city: stateData.name }))
                return
            }
            setCities(data);
        }).finally(() => setIsLoading(false));
    }

    useEffect(() => {
        getCountries();
    }, []);


    const countryHandle = (e) => {
        setMyState(null);
        setMyCity(null);
        setStates([])
        setCities([])
        const selectedIndex = e.target.selectedIndex;
        const selectedOption = e.target.options[selectedIndex];
        const selectedText = selectedOption.textContent;

        // set country name in form data
        setFormData((current) => ({ ...current, country: selectedText, }))

        setMyCountry({ id: e.target.value, name: selectedText });
        getStates({ id: e.target.value, name: selectedText });

    }

    const stateHandle = (e) => {
        setMyCity(null);
        setCities([]);
        if (!myCountry) {
            setStateError("Please select your country");
            return;
        }
        const selectedIndex = e.target.selectedIndex;
        const selectedOption = e.target.options[selectedIndex];
        const selectedText = selectedOption.textContent;

        // set state name in form data
        setFormData((current) => ({ ...current, state: selectedText }))

        setMyState({ id: e.target.value, name: selectedText });
        getCities({ id: e.target.value, name: selectedText });
    }

    const cityHandle = (e) => {

        if (!formData.state) {
            setStateError("Please select your State");
            return;
        }
        const selectedIndex = e.target.selectedIndex;
        const selectedOption = e.target.options[selectedIndex];
        const selectedText = selectedOption.textContent;

        // set state name in form data
        setFormData((current) => ({ ...current, city: selectedText }))
    }





    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("data =>", formData)
        try {
            await userDataSchema.validate(formData, { abortEarly: false });
            setIsLoading(true)
            await axios.post('https://form-1cx0.onrender.com/api/register', { ...formData }, { headers: { 'Content-Type': 'application/json' } },)
                .then((response) => {
                    const { success, message, error, redirect } = response.data

                    if (success) return redirectTo(redirect);
                    if (error) {
                        return alert(message)
                    }
                }).catch(error => alert(error.message))
                .finally(() => setIsLoading(false))
            setIsLoading(false)
        } catch (error) {
            setIsLoading(false)
            const validationErrors = {}

            // formate all errors
            error?.inner?.forEach(error => {
                validationErrors[error.path] = error.message
            });
            setErrors(validationErrors)
        }
    };

    return (
        <div className='flex w-full min-h-[100vh] h-auto  items-center justify-center bg-gray-100'>
            <form onSubmit={handleSubmit} className='max-w-md w-full bg-white shadow-md rounded-md p-1 gap-0 py-2'>
                {isLoading && <Loading />}

                <h1 className=' font-semibold text-center text-2xl mb-4'>Register</h1>

                {/* Your input fields and components */}
                <div className="space-y-4">
                    <TextInput label={"First Name"} isError={errors?.firstName} fieldName={"firstName"} setText={setFormData} value={formData.firstName} placeholder={"Enter Your First Name"} />


                    <TextInput label={"Last Name"} isError={errors?.lastName} fieldName={"lastName"} setText={setFormData} value={formData.lastName} placeholder={"Enter Your Last Name"} />


                    <EmailInput isError={errors?.email} fieldName={"email"} value={formData.email} setMail={setFormData} label={"Email"} placeholder={"Enter Your Email"} />


                    <SelectInput value={myCountry?.id} isError={errors?.country} onChange={countryHandle} label={"Select Country"} options={countries} />


                    {(states.length > 0 || errors?.state) && <SelectInput defaultData={"Na"} isError={errors?.state} DefaultValue={null} value={myState?.id} onChange={stateHandle} label={"Select State"} options={states} />}


                    {(cities.length > 0 || errors?.city) && <SelectInput isError={errors?.city} onChange={cityHandle} value={myCity?.id} label={"Select City"} options={cities} />}


                </div>

                <div className='mt-4'>
                    <p className='font-semibold ml-6'>Gender</p>
                    <div className='flex items-center justify-between'>

                        <div className='grid grid-cols-2 gap-4 w-[90%] mx-auto'>
                            <RadioInput label={"Male"} fieldName={"gender"} setGender={setFormData} fieldValue="Male" value={formData.gender} name={"gender"} />
                            <RadioInput label={"Female"} fieldName={"gender"} setGender={setFormData} fieldValue={"Female"} value={formData.gender} name={"gender"} />
                        </div>
                    </div>
                    {errors.gender && <p className="text-red-500 text-sm ml-6">{errors?.gender}</p>}
                    <DateInput value={formData.dob} fieldName={'dob'} setDate={setFormData} isError={errors?.dob} label={"Date Of Birth (DD-MM-YYYY)"} />


                    <AgeInput fieldName={"age"} isError={errors.age} label={"Enter age"} readOnly={true} dob={formData.dob} age={formData.age} setAge={setFormData} placeholder={"Enter your age"} />
                </div>

                <div className='mt-4 flex items-center justify-center'>
                    <Button onClick={handleSubmit} name={"Register"} />
                </div>
            </form>
        </div>
    );
}

export default RegisterPage;
