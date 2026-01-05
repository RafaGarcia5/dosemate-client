import { renderHook, act } from '@testing-library/react';
import { useMedicamentForm } from '../hooks/useMedicamentForm';
import { dateRange } from '../utils/dateOperations';

jest.mock('../utils/dateOperations', () => ({
    dateRange: jest.fn(),
    today: '2024-06-02',
}));

describe('useMedicamentForm', () => {
    const mockSubmit = jest.fn();
    const mockClose = jest.fn();

    const mockEmptyData = {
        name: '', 
        dosage: '',
        interval_hours: 0,
        start_date: '',
        end_date: '',
        comment: ''
    }

    const mockFormData = {
        name: 'Ibuprofen',
        dosage: '200mg',
        interval_hours: 6,
        start_date: '2024-06-01T00:00',
        end_date: '2024-06-10',
        comment: 'Take after meals',
    }

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should initialize with default values', () => {
        const { result } = renderHook(() => useMedicamentForm(mockSubmit, mockClose));

        expect(result.current.formData).toEqual(mockEmptyData);
        expect(result.current.dateError).toBe(false);
        expect(result.current.today).toBe('2024-06-02');
    });

    test('should populate formData with initialData', () => {
        const { result } = renderHook(() => useMedicamentForm(mockSubmit, mockClose, mockFormData));

        expect(result.current.formData).toEqual(mockFormData);
    });

    test('should update formData on handleChange', () => {
        const { result } = renderHook(() => useMedicamentForm(mockSubmit, mockClose));

        act(() => {
            result.current.handleChange({
                target: { name: 'name', value: 'Paracetamol' },
            });
        });

        expect(result.current.formData.name).toBe('Paracetamol');
    });

    test('should set dateError to true if dateRange returns true', () => {
        dateRange.mockReturnValue(true);
        const { result } = renderHook(() => useMedicamentForm(mockSubmit, mockClose));

        act(() => { result.current.handleSubmit({ preventDefault: jest.fn() }); });

        expect(result.current.dateError).toBe(true);
        expect(mockSubmit).not.toHaveBeenCalled();
        expect(mockClose).not.toHaveBeenCalled();
    });

    test('should call onSubmit and onClose if date is valid', () => {
        dateRange.mockReturnValue(false);

        const { result } = renderHook(() => useMedicamentForm(mockSubmit, mockClose));

        act(() => {
            result.current.handleChange({ target: { name: 'name', value: 'Aspirin' } });
            result.current.handleSubmit({ preventDefault: jest.fn() });
        });

        expect(result.current.dateError).toBe(false);
        expect(mockClose).toHaveBeenCalled();
    });
});
