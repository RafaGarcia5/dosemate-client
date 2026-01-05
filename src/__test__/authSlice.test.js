import authReducer, { login, logout } from '../redux/authSlice';

describe('authSlice reducer', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('should return initial state', () => {
        expect(authReducer(undefined, {})).toEqual({ user: null });
    });

    test('should handle login action', () => {
        const userData = { id: 1, name: 'Rafael Garcia', role:'patient' };
        const newState = authReducer(undefined, login(userData));

        expect(newState.user).toEqual(userData);
        expect(localStorage.getItem('user')).toEqual(JSON.stringify(userData));
    });

    test('should handle logout action', () => {
        const prevState = { user: { id: 1, name: 'Rafael Garcia', role: 'patient' } };
        const newState = authReducer(prevState, logout());

        expect(newState.user).toBeNull();
        expect(localStorage.getItem('user')).toBeNull();
    });
});
