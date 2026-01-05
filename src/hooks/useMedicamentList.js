import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getMedicaments, addMedicament, updateMedicament, deleteMedicament } from '../services/medicamentService';
import { useNotificationScheduler } from '../contexts/NotificationContext';

const useMedicamentList = (treatmentId) => {
    const [medicamentList, setMedicamentList] = useState([]);
    const [selectedMedicament, setSelectedMedicament] = useState(-1);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [dialogType, setDialogType] = useState(null);
    const { getTrackList } = useNotificationScheduler();
    const [loading, setLoading] = useState(false);

    const getMedicamentList = async () => {
        try {
            setLoading(true);
            const data = await getMedicaments(treatmentId);
            setMedicamentList(data);
            setLoading(false);
        } catch (e) {
            setMedicamentList([]);
            setLoading(false);
            console.error(e.response?.data?.error || e);
        }
    };
    
    useEffect(() => {
        if (treatmentId) getMedicamentList();
    }, [treatmentId]);

    const handleAddMedicament = async (newMedicament) => {
        newMedicament['interval_hours'] = parseInt(newMedicament['interval_hours']);

        try {
            const response = await addMedicament(treatmentId, newMedicament);
            handleSuccess(response, 'Successfully added');
        } catch (e) {
            toast.error(e.response?.data?.message || 'Medicament creation failed');
        }
    };

    const handleUpdateMedicament = async (medicamenId, medicamentData) => {
        const changedFields = {};
        for (const key in medicamentData) {
            if (medicamentData[key] !== selectedMedicament[key]) {
                changedFields[key] = medicamentData[key];
            }
        }

        if (Object.keys(changedFields).length === 0) {
            toast.info('No changes to update');
            return;
        }

        try {
            const response = await updateMedicament(medicamenId, medicamentData);
            handleSuccess(response, 'Successfully updated');
        } catch (e) {
            toast.error(e.response?.data?.message || 'Medicament update failed');
        }
    }

    const handleDeleteMedicament = async (medicamentId) => {
        try{
            const response = await deleteMedicament(medicamentId);
            handleSuccess(response, 'Medicament removed');
        }catch (e){
            toast.error(e.response?.data?.messages || 'Failed to remove medicament');
        }
    }

    const handleConfirm = async () => {
        if(dialogType === 'delete' && selectedMedicament){
            await handleDeleteMedicament(selectedMedicament?.id);
        }
        setDialogType(null);
        setSelectedMedicament(null);
    }

    const handleSuccess = async (response, message) => {
        toast.success(response?.data?.message || message);
        await getMedicamentList();
        await getTrackList();
    }

    return { 
        medicamentList, 
        selectedMedicament, 
        setSelectedMedicament, 
        addModalOpen, 
        setAddModalOpen, 
        handleAddMedicament, 
        handleUpdateMedicament, 
        dialogType, 
        setDialogType, 
        handleConfirm,
        loading
    };
};

export { useMedicamentList };
