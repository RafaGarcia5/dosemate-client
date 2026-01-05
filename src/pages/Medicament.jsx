import '../styles/Medicament.css';
import { useState } from 'react';
import { useMedicamentList } from '../hooks/useMedicamentList';
import { Modal, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import MedicamentCard from '../components/MedicamentCard';
import MedicamentForm from '../components/MedicamentForm';
import ConfirmationDialog from '../components/ConfirmationDialog';
import CardSkeleton from '../components/skeletons/CardSkeleton';

export default function Medicament({treatmentId, treatmentName, open, onClose, userRole}){
    const { t } = useTranslation('medicament');
    const { t: tCommon } = useTranslation('common');
    const { 
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
    } = useMedicamentList(treatmentId);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleDeleteClick = (medicament) => {
        setDialogType('delete');
        setSelectedMedicament(medicament);
    }

    const handleUpdateClick = (medicament) => {
        setSelectedMedicament(medicament);
        setIsEditMode(true);
        setAddModalOpen(true);
    }
    return(
        <Modal open={open} onClose={onClose}>
            <div className='medicament-modal-container'>
                <div className='medicament-modal-list-row'>
                    <p><b>{treatmentId + ': ' + treatmentName}</b></p>
                    { userRole==='patient' && (
                        <Button 
                            variant='contained' 
                            color='primary' 
                            onClick={() => {
                                setIsEditMode(false);
                                setSelectedMedicament(null);
                                setAddModalOpen(true);
                            }}
                        >
                            { tCommon('button.add') }
                        </Button>
                    )}
                </div>
                <div className='medicament-modal-item-container'>
                    { loading 
                        ? (
                            <>
                                {[...Array(2)].map((_, idx) => (
                                    <CardSkeleton key={idx} />
                                ))}
                            </>
                        )
                        : (medicamentList.length === 0 
                            ? (<h1>{ t('withoutInfo') }</h1>) 
                            : (medicamentList.map((medicament) => (
                                <MedicamentCard 
                                    key={ medicament.id } 
                                    medicament={ medicament } 
                                    onDelete={ userRole !== 'caregiver' ? handleDeleteClick : null }
                                    onUpdate={ userRole !== 'caregiver' ? handleUpdateClick : null }
                                />
                            ))
                        ))
                    }
                </div>

                <MedicamentForm 
                    key={addModalOpen + (isEditMode ? selectedMedicament?.id : 'new')}
                    open={ addModalOpen }
                    onClose={() => {
                        setAddModalOpen(false);
                        setSelectedMedicament(null);
                    }}
                    onSubmit={(formData) => {
                        if(isEditMode){
                            handleUpdateMedicament(selectedMedicament.id, formData);
                        }else{
                            handleAddMedicament(formData);
                        }
                    }}
                    initialData={isEditMode ? selectedMedicament : null}
                    isEdit={isEditMode}
                />

                <ConfirmationDialog
                    open={dialogType === 'delete'}
                    onClose={() => {
                        setDialogType(null);
                        setSelectedMedicament(null);
                    }}
                    onConfirm={() => {
                        handleConfirm();
                        if(medicamentList.length===1)
                            onClose();
                    }}
                    title={ t('delete.title') }
                    message={` ${ t('delete.message') } ${selectedMedicament?.name || ''} ?`}
                    confirmText={ tCommon('button.delete') }
                    cancelText={ tCommon('button.cancel') }
                    confirmColor='error'
                />

                <div className='modal-options'>
                    <Button variant='outlined' onClick={onClose}>{ tCommon('button.cancel') }</Button>
                </div>
            </div>
        </Modal>
    );
}; 