import { renderHook, act } from '@testing-library/react';
import { useAssocForm } from '../hooks/useAssocForm';

describe('useAssocForm', () => {
    let onSubmitMock;
    let onCloseMock;

    beforeEach(() => {
        onSubmitMock = jest.fn();
        onCloseMock = jest.fn();
    });

    test('should initialize with empty id', () => {
        const { result } = renderHook(() => useAssocForm(onSubmitMock, onCloseMock));
        expect(result.current.id).toBe('');
    });

    test('should update id on handleChange', () => {
        const { result } = renderHook(() => useAssocForm(onSubmitMock, onCloseMock));
        act(() => {
            result.current.handleChange({ target: { value: '13' } });
        });

        expect(result.current.id).toBe('13');
    });

    test('should call onSubmit, onClose, and reset id on handleSubmit', () => {
        const { result } = renderHook(() => useAssocForm(onSubmitMock, onCloseMock));

        act(() => {
            result.current.handleChange({ target: { value: '13' } });
        });

        act(() => {
            result.current.handleSubmit({ preventDefault: jest.fn() });
        });

        expect(onSubmitMock).toHaveBeenCalledWith('13');
        expect(onCloseMock).toHaveBeenCalled();
        expect(result.current.id).toBe('');
    });
}); 
