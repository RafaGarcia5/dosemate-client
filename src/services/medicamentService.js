import { get, post, put, del } from './config';
const routeName = 'medicament';

const getMedicaments = (treatmentId) => get(`${routeName}/${treatmentId}`);

const addMedicament = (treatmentId, medicamentData) => post(routeName, { treatment_id: treatmentId, ...medicamentData });

const updateMedicament = (medicamentId, medicamentData) => put(`${routeName}/${medicamentId}`, medicamentData);

const deleteMedicament = (medicamentId) => del(`${routeName}/${medicamentId}`);

export { getMedicaments, addMedicament, updateMedicament, deleteMedicament };