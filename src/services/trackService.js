import { get, put } from './config';
const routeName = 'dose-track';

const getTrackById = (trackId) => get( `${routeName}/trackById`, {id: trackId});

const getTrackByMedicament = (medicamentId) => get(`${routeName}/trackByMedicament`, {id: medicamentId});

const getTrackBySchedule = (schedule) => get(`${routeName}/trackBySchedule`, {schedule: schedule});

const updateTrack = (trackId, data) => put(`${routeName}/${trackId}`, data);

export { getTrackById, getTrackByMedicament, getTrackBySchedule, updateTrack };