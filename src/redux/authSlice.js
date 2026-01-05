import { createSlice } from '@reduxjs/toolkit';

const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');


const initialState = {
    user : storedUser ? JSON.parse(storedUser) : null,
    token : storedToken ? storedToken : null,
};

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers:{
        login: (state, action) => {
            state.user = action.payload;
            localStorage.setItem('user', JSON.stringify(action.payload));
        },
        setToken: (state, action) => {
            state.token = action.payload;
            localStorage.setItem('token', action.payload);
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    }
});

export const { login, logout, setToken } = authSlice.actions;
export default authSlice.reducer;