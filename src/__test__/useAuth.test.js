import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';

jest.mock('react-redux', () => ({
    useDispatch: jest.fn(),
    useSelector: jest.fn(),
}));

jest.mock('../redux/authSlice', () => ({
    logout: jest.fn(() => ({ type: 'LOGOUT' })),
}));

describe('useAuth hook', () => {
    const mockDispatch = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        useDispatch.mockReturnValue(mockDispatch);
    });

    test('should return user from redux state', () => {
        const mockUser = { id: 1, name: 'Rafael Garcia', role: 'patient' };
        useSelector.mockImplementation((selectorFn) =>
            selectorFn({ auth: { user: mockUser } })
        );

        const { result } = renderHook(() => useAuth());
        expect(result.current.user).toEqual(mockUser);
    });

    test('should dispatch logout when handleLogout is called', () => {
        useSelector.mockImplementation((selectorFn) =>
            selectorFn({ auth: { user: {} } })
        );

        const { result } = renderHook(() => useAuth());
        act(() => {
            result.current.handleLogout();
        });

        expect(mockDispatch).toHaveBeenCalledWith(logout());
    });
}); 
