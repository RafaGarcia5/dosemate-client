import { renderHook, act } from '@testing-library/react';
import { useRegister } from '../hooks/useRegister';
import { registerRequest } from '../services/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router';

jest.mock('../services/authService', () => ({
    registerRequest: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    },
}));

jest.mock('react-router', () => ({
    useNavigate: jest.fn(),
}));

describe('useRegister hook', () => {
    const mockNavigate = jest.fn();
    const formData = {
        id: 1,
        name: 'Rafael Garcia',
        birth_date: '2001-01-09',
        gender: 'M',
        email: 'rafael@gmail.com', 
        role: 'patient',
        doctor: 'Gonzalo Garcia'
    };

    beforeEach(() => {
        jest.clearAllMocks();
        useNavigate.mockReturnValue(mockNavigate);
    });

    test('should call registerRequest and navigate on success', async () => {
        const successMessage = 'User successfully registered';

        registerRequest.mockResolvedValue({ success: successMessage });

        const { result } = renderHook(() => useRegister());

        await act(async () => {
            await result.current.handleRegister(formData);
        });

        expect(registerRequest).toHaveBeenCalledWith(formData);
        expect(toast.success).toHaveBeenCalledWith(successMessage);
        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    test('should show error toast on register failure with specific message', async () => {
        const errorResponse = { response: { data: { error: 'Email already used' } } };
        registerRequest.mockRejectedValue(errorResponse);

        const { result } = renderHook(() => useRegister());

        await act(async () => {
            await result.current.handleRegister(formData);
        });

        expect(registerRequest).toHaveBeenCalledWith(formData);
        expect(toast.error).toHaveBeenCalledWith('Email already used');
        expect(mockNavigate).not.toHaveBeenCalled();
    });
}); 
