import { renderHook, act } from '@testing-library/react';
import { useTreatmentForm } from '../hooks/useTreatmentForm';
import * as dateUtils from '../utils/dateOperations';

describe('useTreatmentForm', () => {
    let onSubmitMock;
    let onCloseMock;
    const mockToday = '2025-06-01';
    const emptyForm = {
        name: '',
        start_date: '',
        end_date: '',
        comment: ''
    }
    const initialData = {
        name: 'Headache',
        start_date: '2025-06-05',
        end_date: '2025-06-10',
        comment: 'Take pills every day'
    };

    beforeEach(() => {
        jest.clearAllMocks();
        onSubmitMock = jest.fn();
        onCloseMock = jest.fn();
    });

    test('should initialize with empty formData', () => {
        const { result } = renderHook(() =>
            useTreatmentForm(onSubmitMock, onCloseMock)
        );

        expect(result.current.formData).toEqual(emptyForm);
        expect(result.current.dateError).toBe(false);
    });

    test('should initialize with initialData if provided for an update operation', () => {
        const { result } = renderHook(() =>
            useTreatmentForm(onSubmitMock, onCloseMock, initialData)
        );

        expect(result.current.formData).toEqual(initialData);
    });

    test('should update formData on handleChange', () => {
        const { result } = renderHook(() =>
            useTreatmentForm(onSubmitMock, onCloseMock)
        );

        act(() => {
            result.current.handleChange({ target: { name: 'name', value: 'Flu' } });
        });

        expect(result.current.formData.name).toBe('Flu');
    });

    test('should call onSubmit and reset if dates are valid', () => {
        jest.spyOn(dateUtils, 'dateRange').mockReturnValue(false);
        const { result } = renderHook(() =>
            useTreatmentForm(onSubmitMock, onCloseMock)
        );

        const validForm = {
            name: 'Headache',
            start_date: '2025-06-01',
            end_date: '2025-06-05',
            comment: 'Take medicine',
        };

        act(() => {
            result.current.handleChange({ target: { name: 'name', value: validForm.name } });
            result.current.handleChange({ target: { name: 'start_date', value: validForm.start_date } });
            result.current.handleChange({ target: { name: 'end_date', value: validForm.end_date } });
            result.current.handleChange({ target: { name: 'comment', value: validForm.comment } });
        });

        act(() => {
            result.current.handleSubmit({ preventDefault: jest.fn() });
        });

        expect(dateUtils.dateRange).toHaveBeenCalledWith(validForm.start_date, validForm.end_date);
        expect(onSubmitMock).toHaveBeenCalledWith(validForm);
        expect(onCloseMock).toHaveBeenCalled();
        expect(result.current.formData).toEqual(emptyForm);
        expect(result.current.dateError).toBe(false);
    });

    test('should set dateError if dates are invalid', () => {
        jest.spyOn(dateUtils, 'dateRange').mockReturnValue(true);
        const { result } = renderHook(() =>
            useTreatmentForm(onSubmitMock, onCloseMock)
        );

        act(() => {
            result.current.handleChange({ target: { name: 'start_date', value: '2025-06-10' } });
            result.current.handleChange({ target: { name: 'end_date', value: '2025-06-01' } });
        });

        act(() => {
            result.current.handleSubmit({ preventDefault: jest.fn() });
        });

        expect(result.current.dateError).toBe(true);
        expect(onSubmitMock).not.toHaveBeenCalled();
        expect(onCloseMock).not.toHaveBeenCalled();
    });
}); 
