import { Router } from 'express';
import { getCities, getCountries, getStates } from '../controllers/geoLocation.controller.js';
import { getUserInfo, registerUser } from '../controllers/register.controller.js';
const router = Router();

router.get('/api/countries', getCountries);
router.get('/api/states/:countryId', getStates);
router.get('/api/cities/:countryId/:stateId', getCities);
router.post('/api/register', registerUser);
router.get('/api/info/:id', getUserInfo)


export { router as routes }