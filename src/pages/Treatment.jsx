import '../styles/Lists.css';
import { useState, useEffect } from 'react';
import { useTreatmentList } from '../hooks/useTreatmentList';
import { Button, TextField } from '@mui/material';
import { formatMonth, formatYear, currentMonthYear } from '../utils/dateOperations';
import { useLocation } from 'react-router';
import { filterTreatment } from '../utils/filterTreatment';
import { statusMessageDecode } from '../utils/statusUtils';
import { useTranslation } from 'react-i18next';
import TreatmentCard from '../components/TreatmentCard';
import TreatmentForm from '../components/TreatmentForm';
import CardSkeleton from '../components/skeletons/CardSkeleton';
import Medicament from './Medicament';
import ConfirmationDialog from '../components/ConfirmationDialog';
import SearchBar from '../components/SearchBar';
import StatusFilter from '../components/StatusFilter';
import Paginator from '../components/Paginator';

export default function Treatment({ userId = null }){
    const { t } = useTranslation('treatment');
    const { t: tCommon } = useTranslation('common');
    const { 
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
    } = useTreatmentList(userId);
    const location = useLocation();
    const date = location.state?.date || currentMonthYear();
    const status = statusMessageDecode(location.state?.status);

    const [medicamentModalOpen, setMedicamentModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    
    const [selectedDate, setSelectedDate] = useState(date);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const [statusFilter, setStatusFilter] = useState(status); // all, success, error, primary
    
    const filteredTreatments = filterTreatment(treatmentList, search, statusFilter);

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleCardClick = (treatment) => {
        setSelectedTreatment(treatment);
        setMedicamentModalOpen(true);
    };

    const handleDeleteClick = (treatment) => {
        setDialogType('delete');
        setSelectedTreatment(treatment);
    };

    const handleUpdateClick = (treatment) => {
        setSelectedTreatment(treatment);
        setIsEditMode(true);
        setAddModalOpen(true);
    };

     
    useEffect(() => {
        setPage(1);
    }, [search, treatmentList]);

    useEffect(() => {
        setMonth(formatMonth(selectedDate));
        setYear(formatYear(selectedDate));
    }, [selectedDate]);
    
    const paginatedTreatments = filteredTreatments.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return(
        <div className='list-container'>
            <div className='list-options'>
                <SearchBar
                    value={search}
                    onChange={(val) => {
                        setSearch(val);
                        setPage(1);
                    }}
                    placeholder={ t('search') }
                />
                <div className='filter-actions'>
                    <TextField
                        id='selectedDate'
                        type='month'
                        name='selectedDate'
                        value={(selectedDate)}
                        onChange={e => setSelectedDate(e.target.value)}
                        size='small'
                    />
                    <StatusFilter value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} />

                    {userRole !== 'caregiver' && (
                        <Button 
                            variant='contained' 
                            onClick={() => {
                                setIsEditMode(false);
                                setSelectedTreatment(null);
                                setAddModalOpen(true);
                            }}
                        >
                            { tCommon('button.add') }
                        </Button>
                    )}
                </div>
            </div>
            <div className='list-item-container'>
                { loading 
                    ? (
                        <>
                            {[...Array(3)].map((_, idx) => (
                                <CardSkeleton key={idx} />
                            ))}
                        </>
                    )
                    : (filteredTreatments.length === 0 
                        ? (<h1>{ t('withoutInfo') }</h1>) 
                        : (paginatedTreatments.map((treatment) => (
                            <TreatmentCard 
                                key={ treatment.id }
                                treatment = { treatment } 
                                handleCardClick = { handleCardClick }
                                onDelete = { userRole !== 'caregiver' ? handleDeleteClick : null }
                                onUpdate = { userRole !== 'caregiver' ? handleUpdateClick : null }
                            />
                        ))
                    ))
                }
            </div>

            <TreatmentForm
                key={addModalOpen + (isEditMode ? selectedTreatment?.id : 'new')}
                open={addModalOpen}
                onClose={() => {
                    setAddModalOpen(false);
                    setSelectedTreatment(null);
                }}
                onSubmit={(formData) => {
                    if(isEditMode){
                        handleUpdateTreatment(selectedTreatment.id, formData);
                    } else{
                        handleAddTreatment(formData);
                    }
                }}
                initialData={isEditMode ? selectedTreatment : null}
                isEdit={isEditMode}
            />

            {medicamentModalOpen && selectedTreatment && (
                <Medicament 
                    treatmentId={selectedTreatment.id}
                    treatmentName={selectedTreatment.name}
                    open={medicamentModalOpen}
                    onClose={() => setMedicamentModalOpen(false)}
                    userRole={userRole}
                />
            )}

            {treatmentList.length > itemsPerPage && (
                <Paginator
                    totalItems={filteredTreatments.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={page}
                    onPageChange={handlePageChange}
                />
            )}

            <ConfirmationDialog
                open={dialogType === 'delete'}
                onClose={() => {
                    setDialogType(null);
                    setSelectedTreatment(null);
                }}
                onConfirm={handleConfirm}
                title={ t('delete.title') }
                message={`${ t('delete.message') } ${selectedTreatment?.name || ''} ?`}
                confirmText={ tCommon('button.delete') }
                cancelText={ tCommon('button.cancel') }
                confirmColor='error'
            />
        </div>
    );
};