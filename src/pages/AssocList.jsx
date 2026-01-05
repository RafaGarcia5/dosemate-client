import '../styles/Lists.css';
import { useState, useEffect } from 'react';
import { useAssocList } from '../hooks/useAssocList';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import ConfirmationDialog from '../components/ConfirmationDialog';
import CaregiverCard from '../components/CaregiverCard';
import PatientCard from '../components/PatientCard';
import PatientCardSkeleton from '../components/skeletons/PatientCardSkeleton';
import CardSkeleton from '../components/skeletons/CardSkeleton';
import AddAssoc from '../components/AddAssoc';
import SearchBar from '../components/SearchBar';
import Treatment from './Treatment';
import Paginator from '../components/Paginator';

export default function Associates(){
    const { t } = useTranslation('associates');
    const { t: tCommon } = useTranslation('common');
    const { 
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
    } = useAssocList();
    const [selectedPatient, setSelectedPatient] = useState(null);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;
    
    const filteredAssoc = assocList.filter(assoc => {
        const searchText = search.toLowerCase();
        return (
            assoc.email.toLowerCase().includes(searchText) ||
            assoc.name.toLowerCase().includes(searchText)
        );
    });

    const handlePageChange = (event, value) => {
        setPage(value);
    };

    const handleDeleteClick = (caregiver) => {
        setDialogType('delete');
        setSelectedAssoc(caregiver);
    };
     
    useEffect(() => {
        setPage(1);
    }, [search, assocList]);
    
    const paginatedTracks = filteredAssoc.slice(
        (page - 1) * itemsPerPage,
        page * itemsPerPage
    );

    return(
        <div className='list-container'>
            {selectedPatient ? (
                <div className='list-container'>
                    <div className='list-options'>
                        <Button
                            onClick={() => setSelectedPatient(null)}
                            variant='outlined'
                        >
                            {t('back')}
                        </Button>
                    </div>
                    <Treatment userId={selectedPatient.id} />
                </div>
            ) : (
                <>
                    <div className='list-options'>
                        <SearchBar
                            value={search}
                            onChange={(val) => {
                                setSearch(val);
                                setPage(1);
                            }}
                            placeholder={t('search')}
                        />
                        <div className='filter-actions'>
                            <Button 
                                fullWidth 
                                variant='contained' 
                                color='primary' 
                                onClick={() => setAddModalOpen(true)}
                            >
                                { tCommon('button.add') } {role === 'patient' ? t('caregiver') : t('patient')}
                            </Button>
                        </div>
                    </div>
                    
                    <div className='list-item-container'>
                        { loading 
                            ? ( role === 'patient' 
                                ? <PatientCardSkeleton />
                                : <CardSkeleton />
                            )
                            : (assocList.length === 0 
                                ? (<h1>{ t('withoutInfo') }</h1>) 
                                : (paginatedTracks.map((assoc) => (
                                    role === 'patient' ? (
                                    <CaregiverCard
                                        key={assoc.id}
                                        caregiver={assoc}
                                        onDelete={handleDeleteClick}/>) 
                                    :(<PatientCard
                                        key={assoc.id}
                                        patient={assoc}
                                        onDelete={handleDeleteClick}
                                        onDetails={() => setSelectedPatient(assoc)}/>)
                                ))
                            ))
                        }
                    </div>
                    <div className='list-options'>
                        {filteredAssoc.length > itemsPerPage && (
                            <Paginator
                                totalItems={filteredAssoc.length}
                                itemsPerPage={itemsPerPage}
                                currentPage={page}
                                onPageChange={handlePageChange}
                            />
                        )}
                        <p className='list-info'> <b> { t('total') }: {assocList.length} </b></p>
                    </div>

                    <ConfirmationDialog
                        open={dialogType === 'delete'}
                        onClose={() => {
                            setDialogType(null);
                            setSelectedAssoc(null);
                        }}
                        onConfirm={handleConfirm}
                        title={ t('delete.title') }
                        message={`${t('delete.message')} ${selectedAssoc?.name} ?`}
                        confirmText={ tCommon('button.delete') }
                        cancelText={ tCommon('button.cancel') }
                        confirmColor='error'
                    />

                    <AddAssoc 
                        open={addModalOpen}
                        onClose={() => setAddModalOpen(false)}
                        onSubmit={handleAddAssoc}
                    />
                </>
            )}
        </div>
    );
};