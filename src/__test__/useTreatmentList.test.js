import { renderHook, act, waitFor } from '@testing-library/react';
import { useTreatmentList } from '../hooks/useTreatmentList';
import * as treatmentService from '../services/treatmentService';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { currentMonth, currentYear } from '../utils/dateOperations';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
        info: jest.fn(),
    },
}));

jest.mock('../services/treatmentService', () => ({
    getTreatmentsByDate: jest.fn(),
    addTreatment: jest.fn(),
    updateTreatment: jest.fn(),
    deleteTreatment: jest.fn(),
}));

describe('useTreatmentList', () => {
    const mockUser = {
        id: '1',
        name: 'Rafael Garcia',
        role: 'patient',
    };

    const mockTreatments = [{
        id: 5,
        patient_id: 8,
        name: 'Headache',
        start_date: '2025-06-20',
        end_date: '2025-06-23',
        comment: 'Come back in 3 days',
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
        useSelector.mockImplementation((cb) => cb({ auth: { user: mockUser } }));
    });

    test('should get patient treatments', async () => {
        treatmentService.getTreatmentsByDate.mockResolvedValue(mockTreatments);

        const { result } = renderHook(() => useTreatmentList());

        await waitFor(() => {
        expect(result.current.treatmentList).toEqual(mockTreatments);
        });

        expect(treatmentService.getTreatmentsByDate).toHaveBeenCalledWith(
        mockUser.id,
        currentMonth(),
        currentYear()
        );
    });

    test('should add a treatment and refresh list', async () => {
        const newTreatment = {
        patient_id: 8,
        name: 'Headache',
        start_date: '2025-06-20',
        end_date: '2025-06-23',
        comment: 'Come back in 5 days',
        };

        treatmentService.addTreatment.mockResolvedValue({
        success: 'Treatment successfully registered',
        });
        treatmentService.getTreatmentsByDate.mockResolvedValue(mockTreatments);

        const { result } = renderHook(() => useTreatmentList());

        await waitFor(() => {
        expect(treatmentService.getTreatmentsByDate).toHaveBeenCalled();
        });

        await act(async () => {
        await result.current.handleAddTreatment(newTreatment);
        });

        expect(treatmentService.addTreatment).toHaveBeenCalledWith(
        mockUser.id,
        newTreatment
        );
        expect(toast.success).toHaveBeenCalledWith(
        'Treatment successfully registered'
        );
        expect(treatmentService.getTreatmentsByDate).toHaveBeenCalledTimes(2); // initial + refresh
    });

    test('should update treatment if fields have changed', async () => {
        const original = { id: '3', name: 'Flu' };
        treatmentService.getTreatmentsByDate.mockResolvedValue([original]);
        treatmentService.updateTreatment.mockResolvedValue({
        success: 'Treatment updated successfully',
        });

        const { result } = renderHook(() => useTreatmentList());

        await waitFor(() => {
        expect(treatmentService.getTreatmentsByDate).toHaveBeenCalled();
        });

        act(() => {
        result.current.setSelectedTreatment(original);
        });

        await act(async () => {
        await result.current.handleUpdateTreatment('3', {
            name: 'Flu and headache',
        });
        });

        expect(treatmentService.updateTreatment).toHaveBeenCalledWith('3', {
        name: 'Flu and headache',
        });
        expect(toast.success).toHaveBeenCalledWith(
        'Treatment updated successfully'
        );
        expect(treatmentService.getTreatmentsByDate).toHaveBeenCalledTimes(2);
    });

    test('should show info toast if no fields have changed on update', async () => {
        const sameData = { id: '3', name: 'Flu' };
        treatmentService.getTreatmentsByDate.mockResolvedValue([sameData]);

        const { result } = renderHook(() => useTreatmentList());

        await waitFor(() => {
        expect(treatmentService.getTreatmentsByDate).toHaveBeenCalled();
        });

        act(() => {
        result.current.setSelectedTreatment(sameData);
        });

        await act(async () => {
        await result.current.handleUpdateTreatment('3', { name: 'Flu' });
        });

        expect(treatmentService.updateTreatment).not.toHaveBeenCalled();
        expect(toast.info).toHaveBeenCalledWith('No changes to update');
    });

    test('should delete treatment via handleConfirm', async () => {
        treatmentService.deleteTreatment.mockResolvedValue({
        success: 'Treatment deleted succesfully',
        });
        treatmentService.getTreatmentsByDate.mockResolvedValue([]);

        const { result } = renderHook(() => useTreatmentList());

        await waitFor(() => {
        expect(treatmentService.getTreatmentsByDate).toHaveBeenCalled();
        });

        act(() => {
        result.current.setSelectedTreatment({ id: '3' });
        result.current.setDialogType('delete');
        });

        await act(async () => {
        await result.current.handleConfirm();
        });

        expect(treatmentService.deleteTreatment).toHaveBeenCalledWith('3');
        expect(toast.success).toHaveBeenCalledWith(
        'Treatment deleted succesfully'
        );
        expect(result.current.selectedTreatment).toBe(null);
        expect(result.current.dialogType).toBe(null);
        expect(treatmentService.getTreatmentsByDate).toHaveBeenCalledTimes(2);
    });

    test('should not get treatments if userId is not available', async () => {
        useSelector.mockImplementation(() => null);
        const { result } = renderHook(() => useTreatmentList());

        expect(result.current.treatmentList).toEqual([]);
        expect(treatmentService.getTreatmentsByDate).not.toHaveBeenCalled();
    });

    test('should show error toast on add failure', async () => {
        const newTreatment = { name: 'X' };
        treatmentService.addTreatment.mockRejectedValueOnce({
        response: { data: { error: 'Add failed' } },
        });

        const { result } = renderHook(() => useTreatmentList());

        await waitFor(() => {
        expect(treatmentService.getTreatmentsByDate).toHaveBeenCalled();
        });

        await act(async () => {
        await result.current.handleAddTreatment(newTreatment);
        });

        expect(toast.error).toHaveBeenCalledWith('Add failed');
    });
});
