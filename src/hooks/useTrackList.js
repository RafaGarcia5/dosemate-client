import { useState } from 'react';
import { toast } from 'react-toastify';
import { updateTrack } from '../services/trackService';
import { timestamp } from '../utils/dateOperations';
import { useNotificationScheduler } from '../contexts/NotificationContext';

const useTrackList = () => {
    const { trackList, getTrackList, setDate, trackLoading } = useNotificationScheduler();
    const [selectedTrack, setSelectedTrack] = useState(null);
    const [dialogType, setDialogType] = useState(null);
    
    const handleUpdateTrack = async (trackId, trackData) => {
        const changedFields = {};
        for (const key in trackData) {
            if (trackData[key] !== selectedTrack[key]) {
                changedFields[key] = trackData[key];
            }
        }

        if (Object.keys(changedFields).length === 0) {
            toast.info('No changes to update');
            return;
        }

        try {
            const response = await updateTrack(trackId, trackData);
            toast.success(response?.data?.message || 'Successfully updated');
            await getTrackList();
        } catch (e) {
            toast.error(e.response?.data?.message || 'Medicament update failed');
        }
    }

    const handleConfirm = async () => {
        if(dialogType === 'confirm' && selectedTrack){
            const trackData = {taken_dose: 1, taken_time : timestamp()}
            await handleUpdateTrack(selectedTrack?.id, trackData);
        }
        setDialogType(null);
        setSelectedTrack(null);
    }

    return { 
        trackList, 
        selectedTrack, 
        setSelectedTrack, 
        dialogType, 
        setDialogType, 
        handleConfirm, 
        setDate,
        trackLoading 
    };
};

export { useTrackList };