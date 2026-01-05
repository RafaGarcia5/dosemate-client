import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addAssoc, getCarevivers, getPatients,deleteCaregiver } from '../services/associateService';
import { useTranslation } from 'react-i18next';

const useAssocList = () => {
    const { t } = useTranslation('messages');
    const user = useSelector((state) => state.auth?.user);
    const userId = user.id;
    const role = user.role;
    const [assocList, setAssocList] = useState([]);
    const [dialogType, setDialogType] = useState(null);
    const [selectedAssoc, setSelectedAssoc] = useState(null);
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const getAssocList = async () => {
        setLoading(true);
        try {
            const data = role === 'patient' 
                        ? await getCarevivers()
                        : await getPatients();
            setAssocList( data );
        } catch (e) {
            setAssocList([]);
            console.error(e.response?.data?.message || e);
        } finally {
            setLoading(false);
        }
    };

    const deleteRelation = async (assocId) => {
        let info = {}
        if(role === 'patient'){
            info = {patient_id: userId, caregiver_id : assocId};
        }else{
            info = {patient_id: assocId, caregiver_id: userId};
        }

        try {
            const response = await deleteCaregiver(info);
            handleSuccess(response, t('assoc.delete.success'));
        } catch (e) {
            toast.error(e.response?.data?.error || t('assoc.delete.fail'));
        }
    };

    useEffect(() => {
        if (userId){
            getAssocList();
        }
    }, [userId]);

    const handleConfirm = async () => {
        if(dialogType === 'delete' && selectedAssoc){
            await deleteRelation(selectedAssoc?.id);
        }
        setDialogType(null);
        setSelectedAssoc(null);
    };

    const handleAddAssoc = async (assocId) => {
        let data = {};
        if(role === 'patient'){
            data = {
                patient_id : userId,
                caregiver_id: parseInt(assocId)
            };
        }else{
            data = {
                patient_id : assocId,
                caregiver_id: parseInt(userId)
            };
        }

        try {
            const response = await addAssoc(data);
            handleSuccess(response, t('assoc.add.success'));
        } catch (e) {
            toast.error(e.response?.data?.error || t('assoc.add.fail'));
        }
    }

    const handleSuccess = async(response, message) => {
        toast.success(response?.message || message);
        await getAssocList();
    }

    return { 
        role, 
        assocList, 
        dialogType, 
        setDialogType, 
        selectedAssoc, 
        setSelectedAssoc, 
        handleConfirm, 
        addModalOpen, 
        setAddModalOpen, 
        handleAddAssoc,
        loading
    };
};

export { useAssocList };