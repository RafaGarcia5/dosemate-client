import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { getTreatmentsByDate, addTreatment, updateTreatment, deleteTreatment } from '../services/treatmentService';
import { currentMonth, currentYear } from '../utils/dateOperations';
import { useNotificationScheduler } from '../contexts/NotificationContext';

const useTreatmentList = ( externalUserId = null) => {
    const defaultUserId = useSelector((state) => state.auth.user?.id);
    const userRole = useSelector((state) => state.auth.user?.role);
    const userId = externalUserId || defaultUserId;
    const [treatmentList, setTreatmentList] = useState([]);
    const [selectedTreatment, setSelectedTreatment] = useState(null);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [dialogType, setDialogType] = useState(null);
    const [month, setMonth] = useState(currentMonth());
    const [year, setYear] = useState(currentYear());
    const { getTrackList } = useNotificationScheduler();
    const [loading, setLoading] = useState(false); 
    
    const getTreatments = async () => {
        try {
            setLoading(true);
            let data;
            externalUserId 
            ? data = await getTreatmentsByDate({month: month, year: year, patient_id: userId})
            : data = await getTreatmentsByDate({month: month, year: year});
            setTreatmentList(data);
            setLoading(false);
        } catch (e) {
            setTreatmentList([]);
            setLoading(false);
            console.error(e.response?.data?.message || e);
        }
    };
    
    useEffect(() => {
        if (userId) getTreatments();
    }, [userId, month, year]);

    const handleAddTreatment = async (newTreatment) => {
        try {
            const response = await addTreatment(userId, newTreatment);
            handleSuccess(response, 'Successfully added');
        } catch (e) {
            toast.error(e.response?.data?.message || 'Treatment creation failed');
        }
    };

    const handleUpdateTreatment = async (treatmentId, treatmentData) => {
        const changedFields = {};
        for (const key in treatmentData) {
            if (treatmentData[key] !== selectedTreatment[key]) {
                changedFields[key] = treatmentData[key];
            }
        }

        if (Object.keys(changedFields).length === 0) {
            toast.info('No changes to update');
            return;
        }

        try {
            const response = await updateTreatment(treatmentId, treatmentData);
            handleSuccess(response, 'Successfully updated');
        } catch (e) {
            toast.error(e.response?.data?.message || 'Treatment update failed');
        }
    };

    const handleDeleteTreatment = async (treatmentId) => {
        try {
            const response = await deleteTreatment(treatmentId);
            handleSuccess(response, 'Treatment deleted');
            await getTrackList();
        } catch (e) {
            toast.error(e.response?.data?.message || 'Failed to delete treatment');
        }
    };
    
    const handleConfirm = async () => {
        if(dialogType === 'delete' && selectedTreatment){
            await handleDeleteTreatment(selectedTreatment?.id);
        }
        setDialogType(null);
        setSelectedTreatment(null);
    };

    const handleSuccess = async (response, message) => {
        toast.success(response?.data?.message || message);
        await getTreatments();
    }

    return { 
        treatmentList, 
        selectedTreatment, 
        setSelectedTreatment, 
        addModalOpen, 
        setAddModalOpen, 
        handleAddTreatment, 
        handleUpdateTreatment, 
        dialogType, 
        setDialogType, 
        handleConfirm, 
        userRole,
        setMonth, 
        setYear,
        loading
    };
};

export { useTreatmentList };
