import { renderHook, act, waitFor } from '@testing-library/react';
import { useProfile } from '../hooks/useProfile';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getProfile, updateProfile } from '../services/profileService';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        error: jest.fn(),
        success: jest.fn(),
        info: jest.fn(),
    },
}));

jest.mock('../services/profileService', () => ({
    getProfile: jest.fn(),
    updateProfile: jest.fn(),
}));

describe('useProfile', () => {
    const mockUser = {
        id: 1,
        name: 'Rafael Garcia',
        role: 'patient'
    };

    beforeEach(() => {
        jest.clearAllMocks();
        useSelector.mockReturnValue(mockUser.id);
    });

    test('should update user state on handleChange', async () => {
        getProfile.mockResolvedValue(mockUser);

        const { result } = renderHook(() => useProfile());
        await waitFor(() => expect(result.current.user).toBeTruthy());

        act(() => {
            result.current.handleChange({
                target: { name: 'name', value: 'Alfredo' },
            });
        });

        expect(result.current.user.name).toBe('Alfredo');
    });

    test('should show info toast if no changes are submitted', async () => {
        getProfile.mockResolvedValue(mockUser);

        const { result } = renderHook(() => useProfile());
        await waitFor(() => expect(result.current.user).toBeTruthy());

        await act(async () => {
            await result.current.handleSubmit({ preventDefault: () => {} });
        });

        expect(toast.info).toHaveBeenCalledWith('No changes to update');
        expect(updateProfile).not.toHaveBeenCalled();
    });

  test('should submit updated fields and show success toast', async () => {
        const updated = { ...mockUser, name: 'Jane' };
        getProfile.mockResolvedValueOnce(mockUser);
        getProfile.mockResolvedValueOnce(updated);
        updateProfile.mockResolvedValue({ success: 'User updated successfully' });

        const { result } = renderHook(() => useProfile());
        await waitFor(() => expect(result.current.user).toBeTruthy());

        act(() => {
            result.current.handleChange({
                target: { name: 'name', value: 'Jane' },
            });
        });

        await act(async () => {
            await result.current.handleSubmit({ preventDefault: () => {} });
        });

        expect(updateProfile).toHaveBeenCalledWith(mockUser.id, { name: 'Jane' });
        expect(toast.success).toHaveBeenCalledWith('User updated successfully');
  });

  test('should include password fields if changePassword is true', async () => {
        getProfile.mockResolvedValue(mockUser);
        updateProfile.mockResolvedValue({ success: 'User updated successfully' });

        const { result } = renderHook(() => useProfile());
        await waitFor(() => expect(result.current.user).toBeTruthy());

        act(() => {
            result.current.setChangePassword(true);
            result.current.setPasswords({
                old_password: 'rafael123',
                new_password: 'rafa123',
            });

            result.current.handleChange({
                target: { name: 'name', value: 'Rafa' },
            });
        });

        await act(async () => {
            await result.current.handleSubmit({ preventDefault: () => {} });
        });

        expect(updateProfile).toHaveBeenCalledWith(mockUser.id, {
            name: 'Rafa',
            old_password: 'rafael123',
            new_password: 'rafa123',
        });
        expect(toast.success).toHaveBeenCalled();
  });

  test('should show error toast on failed getProfile', async () => {
    getProfile.mockRejectedValue({ response: { data: { error: 'User not found' } } });

    renderHook(() => useProfile());

    await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith('User not found');
    });
  });

    test('should show error toast on failed updateProfile', async () => {
        getProfile.mockResolvedValue(mockUser);
        updateProfile.mockRejectedValue({ response: { data: { error: 'Error updating profile' } } });

        const { result } = renderHook(() => useProfile());
        await waitFor(() => expect(result.current.user).toBeTruthy());

        act(() => {
            result.current.handleChange({
                target: { name: 'name', value: 'Jane' },
            });
        });

        await act(async () => {
            await result.current.handleSubmit({ preventDefault: () => {} });
        });

        expect(toast.error).toHaveBeenCalledWith('Error updating profile');
    });
});