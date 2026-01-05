import { get, put } from './config';
const routeName = 'profile';

const getProfile = () => get(routeName);

const updateProfile = (data) => put(routeName, data);

export { getProfile, updateProfile };