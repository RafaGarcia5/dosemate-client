import {get, post, put, del} from './config';
const routeName = 'treatment'

const getTreatmentsByUser = () => get(`${routeName}/byPatient`);

const getTreatmentsByDate = (data) => get(`${routeName}/byDate`, data);

const addTreatment = (userId, treatmentData) => post(routeName, { patient_id: userId, ...treatmentData });

const updateTreatment = (treatmentId, treatmentData) => put(`${routeName}/${treatmentId}`, treatmentData);

const deleteTreatment = (treatmentId) => del(`${routeName}/${treatmentId}`, {id: treatmentId});

export { getTreatmentsByUser, getTreatmentsByDate, addTreatment, updateTreatment, deleteTreatment };