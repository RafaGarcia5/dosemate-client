import { renderHook, act, waitFor } from '@testing-library/react';
import { useTrackList } from '../hooks/useTrackList';
import * as trackService from '../services/trackService';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
    useSelector: jest.fn(),
}));

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
        info: jest.fn(),
        dismiss: jest.fn(),
    },
}));

jest.mock('../services/trackService', () => ({
    getTrackBySchedule: jest.fn(),
    updateTrack: jest.fn(),
}));

jest.mock('../utils/dateOperations', () => ({
    today: '2025-06-02',
    timestamp: '2025-06-02 12:00:00',
    timeUser: jest.fn((value) => value),
}));

describe('useTrackList', () => {
    const mockUserId = '1';

    beforeEach(() => {
        jest.clearAllMocks();
        useSelector.mockImplementation((selectorFn) =>
            selectorFn({ auth: { user: { id: mockUserId } } })
        );
    });

    test('should get and set track list', async () => {
        const mockTracks = [{
            id: '1',
            medicament_name: 'Paracetamol',
            taken_dose: 0,
            schedule: '2025-06-02 12:00:00',
        }];
        trackService.getTrackBySchedule.mockResolvedValue(mockTracks);

        const { result } = renderHook(() => useTrackList());

        await waitFor(() => {
            expect(result.current.trackList).toEqual(mockTracks);
        });

        expect(trackService.getTrackBySchedule).toHaveBeenCalledWith(mockUserId, '2025-06-02');
    });

    test('should handle error getting tracks', async () => {
        const infoMessage = 'No doses planned';
        trackService.getTrackBySchedule.mockRejectedValue(new Error('Track not found'));

        renderHook(() => useTrackList());

        await waitFor(() => {
            expect(toast.info).toHaveBeenCalledWith(infoMessage);
        });
    });

    test('should update a track when changes exist', async () => {
        const originalTrack = {
            id: '1',
            taken_dose: 0,
            schedule: '2025-06-02 10:00:00',
        };

        const updatedTrackData = {
            taken_dose: 1,
            schedule: '2025-06-02 12:00:00', // timestamp from mock
        };

        trackService.updateTrack.mockResolvedValue({ success: 'Track successfully updated' });
        trackService.getTrackBySchedule.mockResolvedValue([originalTrack]);

        const { result } = renderHook(() => useTrackList());

        await waitFor(() => {
            expect(result.current.trackList.length).toBe(1);
        });

        act(() => {
            result.current.setSelectedTrack(originalTrack);
            result.current.setDialogType('confirm');
        });

        await act(async () => {
            await result.current.handleConfirm();
        });

        expect(trackService.updateTrack).toHaveBeenCalledWith('1', updatedTrackData);
        expect(toast.success).toHaveBeenCalledWith('Track successfully updated');
    });

    test('should not update track if there are no changes', async () => {
        const track = {
            id: '1',
            taken_dose: 1,
            schedule: '2025-06-02 12:00:00',
        };

        const { result } = renderHook(() => useTrackList());

        act(() => {
            result.current.setSelectedTrack(track);
            result.current.setDialogType('confirm');
        });

        await act(async () => {
            await result.current.handleConfirm();
        });

        expect(trackService.updateTrack).not.toHaveBeenCalled();
        expect(toast.info).toHaveBeenCalledWith('No changes to update');
    });
});
