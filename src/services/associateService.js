import { get, post, del } from './config';
const routeName = 'relation';

const addAssoc = (data) => post(routeName, data);

const getCarevivers = () => get(`${routeName}/caregiverList`);

const getPatients = () => get(`${routeName}/patientList`);

const deleteCaregiver = (data) => del(`${routeName}/deleteRelation`, data)

export { addAssoc, getCarevivers, getPatients, deleteCaregiver };