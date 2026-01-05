import { post } from './config';

const loginRequest = (email, password) => post('login', {email, password});

const registerRequest = (formData) => post('register', formData);

const logoutRequest = () => post('logout');

export { loginRequest, registerRequest, logoutRequest };