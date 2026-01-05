import { renderHook, act } from '@testing-library/react';
import { useLogin } from '../hooks/useLogin';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { login } from '../redux/authSlice';
import { loginRequest } from '../services/authService';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
}));

jest.mock('react-router', () => ({
    useNavigate: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
    },
}));

jest.mock('../redux/authSlice', () => ({
    login: jest.fn((user) => ({ type: 'LOGIN', payload: user })),
}));

jest.mock('../services/authService', () => ({
    loginRequest: jest.fn(),
})); 

describe('useLogin', () => {
    const mockDispatch = jest.fn();
    const mockNavigate = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useDispatch.mockReturnValue(mockDispatch);
        useNavigate.mockReturnValue(mockNavigate);
    });

    test('should handle successful login', async () => {
        const mockUser = { id: 1, name: 'Rafael Garcia' };
        loginRequest.mockResolvedValue({ user: mockUser });

        const onError = jest.fn();

        const { result } = renderHook(() => useLogin());

        await act(async () => {
            await result.current.handleLogin({
                email: 'rafael@gmail.com',
                password: 'rafael123',
                onError,
            });
        });

        expect(loginRequest).toHaveBeenCalledWith('rafael@gmail.com', 'rafael123');
        expect(mockDispatch).toHaveBeenCalledWith(login(mockUser));
        expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
        expect(onError).toHaveBeenCalledWith(false);
    });

    test('should handle login error', async () => {
        const onError = jest.fn();
        loginRequest.mockRejectedValue({
            response: { data: { error: 'Invalid credentials' } },
        });

        const { result } = renderHook(() => useLogin());

        await act(async () => {
            await result.current.handleLogin({
                email: 'rafael@gmail.com',
                password: '123456',
                onError,
            });
        });

        expect(toast.error).toHaveBeenCalledWith('Invalid credentials');
        expect(onError).toHaveBeenCalledWith(true);
    });
});
